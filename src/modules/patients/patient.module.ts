import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UsersService } from './users.service';
// import { UsersController } from './users.controller';
import { Patient } from '../../entity/patient.entity';
import { PatientsController } from './patient.controller';
import { PatientService } from './patient.services';

@Module({
  imports: [TypeOrmModule.forFeature([Patient])],
  controllers: [PatientsController],
  providers: [PatientService],
})
export class PatientModule {}
