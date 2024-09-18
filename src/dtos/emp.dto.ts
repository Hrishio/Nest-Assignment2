import { IsNotEmpty, IsEmail, IsNumber, IsString } from 'class-validator';

export class CreatePatientDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  dob: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsNumber()
  patientId: number;

  @IsNotEmpty()
  @IsNumber()
  deptId: number;

  @IsNotEmpty()
  @IsNumber()
  appId: number;

  @IsNotEmpty()
  @IsNumber()
  createdBy: number;

  @IsNotEmpty()
  @IsNumber()
  updatedBy: number;

  
}

export class updatePatientDto{
    firstName?: string;
    lastName?: string;
    email?: string;
    address?: string;
    dob?: string;
    phoneNumber?: string;
    patientId?:number;
    deptId?:number;
    appId?:number;
    createdBy: number;
    updatedBy: number;
  }