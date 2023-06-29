import { UploadService } from './upload.service';
import {
  Controller,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MaxSize, fileTypeRegExp } from './util';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: MaxSize })
        .addFileTypeValidator({ fileType: fileTypeRegExp })
        .build(),
    )
    file: Express.Multer.File,
  ) {
    const { type, filePath } = this.uploadService.getFilePath(file);
    return {
      type,
      url: filePath,
      size: file.size,
    };
  }
}
