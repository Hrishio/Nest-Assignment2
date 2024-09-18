import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointments } from 'src/entity/appointments.entity';
import { AppController } from './app.controller';
import { AppService } from './app.services';

@Module({
  imports: [TypeOrmModule.forFeature([Appointments])],
  controllers: [AppController],
  providers: [AppService
  ],
})
export class AppModule {}
