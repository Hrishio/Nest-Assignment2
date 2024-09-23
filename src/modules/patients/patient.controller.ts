import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { PatientService } from './patient.services';
import { CreatePatientDto, updatePatientDto } from '../../dtos/patient.dto';
// import { AuthService } from '../../interceptors'

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.patientService.findOne(id);
  }

  @Get('employee/:id')
  async findByEmployeeId(@Param('id') empId: number) {
    return await this.patientService.findByEmpId(empId);
  }


  @Get('app/:id')
  async findAppById(@Param('id') appId: number) {
    return await this.patientService.findByEmpId(appId);
  }


  @Post('/new')
  async create(@Body() createPatientDto: CreatePatientDto) {
    try {
      return await this.patientService.create(createPatientDto);
    } catch (error) {
      // Handle error, potentially log or reformat it
      throw error;
    }
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() updatePatientDto: updatePatientDto) {
    try {

      return await this.patientService.update(id, updatePatientDto);
    } catch (error) {
      // Handle error, potentially log or reformat it
      throw error;
    }
  }

  @Delete('/:id')
  async remove(@Param('id') id: number) {
    try {
      return await this.patientService.remove(id);
    } catch (error) {
      // Handle error, potentially log or reformat it
      throw error;
    }
  }

  // @Post('/login')
  // async login(@Body() loginDto: { username: string; password: string }) {
  //   // Implement your login logic
  //   const user = await this.AuthService.validateUser(loginDto.username, loginDto.password);
  //   if (user) {
  //     const tokens = this.PatientService.generateToken({ userId: user.id });
  //     return tokens;
  //   } else {
  //     throw new UnauthorizedException('Invalid credentials');
  //   }
  // }

  // @Post('/refresh-token')
  // async refreshToken(@Body() body: { refreshToken: string }) {
  //   // Implement refresh token logic
  //   const newTokens = await this.PatientService.refreshToken(body.refreshToken);
  //   return newTokens;
  // }
}
