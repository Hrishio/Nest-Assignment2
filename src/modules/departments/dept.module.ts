import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeptController } from './dept.controller';
import { DeptService } from './dept.services';
import { Department } from 'src/entity/dept.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department])],
  controllers: [DeptController],
  providers: [DeptService],
})
export class DeptModule {}
