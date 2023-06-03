import { PassportStrategy } from '@nestjs/passport';
import { PrismaService } from 'nestjs-prisma';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { constants } from '../constants';
import { Injectable } from '@nestjs/common';

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
    return await this.prisma.user.findUnique({ where: { id: payload.id } });
  }
}
