import { NestFactory } from '@nestjs/core';
import { RootModule } from './root.module';
import 'reflect-metadata';
import { LoggingInterceptor } from './interceptors/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(RootModule);

  // Enable CORS for your frontend (e.g., React app on localhost:5173)
  app.enableCors({
    origin: 'http://localhost:5173', // Your React frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies if necessary
  });

  // Use global logging interceptor
  app.useGlobalInterceptors(new LoggingInterceptor());

  // Log a more descriptive message for the database connection
  console.log('Database connection successful. Server starting on http://localhost:3000');

  // Start listening on port 3000
  await app.listen(3000);

  // Log the actual server startup for clarity
  console.log(`Server running at http://localhost:3000`);
}

bootstrap();
