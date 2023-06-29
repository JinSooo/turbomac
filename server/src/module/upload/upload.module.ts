import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import config from 'config/index.config';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: config.uploadPath,
        filename: (_, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9) + '-';
          callback(null, uniqueSuffix + decodeURI(file.originalname));
        },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
