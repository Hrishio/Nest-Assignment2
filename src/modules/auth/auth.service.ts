import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PatientService } from '../patients/patient.services';

@Injectable()
export class AuthService {
  constructor(
    private patientService: PatientService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    return this.patientService.validateUser(email, pass);
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}