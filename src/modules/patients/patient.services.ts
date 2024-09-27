import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeepPartial,
  FindManyOptions,
  FindOptionsOrder,
  Like,
  Repository,
} from 'typeorm';
import { Patient } from 'src/entity/patient.entity';
import { GenericService } from 'src/generics/service.generic';

@Injectable()
export class PatientService extends GenericService<Patient> {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {
    super(patientRepository);
  }

  /**
   * Find all patients with pagination, sorting, and searching.
   * @param page - Current page number.
   * @param limit - Number of records per page.
   * @param search - Optional search term for filtering patients.
   * @param sort - Optional field to sort by (as a string).
   * @param order - Optional order direction ('ASC' or 'DESC').
   * @returns Promise containing patient data with pagination info.
   */
  async getAllPatients(
    page: number,
    limit: number,
    search?: string,
    sort?: keyof Patient, // Ensure sort is a key of Patient
    order: 'ASC' | 'DESC' = 'ASC', // Default order
  ): Promise<{
    data: Patient[];
    currentPage: number;
    nextPage: number | null;
    prevPage: number | null;
    totalItems: number;
    totalPages: number;
  }> {
    const queryOptions: FindManyOptions<Patient> = {
      skip: (page - 1) * limit, // Pagination offset
      take: limit, // Pagination limit
      order: {}, // Empty initially
      where: {}, // Empty initially, filled based on search
    };

    // If sort is provided, add it to the order options
    if (sort) {
      (queryOptions.order as FindOptionsOrder<Patient>)[sort] = order; // Assign order to sort field
    }

    // If search is provided, filter by firstName (or adjust to the correct field)
    if (search) {
      queryOptions.where = {
        firstName: Like(`%${search}%`), // Modify 'firstName' if field is named differently in entity
      };
    }

    try {
      const [data, total] =
        await this.patientRepository.findAndCount(queryOptions); // Fetch data and total count
      const totalPages = Math.ceil(total / limit); // Calculate total pages
      const nextPage = page < totalPages ? page + 1 : null; // Calculate next page
      const prevPage = page > 1 ? page - 1 : null; // Calculate previous page

      return {
        data,
        currentPage: page,
        nextPage,
        prevPage,
        totalItems: total,
        totalPages,
      };
    } catch (error) {
      throw new Error(`Error fetching patients: ${error}`); // Error handling
    }
  }

  /**
   * Find one patient by ID.
   * @param id - ID of the patient to find.
   * @returns Promise<Patient | null>
   */
  getPatientById(id: number): Promise<Patient | null> {
    return this.repository.findOneBy({ patientId: id });
  }
  getEmpById(id: number): Promise<Patient | null> {
    return this.repository.findOneBy({ empId: id });
  }
  getAppById(id: number): Promise<Patient | null> {
    return this.repository.findOneBy({ appId: id });
  }

  findOne(id:number):Promise<Patient|null>{
    return this.repository.findOneBy({patientId:id})
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
   * @param patientData - Updated data for the patient.
   * @returns Promise<Patient>
   */
  async update(
    id: number,
    patientData: DeepPartial<Patient>,
  ): Promise<Patient> {
    const patient = await this.repository.preload({
      patientId: id,
      ...patientData,
    });

    if (!patient) {
      throw new Error(`Entity with id ${id} not found`);
    }

    return this.repository.save(patient);
  }

  async findOneByEmailAndDob(email: string, password:string): Promise<Patient | null> {
    return await this.patientRepository.findOne({
      where: { email, password },
    });
  }
  /**
   * Generate JWT tokens for a patient.
   * @param payload - Payload to encode in the token.
   * @returns Object containing access and refresh tokens.
   */

  async validateUser(email: string, password: string): Promise<any> {
    try {
      if(!email&&!password){
        throw UnauthorizedException
      }
        // Fetch the user entity based on email and password
        const entity = await this.findOneByEmailAndDob(email, password);
        
        // Check if the entity exists and the password matches
        if (entity) {
            const { password, ...result } = entity;  // Exclude the password from the result
            return result;  // Return the user data without the password
        } else {
            throw new UnauthorizedException('Invalid credentials'); // No matching entity found
        }
    } catch (error) {
        // Handle any errors during the query
        throw new UnauthorizedException('Invalid credentials');
    }
}

}
