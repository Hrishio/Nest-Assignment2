import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePeDto {
  @IsNotEmpty()
  @IsNumber()
  patientId: number;

  @IsNotEmpty()
  @IsNumber()
  empId: number;

  @IsNotEmpty()
  @IsNumber()
  createdBy: number;

  @IsNotEmpty()
  @IsNumber()
  updatedBy: number;

  // Add other necessary fields for PatientEmployee
  @IsNotEmpty()
  @IsString()
  interactionType: string;

  @IsNotEmpty()
  interactionDate: Date;
}

export class UpdatePeDto {
  @IsOptional() // Make optional for update
  @IsNumber()
  patientId?: number;

  @IsOptional()
  @IsNumber()
  empId?: number;

  @IsOptional()
  @IsNumber()
  createdBy?: number;

  @IsOptional()
  @IsNumber()
  updatedBy?: number;

  // Optional fields for updating
  @IsOptional()
  @IsString()
  interactionType?: string;

  @IsOptional()
  interactionDate?: Date;
}
