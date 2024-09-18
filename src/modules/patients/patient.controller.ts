import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UnauthorizedException,
} from '@nestjs/common';
import { PatientService } from './patient.services';
import { CreatePatientDto, updatePatientDto } from '../../dtos/patient.dto';
// import { AuthService } from '../../interceptors'

@Controller('patients')
export class PatientsController {
  constructor(private readonly PatientService: PatientService) {}

  @Get()
  findAll() {
    return this.PatientService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.PatientService.findOne(id);
  }

  @Post('/new')
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.PatientService.create(createPatientDto);
  }

  @Put('/:id')
  update(@Param('id') id: number, @Body() updatePatientDto: updatePatientDto) {
    return this.PatientService.update(id, updatePatientDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.PatientService.remove(id);
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
