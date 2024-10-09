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
  import { DeptService } from './dept.services';
  import { CreatePatientDto, updatePatientDto } from '../../dtos/patient.dto';
import { CreateDeptDto, UpdateDeptDto } from 'src/dtos/dept.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  
  @Controller('departments')
  export class DeptController {
    constructor(private readonly deptService: DeptService) {}
  
    @Get()
    @UseGuards(JwtAuthGuard)
    findAll() {
      return this.deptService.findAll();
    }
  
    @Get('/:id')
    findOne(@Param('id') id: number) {
      return this.deptService.findOne(id);
    }


    @Get('employee/:id')
    async findByEmployeeId(@Param('id') empId: number) {
      return await this.deptService.findByEmpId(empId);
    }

    @Get('patient/:id')
    async findPatientById(@Param('id') patientId: number) {
      return await this.deptService.findPatientById(patientId);
    }
  
    @Post('/new')
    create(@Body() createDeptDto: CreateDeptDto) {
      return this.deptService.create(createDeptDto);
    }
  
    @Put('/:id')
    update(@Param('id') id: number, @Body() updateDeptDto: UpdateDeptDto) {
      return this.deptService.update(id, updateDeptDto);
    }
  
    @Delete('/:id')
    remove(@Param('id') id: number) {
      return this.deptService.remove(id);
    }
  }
  