// src/root.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/database.config';
import { PatientModule } from './modules/patients/patient.module';
import { EmpModule } from './modules/employees/emp.module';
import { DeptModule } from './modules/departments/dept.module';
import { MedModule } from './modules/medicines/med.module';
import { AppModule } from './modules/appointments/app.module'; // Import your AuthModule
import { Patient } from './entity/patient.entity';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient]),
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmConfig,
    }),AuthModule,
    PatientModule,
    EmpModule,
    DeptModule,
    MedModule,
    AppModule,
  ],
})
export class RootModule {}
