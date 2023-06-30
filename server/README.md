# Server

## Start Prisma

```bash
npx prisma init

npx prisma generate
```

## TODO

TODO: 添加/static 认证

## Websocket 的逻辑

先说整体，当用户加入的时候，会通知更新当前在线人数，以及获取之前发送的消息（15 条）；当用户离开的时候，也一样，更新当前在线人数。

- onlineUsers（当前在线人数）
  通过前端连接时，添加的`query.id`来唯一标识每一个 client socket，通过 server 获取到所有 socket，并进行过滤查询从而获取到所有用户的信息。

- getMessages（获取历史消息）
  我是根据偏移量（即已收到的消息个数）来再获取之前的消息历史，再查找想要的记录即可

  ```typescript
  // count 为传入的偏移量，pageSize 默认为15
  const length = await this.prismaService.message.count();
  const skip =
    length - count < this.pageSize ? 0 : length - count - this.pageSize;
  const take = length - count < this.pageSize ? length - count : this.pageSize;
  ```

- createMessage（发送消息）
  创建一个 newMessage，同时通知其他用户获取该消息
  即通过`addMessage`事件派发新的一个消息

## Upload 的逻辑

首先重写了 storage 的存储方式

```typescript
MulterModule.register({
  storage: diskStorage({
    destination: config.uploadPath,
    // 重写文件名
    filename: (_, file, callback) => {
      const uniqueSuffix =
        Date.now() + '-' + Math.round(Math.random() * 1e9) + '-';
      callback(null, uniqueSuffix + decodeURI(file.originalname));
    },
  }),
});
```

条件过滤，文件为最大值：4MB，以及一些文件格式的过滤
上传后，获取到文件的 url 地址、类型，以及文件的大小，进行格式化（用于 web 端的显示）

## 鉴权登录 逻辑

需要安装下面 4 个包

```bash
pnpm add @nestjs/passport passport passport-jwt passport-local
```

### local 登录（密码登录）

封装一个 strategy，通过 validate 验证是否给予通过

```typescript
async validate(username: string, password: string) {
    const user = await this.authService.validateUser(username, password);
    if (!user) throw new UnauthorizedException();
    return user;
  }
```

使用的方式

```typescript
@UseGuards(AuthGuard('local'))
```

### JWT 认证

首先先配置 JWT，即密钥和对应 token 过期时间

```typescript
JwtModule.register({
  secret: constants.jwtSecret,
  signOptions: {
    expiresIn: constants.jwtExpiresIn,
  },
});
```

接下来同理，配置 strategy

```typescript
@Injectable()
export default class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: constants.jwtSecret,
    });
  }

  async validate(payload) {
    // 这边不需要自己去判断token是否有效，如果有效我们可以直接获取到里面的数据了
    return await this.prisma.user.findUnique({ where: { id: payload.id } });
  }
}
```
