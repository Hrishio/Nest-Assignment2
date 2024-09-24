import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UsersService } from './users.service';
// import { UsersController } from './users.controller';
import { Patient } from '../../entity/patient.entity';
import { PatientsController } from './patient.controller';
import { PatientService } from './patient.services';
import { TransactionService } from '@src/transactions/transaction.service';

@Module({
  imports: [TypeOrmModule.forFeature([Patient])],
  controllers: [PatientsController],
  providers: [PatientService, TransactionService],
})
export class PatientModule {}
