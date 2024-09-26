import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PatientModule } from '../patients/patient.module'; // Ensure this path is correct
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwtStratergy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'BenchmarkIT@2024', 
      signOptions: { expiresIn: '60s' }, 
    }),
    PatientModule,
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}import { PatientService } from 'src/modules/patients/patient.services';
import { Patient } from '@src/entity/patient.entity';
