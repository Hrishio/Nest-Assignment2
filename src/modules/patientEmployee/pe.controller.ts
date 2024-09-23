// import {
//     Body,
//     Controller,
//     Get,
//     Param,
//     Post,
//     Put,
//     Delete,
//   } from '@nestjs/common';
//   import { PatientEmployeeService } from './pe.services';
//   import { CreatePeDto, UpdatePeDto } from '@src/dtos/pe.dto';
//   import { PatientService } from '../patients/patient.services';  // Add these imports
//   import { EmpService } from '../employees/emp.services'; // Add these imports
  
//   @Controller('pe')
//   export class PatientsController {
//     constructor(
//       private readonly patientEmployeeService: PatientEmployeeService,
//       private readonly patientService: PatientService, // Inject services for Patient and Employee
//       private readonly employeeService: EmpService,
//     ) {}
  
//     @Get()
//     findAll() {
//       return this.patientEmployeeService.findAll();
//     }
  
//     @Get('/:id')
//     findOne(@Param('id') id: number) {
//       return this.patientEmployeeService.findOne(id);
//     }
  
//     @Post('/new')
//     async create(@Body() createPeDto: CreatePeDto) {
//       try {
//         // Fetch the Patient and Employee entities using their IDs
//         const patient = await this.patientService.findOne(createPeDto.patientId);
//         const employee = await this.employeeService.findOne(createPeDto.empId);
  
//         if (!patient || !employee) {
//           throw new Error('Patient or Employee not found');
//         }
  
//         // Manually map the DTO to the entity, passing the actual entity instances
//         const patientEmployeeData = {
//           patient: patient,  // Pass the fetched patient entity
//           employee: employee,  // Pass the fetched employee entity
//           interactionType: createPeDto.interactionType,
//           interactionDate: createPeDto.interactionDate,
//         };
  
//         return await this.patientEmployeeService.create(patientEmployeeData);
//       } catch (error) {
//         throw error;
//       }
//     }
  
//     @Put('/:id')
//     async update(@Param('id') id: number, @Body() updatePeDto: UpdatePeDto) {
//       try {
//         const patient = await this.patientService.findOne(updatePeDto.patientId);
//         const employee = await this.employeeService.findOne(empId);
  
//         if (!patient || !employee) {
//           throw new Error('Patient or Employee not found');
//         }
  
//         const patientEmployeeData = {
//           patient: patient, // Pass the fetched patient entity
//           employee: employee, // Pass the fetched employee entity
//           interactionType: updatePeDto.interactionType,
//           interactionDate: updatePeDto.interactionDate,
//         };
  
//         return await this.patientEmployeeService.update(id, patientEmployeeData);
//       } catch (error) {
//         throw error;
//       }
//     }
  
//     @Delete('/:id')
//     async remove(@Param('id') id: number) {
//       try {
//         return await this.patientEmployeeService.remove(id);
//       } catch (error) {
//         throw error;
//       }
//     }
//   }
  