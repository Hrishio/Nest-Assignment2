// import {
//   Body,
//   Controller,
//   Get,
//   Param,
//   Post,
//   Put,
//   Delete,
//   Query,
//   UseGuards,
// } from '@nestjs/common';
// import { PatientService } from './patient.services';
// import { CreatePatientDto, updatePatientDto } from '../../dtos/patient.dto';
// import { Patient } from '@src/entity/patient.entity';
// import { AuthGuard } from '@nestjs/passport';
// import { JwtAuthGuard } from '../auth/auth.guard';
// import { request } from 'http';
// // import { AuthService } from '../../interceptors'

// @Controller('patients')
// export class PatientsController {
//   constructor(private readonly patientService: PatientService) {}

//   @Get('search')
//   @UseGuards(JwtAuthGuard)
//   getProtectedResource() {
//     return { message: 'This is a protected resource!' };
//   }
//   async getPatients(
//     @Query('page') page: number = 1,                          // Default page 1
//     @Query('limit') limit: number = 10,                       // Default limit 10
//     @Query('search') search?: string,                          // Optional search query
//     @Query('sort') sort?: number,         // Adjust as needed
//     @Query('order') order: 'ASC' | 'DESC' = 'ASC'
//   ): Promise<{}> { // Log the search value for debugging

//     // Call the service's findAll method with pagination, search, and sort options
//     const result = await this.patientService.findAll(page, limit, search,  order);

//     // Return the structured response
//     return result; // This should contain both data and total
//   }
//   @Get("/") // Default route
//   async getAllPatients(
//     @Query('page') page: number = 1,
//     @Query('limit') limit: number = 10
//   ): Promise<any> {
//     // Call the service's findAll method without search
//     const result = await this.patientService.getAllPatients(page, limit);
//     return result; // This should contain both data and total
//   }

//   @Get('/:id')
//   findOne(@Param('id') id: number) {
//     return this.patientService.findOne(id);
//   }

//   @Get('employee/:id')
//   async findByEmployeeId(@Param('id') empId: number) {
//     return await this.patientService.getEmpById(empId);
//   }


//   @Get('app/:id')
//   async findAppById(@Param('id') appId: number) {
//     return await this.patientService.getAppById(appId);
//   }


//   @Post('/new')
//   async create(@Body() createPatientDto: CreatePatientDto) {
//     try {
//       const newPatient = await this.patientService.create(createPatientDto);
//       const token =  this.patientService.generateToken(createPatientDto);

//       return {
//         newPatient, token
//       }

//     } catch (error) {
//       // Handle error, potentially log or reformat it
//       throw error;
//     }
//   }
//   // }@Post('/new')
//   // async create(@Body() createPatientDto: CreatePatientDto) {
//   //   try {
//   //     return await this.patientService.create(createPatientDto);
//   //   } catch (error) {
//   //     // Handle error, potentially log or reformat it
//   //     throw error;
//   //   }
//   // }

//   @Put('/:id')
//   async update(@Param('id') id: number, @Body() updatePatientDto: updatePatientDto) {
//     try {

//       return await this.patientService.update(id, updatePatientDto);
//     } catch (error) {
//       // Handle error, potentially log or reformat it
//       throw error;
//     }
//   }

//   @Delete('/:id')
//   async remove(@Param('id') id: number) {
//     try {
//       return await this.patientService.remove(id);
//     } catch (error) {
//       throw error;
//     }
//   }

//   // @Post('/login')
//   // async login(@Body() loginDto: { username: string; password: string }) {
//   //   // Implement your login logic
//   //   const user = await this.AuthService.validateUser(loginDto.username, loginDto.password);
//   //   if (user) {
//   //     const tokens = this.PatientService.generateToken({ userId: user.id });
//   //     return tokens;
//   //   } else {
//   //     throw new UnauthorizedException('Invalid credentials');
//   //   }
//   // }

//   // @Post('/refresh-token')
//   // async refreshToken(@Body() body: { refreshToken: string }) {
//   //   // Implement refresh token logic
//   //   const newTokens = await this.PatientService.refreshToken(body.refreshToken);
//   //   return newTokens;
//   // }
// }
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
