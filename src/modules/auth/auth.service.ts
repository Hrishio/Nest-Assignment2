import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PatientService } from '../patients/patient.services';
import passport from 'passport';

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
    const refreshPayload = {username:user.email, password:user.password}
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token:this.jwtService.sign(refreshPayload)
    };
  }
}