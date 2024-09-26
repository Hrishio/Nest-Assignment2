import {  Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from '../../entity/patient.entity';
import { PatientsController } from './patient.controller';
import { PatientService } from './patient.services';// Correct import for AuthModule
import { Repository } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient]),
  ],
  controllers: [PatientsController],
  providers: [PatientService, Repository<Patient>],
  exports:[PatientService],
})
export class PatientModule {}
