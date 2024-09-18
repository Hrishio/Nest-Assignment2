// src/config/database.config.ts

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Patient } from '../entity/patient.entity';
import { Employee } from '../entity/employee.entity';
import { Department } from '../entity/dept.entity';
import { Medicines } from '../entity/medicine.entity';
import { Appointments } from '../entity/appointments.entity';

// Factory function to return TypeOrmModuleOptions
export const typeOrmConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'hrishio',
  database: 'nestDB',
  entities: [Patient, Employee, Department, Medicines, Appointments],
  synchronize: true, 
});
