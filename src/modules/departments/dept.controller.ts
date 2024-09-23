import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Delete
  } from '@nestjs/common';
  import { DeptService } from './dept.services';
  import { CreatePatientDto, updatePatientDto } from '../../dtos/patient.dto';
import { CreateDeptDto, UpdateDeptDto } from 'src/dtos/dept.dto';
  
  @Controller('departments')
  export class DeptController {
    constructor(private readonly deptService: DeptService) {}
  
    @Get()
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
  