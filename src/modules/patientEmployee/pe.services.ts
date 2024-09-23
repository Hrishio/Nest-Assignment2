import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { PatientEmployee } from '@src/entity/patientEmployee.entity'; // PatientEmployee entity
import { GenericService } from 'src/generics/service.generic';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class PatientEmployeeService extends GenericService<PatientEmployee> { // Extend with PatientEmployee
  constructor(
    @InjectRepository(PatientEmployee) // Inject PatientEmployee repository
    private patientEmployeeRepository: Repository<PatientEmployee>,
  ) {
    super(patientEmployeeRepository); // Pass the repository to the generic service
  }

  /**
   * Find all patient-employee interactions.
   * @returns Promise<PatientEmployee[]>
   */
  findAll(): Promise<PatientEmployee[]> { // Return PatientEmployee[]
    return this.repository.find();
  }

  /**
   * Find one patient-employee interaction by ID.
   * @param id - ID of the interaction to find.
   * @returns Promise<PatientEmployee | null>
   */
  findOne(id: number): Promise<PatientEmployee | null> {
    return this.repository.findOneBy({ id }); // Using id for PatientEmployee entity
  }

  /**
   * Remove a patient-employee interaction by ID.
   * @param id - ID of the interaction to remove.
   * @returns Promise<void>
   */
  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  /**
   * Create a new patient-employee interaction.
   * @param interactionData - Data for the new interaction.
   * @returns Promise<PatientEmployee>
   */
  async create(interactionData: DeepPartial<PatientEmployee>): Promise<PatientEmployee> {
    const newInteraction = this.repository.create(interactionData);
    return this.repository.save(newInteraction);
  }

  /**
   * Update an existing patient-employee interaction.
   * @param id - ID of the interaction to update.
   * @param interactionData - Data to update.
   * @returns Promise<PatientEmployee>
   */
  async update(id: number, interactionData: DeepPartial<PatientEmployee>): Promise<PatientEmployee> {
    const interaction = await this.repository.preload({ id, ...interactionData });

    if (!interaction) {
      throw new Error(`PatientEmployee interaction with ID ${id} not found`);
    }

    return this.repository.save(interaction);
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
