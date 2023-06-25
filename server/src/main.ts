import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { FormatInterceptor } from './common/interceptor/format.interceptor';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
// import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // app.useWebSocketAdapter(new WsAdapter(app));

  // 全局中间件
  app.use(LoggerMiddleware);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new FormatInterceptor());

  await app.listen(8080);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
