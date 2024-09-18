import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMedDto {
  @IsNotEmpty()
  @IsString()
  medName: string;

  @IsNotEmpty()
  @IsString()
  reason: string;

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

export class UpdateMedDto{
    medName?:string;
    reason?: string;
    empId?:number;
    patientId?:number;
    createdBy: number;
    updatedBy: number;
  }