import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Delete,
    UseGuards
  } from '@nestjs/common';
  import { MedService } from './med.services';
import { CreateMedDto, UpdateMedDto } from 'src/dtos/med.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  
  @Controller('medicines')
  export class MedController {
    constructor(private readonly medService: MedService) {}
  
    @Get()
    @UseGuards(JwtAuthGuard)
    findAll() {
      return this.medService.findAll();
    }
  
    @Get('/:id')
    findOne(@Param('id') id: number) {
      return this.medService.findOne(id);
    }


    @Get('patient/:id')
    async findPatientById(@Param('id') patientId: number) {
      return await this.medService.findPatientById(patientId);
    }

    @Get('employee/:id')
    async findByEmployeeId(@Param('id') empId: number) {
      return await this.medService.findByEmpId(empId);
    }
  
    @Post('/new')
    create(@Body() createMedDto: CreateMedDto) {
      return this.medService.create(createMedDto);
    }
  
    @Put('/:id')
    update(@Param('id') id: number, @Body() updateMedDto: UpdateMedDto) {
      return this.medService.update(id, updateMedDto);
    }
  
    @Delete('/:id')
    remove(@Param('id') id: number) {
      return this.medService.remove(id);
    }
  }
  