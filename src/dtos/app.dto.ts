import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAppDto {
  @IsNotEmpty()
  @IsString()
  appDate: string;

  @IsNotEmpty()
  @IsString()
  cause: string;

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

export class UpdateAppDto{
    appDate?:string;
    cause?: string;
    empId?:number;
    patientId?:number;
    createdBy: number;
    updatedBy: number;
  }