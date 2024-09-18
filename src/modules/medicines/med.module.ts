import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedController
 } from './med.controller';
import { MedService } from './med.services';
import { Department } from 'src/entity/dept.entity';
import { Medicines } from 'src/entity/medicine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medicines])],
  controllers: [MedController],
  providers: [MedService],
})
export class MedModule {}
