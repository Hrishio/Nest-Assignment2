// src/root.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/database.config'; // Import the config factory function
import { PatientModule } from './modules/patients/patient.module';
import { EmpModule } from './modules/employees/emp.module';
import { DeptModule } from './modules/departments/dept.module';
import { MedModule } from './modules/medicines/med.module';
import { AppModule } from './modules/appointments/app.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmConfig,
    }),
    PatientModule,
    EmpModule,
    DeptModule,
    MedModule,
    AppModule,
  ],
})
export class RootModule {}
