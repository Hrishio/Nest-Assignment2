import { NestFactory } from '@nestjs/core';
import { RootModule } from './root.module';
import 'reflect-metadata';
import { LoggingInterceptor } from './interceptors/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(RootModule);
  app.useGlobalInterceptors(new LoggingInterceptor());
  console.log('Database connection successful');
  await app.listen(3000);
}
bootstrap();
