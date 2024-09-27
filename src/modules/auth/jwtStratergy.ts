import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PatientService } from 'src/modules/patients/patient.services';
import { error } from 'console';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: PatientService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'BenchmarkIT@2024',
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findOne(payload.email);
    if (!user) {
      throw error('User not found');
    }
    return { userId: payload.sub, username: payload.email };
  }
}