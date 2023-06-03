import { Logger } from '@nestjs/common';
import { Request, Response } from 'express';

export function LoggerMiddleware(
  req: Request,
  res: Response,
  next: () => void,
) {
  Logger.log(`${req.method} ${req.path}`, 'LoggerMiddleware');
  next();
}
