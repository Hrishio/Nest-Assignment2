import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Delete
  } from '@nestjs/common';
import { AppService } from './app.services';
import { CreateAppDto, UpdateAppDto } from 'src/dtos/app.dto';
  
  @Controller('appointments')
  export class AppController {
    constructor(private readonly appService: AppService) {}
  
    @Get()
    findAll() {
      return this.appService.findAll();
    }
  
    @Get('/:id')
    findOne(@Param('id') id: number) {
      return this.appService.findOne(id);
    }  


    @Get('patient/:id')
    async findPatientById(@Param('id') patientId: number) {
      return await this.appService.findPatientById(patientId);
    }

    @Get('employee/:id')
    async findByEmployeeId(@Param('id') empId: number) {
      return await this.appService.findEmpById(empId);
    }

    @Post('/new')
    create(@Body() createAppDto: CreateAppDto) {
      return this.appService.create(createAppDto);
    }
  
    @Put('/:id')
    update(@Param('id') id: number, @Body() updateAppDto: UpdateAppDto) {
      return this.appService.update(id, updateAppDto);
    }
  
    @Delete('/:id')
    remove(@Param('id') id: number) {
      return this.appService.remove(id);
    }
}