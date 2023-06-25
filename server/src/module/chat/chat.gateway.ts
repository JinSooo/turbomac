import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { PrismaService } from 'nestjs-prisma';
import { Socket, Server } from 'socket.io';

interface UserInfo {
  id: string;
  username: string;
  avatar: string;
  role: string;
}

// 公共房间
const PUBLIC_ROOM = 'TurboRoom';
// 一次拿取消息的最大数量
const PAGINATION = 15;

@WebSocketGateway(8081, {
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  defaultGroup: string;
  pageSize: number;
  users: any[];

  constructor(private prismaService: PrismaService) {
    this.defaultGroup = PUBLIC_ROOM;
    this.pageSize = PAGINATION;
    this.users = [];
  }

  handleConnection(client: Socket) {
    client.join(this.defaultGroup);
    // 通知client在线
    this.getOnlineUsers(client);
    // 发送给client之前的消息
    this.getMessages(client, { page: 1 });
  }

  handleDisconnect(client: Socket) {
    client.leave(this.defaultGroup);
    // 通知client离线;
    this.getOnlineUsers(client);
  }

  @SubscribeMessage('onlineUsers')
  async getOnlineUsers(@ConnectedSocket() client: Socket) {
    const users = await this.getActiveUser();
    // role: 'user' or 'owner','owner' first
    // const orderUsers = users.sort((a, b) => b.role.length - a.role.length);
    client.emit('onlineUsers', users);
    client.to(this.defaultGroup).emit('onlineUsers', users);
  }

  @SubscribeMessage('createMessage')
  async createMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    {
      userId,
      type,
      message,
      size,
      page,
    }: {
      userId: string;
      type: string;
      message: string;
      size: string;
      page: number;
    },
  ) {
    await this.prismaService.message.create({
      data: {
        userId,
        roomId: this.defaultGroup,
        content: message,
        type,
        size,
      },
    });

    const length = await this.prismaService.message.count();
    const take = page * this.pageSize;
    const skip = length - take < 0 ? 0 : length - take;
    const messages = await this.prismaService.message.findMany({
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
            role: true,
          },
        },
      },
      skip,
      take,
    });

    client.emit('getMessages', messages);
    client.to(this.defaultGroup).emit('getMessages', messages);
  }

  @SubscribeMessage('getMessages')
  async getMessages(
    @ConnectedSocket() client: Socket,
    @MessageBody() { page }: { page: number },
  ) {
    // 根据page进行偏移
    const length = await this.prismaService.message.count();
    const take = page * this.pageSize;
    const skip = length - take < 0 ? 0 : length - take;
    const messages = await this.prismaService.message.findMany({
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
            role: true,
          },
        },
      },
      skip,
      take,
    });

    client.emit('getMessages', messages);
  }

  // 获取当前在线人员信息
  async getActiveUser() {
    const sockets = await this.server.fetchSockets();
    const userIdArr = sockets.map((socket) => socket.handshake.query.id);
    const uniqueUserIdArr = Array.from(new Set(userIdArr));
    const realUser = uniqueUserIdArr.filter((user) => user !== undefined);
    const res: UserInfo[] = [];

    for (const userId of realUser) {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: userId as string,
        },
        select: {
          id: true,
          username: true,
          avatar: true,
          role: true,
        },
      });
      res.push(user);
    }

    return res;
  }
}
