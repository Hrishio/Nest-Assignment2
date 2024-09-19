import { DataSource } from 'typeorm';


export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'hrishio',
  database: 'nestDemo',
  "entities": ["src/**/*.entity.ts"],
  migrations: ['src/migration/*.ts'],
  synchronize: true,
});