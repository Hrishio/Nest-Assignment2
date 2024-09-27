import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Query,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { PatientService } from './patient.services';
import { CreatePatientDto, updatePatientDto } from '../../dtos/patient.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientService: PatientService) {}

  @Get("/")
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async getAllPatients(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ): Promise<any> {
    const result = await this.patientService.getAllPatients(page, limit);
    return result; 
  }


  @Get('/:id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: number) {
    return this.patientService.findOne(id);
  }

  @Get('employee/:id')
  @HttpCode(200)
  async findByEmployeeId(@Param('id') empId: number) {
    return await this.patientService.getEmpById(empId);
  }

  @Get('app/:id')
  @HttpCode(200)
  async findAppById(@Param('id') appId: number) {
    return await this.patientService.getAppById(appId);
  }

  @Post('/new')
  @HttpCode(201)
  async create(@Body() createPatientDto: CreatePatientDto) {
    try {
      const newPatient = await this.patientService.create(createPatientDto);
      return newPatient;
    } catch (error) {
      throw error; 
    }
  }

  @Put('/:id')
  @HttpCode(201)
  async update(@Param('id') id: number, @Body() updatePatientDto: updatePatientDto) {
    try {
      return await this.patientService.update(id, updatePatientDto);
    } catch (error) {
      throw error; 
    }
  }

  @Delete('/:id')
  @HttpCode(200)
  async remove(@Param('id') id: number) {
    try {
      return await this.patientService.remove(id);
    } catch (error) {
      throw error; 
    }
  }
}
