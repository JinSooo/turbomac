import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUser: CreateUserDto) {
    return await this.prisma.user.create({
      data: {
        ...createUser,
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
