import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
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
  async create(appData: DeepPartial<Appointments>): Promise<Appointments> {
    const newApp = this.repository.create(appData);
    return this.repository.save(newApp);
  }
  

  // Update an existing patient
  async update(
    id: number,
    appData: DeepPartial<Appointments>,
  ): Promise<Appointments> {
    const app = await this.repository.preload({ appId: id, ...appData });
  
    if (!app) {
      throw new Error(`Entity with id ${id} not found`); // or handle this case according to your requirements
    }
  
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
