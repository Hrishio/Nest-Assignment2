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
  constructor(private readonly empService: EmpService) {}

  @Get()
  findAll() {
    return this.empService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.empService.findOne(id);
  }

  @Get('patient/:id')
  async findPatientById(@Param('id') patientId: number) {
    return await this.empService.findPatientById(patientId);
  }

  @Post('/new')
  create(@Body() createEmpDto: CreateEmpDto) {
    return this.empService.create(createEmpDto);
  }

  @Put('/:id')
  update(@Param('id') id: number, @Body() updateEmpDto: UpdateEmpDto) {
    return this.empService.update(id, updateEmpDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.empService.remove(id);
  }
}
