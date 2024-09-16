import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { EmpService } from './emp.services';
import { CreateEmpDto, UpdateEmpDto } from 'src/dtos/emp.dto';

@Controller('employees')
export class EmpController {
  constructor(private readonly PatientService: EmpService) {}

  @Get()
  findAll() {
    return this.PatientService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.PatientService.findOne(id);
  }

  @Post('/new')
  create(@Body() createEmpDto: CreateEmpDto) {
    return this.PatientService.create(createEmpDto);
  }

  @Put('/:id')
  update(@Param('id') id: number, @Body() updateEmpDto: UpdateEmpDto) {
    return this.PatientService.update(id, updateEmpDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.PatientService.remove(id);
  }
}
