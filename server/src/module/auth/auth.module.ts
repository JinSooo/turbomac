import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { constants } from './constants';
import { PassportModule } from '@nestjs/passport';
import JWTStrategy from './strategy/jwt.strategy';
import LocalStrategy from './strategy/local.strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    JwtModule.register({
      secret: constants.jwtSecret,
      signOptions: {
        expiresIn: constants.jwtExpiresIn,
      },
    }),
    PassportModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy, LocalStrategy],
})
export class AuthModule {}
