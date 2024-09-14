import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entity/patient.entity';
import { Employee } from './entity/employee.entity';
import { Department } from './entity/dept.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'rootuser',
      database: 'nestDB',
      entities: [Patient, Employee, Department],
      synchronize: true,
    }),
  ],
})
export class RootModule {}
