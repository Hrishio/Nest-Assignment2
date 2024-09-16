export class CreateEmpDto {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  dob: string;
  phoneNumber: string;
  patientId: number;
  createdBy: number;
  updatedBy: number;
}
export class UpdateEmpDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: string;
  dob?: string;
  phoneNumber?: string;
  patientId?: number;
  createdBy: number;
  updatedBy: number;
}
