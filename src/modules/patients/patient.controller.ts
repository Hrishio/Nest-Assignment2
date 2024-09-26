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
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PatientService } from './patient.services';
import { CreatePatientDto, updatePatientDto } from '../../dtos/patient.dto';
import { Patient } from '@src/entity/patient.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientService: PatientService) {}

  @Get('search')
  getProtectedResource() {
    return { message: 'This is a protected resource!' };
  }

  @Get("/")
  @UseGuards(JwtAuthGuard) // Default route
  async getAllPatients(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ): Promise<any> {
    const result = await this.patientService.getAllPatients(page, limit);
    return result; // This should contain both data and total
  }

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.patientService.findOne(id);
  }

  @Get('employee/:id')
  async findByEmployeeId(@Param('id') empId: number) {
    return await this.patientService.getEmpById(empId);
  }

  @Get('app/:id')
  async findAppById(@Param('id') appId: number) {
    return await this.patientService.getAppById(appId);
  }

  @Post('/new')
  async create(@Body() createPatientDto: CreatePatientDto) {
    try {
      const newPatient = await this.patientService.create(createPatientDto);
      return newPatient;
    } catch (error) {
      throw error; // Handle error as needed
    }
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() updatePatientDto: updatePatientDto) {
    try {
      return await this.patientService.update(id, updatePatientDto);
    } catch (error) {
      throw error; // Handle error as needed
    }
  }

  @Delete('/:id')
  async remove(@Param('id') id: number) {
    try {
      return await this.patientService.remove(id);
    } catch (error) {
      throw error; // Handle error as needed
    }
  }

  // New login route
  // @Post('login')
  // async login(@Body() patientLoginD) {
  //   const { email, dob } = patientLoginDto;

  //   // Find patient by email and DOB
  //   const patient = await this.patientService.findByEmailAndDob(email, dob);

  //   if (!patient) {
  //     throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  //   }

  //   // Generate a JWT token
  //   const token = this.patientService.generateToken({ email: patient.email, patientId: patient.patientId });

  //   return {
  //     accessToken: token,
  //     message: 'Login successful',
  //   };
  // }
}
