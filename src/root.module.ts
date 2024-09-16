import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entity/patient.entity';
import { Employee } from './entity/employee.entity';
import { Department } from './entity/dept.entity';
import { PatientModule } from './modules/patients/patient.module';
import { EmpModule } from './modules/employees/emp.module';
import { Medicines } from './entity/medicine.entity';
import { Appointments } from './entity/appointments.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'rootuser',
      database: 'nestDB',
      entities: [Patient, Employee, Department, Medicines, Appointments],
      synchronize: true,
    }),
    PatientModule,
    EmpModule,
  ],
})
export class RootModule {}
