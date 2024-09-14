import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../../entity/patient.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private usersRepository: Repository<Patient>,
  ) {}

  findAll(): Promise<Patient[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<Patient | null> {
    return this.usersRepository.findOneBy({ patientId: id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(patientData: Partial<Patient>): Promise<Patient | null> {
    const newPatient = this.usersRepository.create(patientData);
    return this.usersRepository.save(newPatient);
  }
}
