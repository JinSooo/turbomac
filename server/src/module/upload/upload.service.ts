import { Injectable } from '@nestjs/common';
import { extname } from 'path';
import { fileType } from './util';

@Injectable()
export class UploadService {
  getFilePath(file: Express.Multer.File) {
    const filePath = `http://localhost:8080/static/upload/${file.filename}`;

    const ext = extname(file.originalname).split('.')[1];
    let type = '';
    if (fileType.image.includes(ext)) type = 'image';
    else if (fileType.video.includes(ext)) type = 'video';
    else if (fileType.audio.includes(ext)) type = 'audio';
    else if (fileType.document.includes(ext)) type = 'document';
    else type = 'other';

    return { type, filePath };
  }

  formatFileSize(size: number) {
    if (size < 1000) return `${size}B`;
    if (size < 1000000) return `${(size / 1000).toFixed(2)}KB`;
    return `${(size / 1000000).toFixed(2)}MB`;
  }
}
