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
import { CreatePatientDto, UpdatePatientDto } from '../../dtos/patient.dto';

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
  update(@Param('id') id: number, @Body() updatePatientDto: UpdatePatientDto) {
    return this.PatientService.update(id, updatePatientDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.PatientService.remove(id);
  }
}
