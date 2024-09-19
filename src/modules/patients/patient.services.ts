// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { DeepPartial, Repository } from 'typeorm';
// import { Patient } from 'src/entity/patient.entity';
// import { GenericService } from 'src/generics/service.generic';
// import * as jwt from 'jsonwebtoken';

// @Injectable()
// export class PatientService extends GenericService<Patient> {
//   constructor(
//     @InjectRepository(Patient)
//     private readonly patientRepository: Repository<Patient>,
//   ) {
//     super(patientRepository);
//   }

//   // Find all patients
//   findAll(): Promise<Patient[]> {
//     return this.repository.find();
//   }

//   // Find one patient by ID
//   findOne(id: number): Promise<Patient | null> {
//     return this.repository.findOneBy({ patientId: id });
//   }

//   // Remove a patient by ID
//   async remove(id: number): Promise<void> {
//     await this.repository.delete(id);
//   }

//   // Create a new patient
// // Example for AppService

// async create(patientData: DeepPartial<Patient>): Promise<Patient> {
//   const newPatient = this.repository.create(patientData);
//   return this.repository.save(newPatient);
// }

// async update(
//   id: number,
//   patientData: DeepPartial<Patient>,
// ): Promise<Patient> {
//   const patient = await this.repository.preload({ patientId: id, ...patientData });

//   if (!patient) {
//     throw new Error(`Entity with id ${id} not found`);
//   }

//   return this.repository.save(patient);
// }


//   generateToken(payload: object): {
//     accessToken: string;
//     refreshToken: string;
//   } {
//     const accessToken = jwt.sign(payload, this.secretKey, {
//       expiresIn: this.accessTokenExpiry,
//     });
//     const refreshToken = jwt.sign(payload, this.secretKey, {
//       expiresIn: this.refreshTokenExpiry,
//     });

//     return { accessToken, refreshToken };
//   }

//   verifyToken(token: string): object | null {
//     try {
//       return jwt.verify(token, this.secretKey) as object;
//     } catch (error) {
//       return null;
//     }
//   }
// }
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Patient } from 'src/entity/patient.entity';
import { GenericService } from 'src/generics/service.generic';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class PatientService extends GenericService<Patient> {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {
    super(patientRepository);
  }

  /**
   * Find all patients.
   * @returns Promise<Patient[]>
   */
  findAll(): Promise<Patient[]> {
    return this.repository.find();
  }

  /**
   * Find one patient by ID.
   * @param id - ID of the patient to find.
   * @returns Promise<Patient | null>
   */
  findOne(id: number): Promise<Patient | null> {
    return this.repository.findOneBy({ patientId: id });
  }

  /**
   * Remove a patient by ID.
   * @param id - ID of the patient to remove.
   * @returns Promise<void>
   */
  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  /**
   * Create a new patient.
   * @param patientData - Data for the new patient.
   * @returns Promise<Patient>
   */
  async create(patientData: DeepPartial<Patient>): Promise<Patient> {
    const newPatient = this.repository.create(patientData);
    return this.repository.save(newPatient);
  }

  /**
   * Update an existing patient.
   * @param id - ID of the patient to update.
   * @param patientData - Data to update.
   * @returns Promise<Patient>
   */
  async update(id: number, patientData: DeepPartial<Patient>): Promise<Patient> {
    const patient = await this.repository.preload({ patientId: id, ...patientData });

    if (!patient) {
      throw new Error(`Patient with ID ${id} not found`);
    }

    return this.repository.save(patient);
  }

  /**
   * Generate JWT tokens.
   * @param payload - Payload to encode in the token.
   * @returns { accessToken: string; refreshToken: string; }
   */
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

  /**
   * Verify JWT token.
   * @param token - Token to verify.
   * @returns object | null
   */
  verifyToken(token: string): object | null {
    try {
      return jwt.verify(token, this.secretKey) as object;
    } catch (error) {
      return null;
    }
  }
}
