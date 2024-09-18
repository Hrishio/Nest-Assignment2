import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Delete
  } from '@nestjs/common';
  import { MedService } from './med.services';
import { CreateMedDto, UpdateMedDto } from 'src/dtos/med.dto';
  
  @Controller('medicines')
  export class MedController {
    constructor(private readonly medService: MedService) {}
  
    @Get()
    findAll() {
      return this.medService.findAll();
    }
  
    @Get('/:id')
    findOne(@Param('id') id: number) {
      return this.medService.findOne(id);
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
  