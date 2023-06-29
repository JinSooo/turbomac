import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { ChatModule } from './module/chat/chat.module';
import { UploadModule } from './module/upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import config from 'config/index.config';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: config.serveStatic.rootPath,
      serveRoot: config.serveStatic.serveRoot,
    }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {},
    }),
    UserModule,
    AuthModule,
    ChatModule,
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
