import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Medicines } from 'src/entity/medicine.entity';
import { GenericService } from 'src/generics/service.generic';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class MedService extends GenericService<Medicines> {
  constructor(
    @InjectRepository(Medicines)
    private readonly medRepository: Repository<Medicines>,
  ) {
    super(medRepository);
  }

  // Find all patients
  findAll(): Promise<Medicines[]> {
    return this.repository.find();
  }

  // Find one patient by ID
  findOne(id: number): Promise<Medicines | null> {
    return this.repository.findOneBy({ medId: id });
  }

  // Remove a patient by ID
  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  // Create a new patient
 // Example for AppService

async create(medData: DeepPartial<Medicines>): Promise<Medicines> {
  const newMed = this.repository.create(medData);
  return this.repository.save(newMed);
}

async update(
  id: number,
  medData: DeepPartial<Medicines>,
): Promise<Medicines> {
  const med = await this.repository.preload({ medId: id, ...medData });

  if (!med) {
    throw new Error(`Entity with id ${id} not found`);
  }

  return this.repository.save(med);
}

  generateToken(payload: object): {
    accessToken: string;
    refreshToken: string;
  } {
    const accessToken = jwt.sign(payload, this.secretKey, {
      expiresIn: this.accessTokenExpiry,
    });
    const refreshToken = jwt.sign(payload, this.secretKey, {
      expiresIn: this.refreshTokenExpiry,
    });

    return { accessToken, refreshToken };
  }

  verifyToken(token: string): object | null {
    try {
      return jwt.verify(token, this.secretKey) as object;
    } catch (error) {
      return null;
    }
  }
}
