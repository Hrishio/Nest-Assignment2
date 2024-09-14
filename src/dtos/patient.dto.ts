export class CreatePatientDto {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  dob: string;
  phoneNumber: string;
  createdBy: number;
  updatedBy: number;
}
export class UpdatePatientDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: string;
  dob?: string;
  phoneNumber?: string;
  createdBy: number;
  updatedBy: number;
}
