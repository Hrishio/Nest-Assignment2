import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UsersService } from './users.service';
// import { UsersController } from './users.controller';
import { Patient } from '../../entity/patient.entity';
import { EmpController } from '../employees/emp.controller';
import { EmpService } from './emp.services';
import { Employee } from 'src/entity/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [EmpController],
  providers: [EmpService],
})
export class EmpModule {}
