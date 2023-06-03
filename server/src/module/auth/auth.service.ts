import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { verify } from 'src/utils/crypto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwt: JwtService) {}

  // local 验证（用户名、密码验证）
  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);

    const verification = await verify(user.password, password);
    if (user && verification) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: any) {
    const signInfo = { id: user.id, username: user.username };
    const { password, ...userInfo } = await this.userService.findById(user.id);

    return {
      message: 'Login Successful',
      token: this.jwt.sign(signInfo),
      userInfo,
    };
  }

  async register(user: CreateUserDto) {
    const newUser = await this.userService.create(user);

    return newUser;
  }
}
