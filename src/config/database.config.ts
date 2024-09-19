// src/config/database.config.ts

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// Factory function to return TypeOrmModuleOptions
export const typeOrmConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'hrishio',
  database: 'nestDB',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: false, 
});
