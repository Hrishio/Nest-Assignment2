import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointments } from 'src/entity/appointments.entity';
import { GenericService } from 'src/generics/service.generic';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AppService extends GenericService<Appointments> {
  constructor(
    @InjectRepository(Appointments)
    private readonly appRepository: Repository<Appointments>,
  ) {
    super(appRepository);
  }

  // Find all patients
  findAll(): Promise<Appointments[]> {
    return this.repository.find();
  }

  // Find one patient by ID
  findOne(id: number): Promise<Appointments | null> {
    return this.repository.findOneBy({ appId: id });
  }

  // Remove a patient by ID
  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  // Create a new patient
  async create(appData: Partial<Appointments>): Promise<Appointments | null> {
    const newapp = this.repository.create(appData);
    return this.repository.save(newapp);
  }

  // Update an existing patient
  async update(
    id: number,
    appData: Partial<Appointments>,
  ): Promise<Appointments | null> {
    const app = await this.repository.findOneBy({ appId: id });

    if (!app) {
      return null;
    }

    Object.assign(app, appData);

    return this.repository.save(app);
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
