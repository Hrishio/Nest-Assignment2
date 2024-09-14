import { NestFactory } from '@nestjs/core';
import { RootModule } from './root.module';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(RootModule);
  console.log('Database connection successful');
  await app.listen(3000);
}
bootstrap();
