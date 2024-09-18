import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDeptDto {
  @IsNotEmpty()
  @IsString()
  deptName: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsNumber()
  empId: number;

  @IsNotEmpty()
  @IsNumber()
  patientId: number;

  @IsNotEmpty()
  @IsNumber()
  createdBy: number;

  @IsNotEmpty()
  @IsNumber()
  updatedBy: number;

  
}

export class UpdateDeptDto{
    deptName?:string;
    location?: string;
    empId?:number;
    patientId?:number;
    createdBy: number;
    updatedBy: number;
  }