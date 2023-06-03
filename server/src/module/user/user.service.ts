import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { encrypt } from 'src/utils/crypto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUser: CreateUserDto) {
    const hash = await encrypt(createUser.password);

    return await this.prisma.user.create({
      data: {
        username: createUser.username,
        password: hash,
      },
    });
  }

  async findById(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findByUsername(username: string) {
    return await this.prisma.user.findFirst({
      where: {
        username,
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }
}
