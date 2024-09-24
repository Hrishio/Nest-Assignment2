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
import {
  DeepPartial,
  FindManyOptions,
  FindOptionsOrder,
  Like,
  Repository,
} from 'typeorm';
import { Patient } from 'src/entity/patient.entity';
import { GenericService } from 'src/generics/service.generic';
import * as jwt from 'jsonwebtoken';
import { TransactionService } from '@src/transactions/transaction.service';
import { CreatePatientDto, updatePatientDto } from '@src/dtos/patient.dto';

@Injectable()
export class PatientService extends GenericService<Patient> {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    private readonly transactionService: TransactionService,
  ) {
    super(patientRepository);
  }

  /**
   * Find all patients.
   * @returns Promise<Patient[]>
   */
  // findAll(
  //   page: number,
  //   limit: number,
  //   sort?: string,
  //   order?: 'ASC' | 'DESC',
  //   search?: string,
  // ): Promise<Patient[]>;

  // findAll(
  //   page: number,
  //   limit: number,
  //   search?: string,
  //   sort?: string,
  //   order?: 'ASC' | 'DESC',
  // ): Promise<{
  //   data: Patient[];
  //   currentPage: number;
  //   nextPage: number | null;
  //   prevPage: number | null;
  //   totalItems: number;
  //   totalPages: number;
  // }>;
  // Implementation
  // async findAll(
  //   page: number,
  //   limit: number,
  //   search?: string,
  //   sort?: string,
  //   order: 'ASC' | 'DESC' = 'ASC'
  // ): Promise<any> {  // Use any to allow flexible return types
  //   const queryOptions: FindManyOptions<Patient> = {
  //     skip: (page - 1) * limit,
  //     take: limit,
  //     order: {} as FindOptionsOrder<Patient>,
  //     where: {},
  //   };

  //   if (sort) {
  //     (queryOptions.order as any)[sort] = order;
  //   }

  //   if (search) {
  //     queryOptions.where = {
  //       firstName: Like(`%${search}%`) as any,
  //     };
  //   }

  //   const [data, total] = await this.repository.findAndCount(queryOptions);
  //   const totalPages = Math.ceil(total / limit);
  //   const nextPage = page < totalPages ? page + 1 : null;
  //   const prevPage = page > 1 ? page - 1 : null;

  //   return {
  //     data,
  //     currentPage: page,
  //     nextPage,
  //     prevPage,
  //     totalItems: total,
  //     totalPages,
  //   };
  // }// Assuming this is your entity

  // Define the overloads
findAll(
  page: number,
  limit: number,
  sort?: string,
  order?: 'ASC' | 'DESC',
  search?: string,
): Promise<Patient[]>;

findAll(
  page: number,
  limit: number,
  search?: string,
  sort?: string,
  order?: 'ASC' | 'DESC',
): Promise<{
  data: Patient[];
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  totalItems: number;
  totalPages: number;
}>;

// Implementation
async findAll(
  page: number,
  limit: number,
  searchOrSort?: keyof Patient,
  sortOrOrder?: string | 'ASC' | 'DESC',
  order?: 'ASC' | 'DESC',
): Promise<any> {
  const queryOptions: FindManyOptions<Patient> = {
    skip: (page - 1) * limit, // Pagination offset
    take: limit, // Pagination limit
    order: {}, // Empty initially
    where: {}, // Empty initially, filled based on search
  };

  // Determine search and sort/order
  let search: string | undefined;
  let sort: keyof Patient | undefined
  let orderBy: 'ASC' | 'DESC' | undefined;

  if (typeof sortOrOrder === 'string' && (sortOrOrder === 'ASC' || sortOrOrder === 'DESC')) {
    orderBy = sortOrOrder;
    sort = searchOrSort; // Assign the searchOrSort to sort if it's a string
  } else {
    search = searchOrSort; // Assign to search if it's not an order
    sort = sortOrOrder as keyof Patient; // Ensure it's treated as a string
  }

  // If sort is provided, add it to the order options
  if (sort) {
    (queryOptions.order as FindOptionsOrder<Patient>)[sort] = orderBy || 'ASC'; // Default to ASC if no order is provided
  }

  // If search is provided, filter by firstName (or adjust to the correct field)
  if (search) {
    queryOptions.where = {
      firstName: Like(`%${search}%`), // Modify 'firstName' if field is named differently in entity
    };
  }

  try {
    const [data, total] = await this.repository.findAndCount(queryOptions); // Fetch data and total count
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
  // async create(patientData: DeepPartial<Patient>): Promise<Patient> {
  //   const newPatient = this.repository.create(patientData);
  //   return this.repository.save(newPatient);
  // }

  // async create(createDto: DeepPartial<Patient>): Promise<Patient> {
  async create(createDto: CreatePatientDto): Promise<Patient> {
    return await this.transactionService.executeInTransaction(this.patientRepository.manager, async () => {
      const newPatient = this.patientRepository.create(createDto); // Use patientRepository instead of repository
      return await this.patientRepository.save(newPatient);
    });
  }

  /**
   * Update an existing patient.
   * @param id - ID of the patient to update.
   * @param patientData - Data to update.
   * @returns Promise<Patient>
   */
  async update(
    patientId: number,
    // patientData: DeepPartial<Patient>,
    patientData: updatePatientDto,
  ): Promise<Patient> {
    const patient = await this.repository.findOne({ where: { patientId } });

    if (!patient) {
      throw new Error(`Patient with ID ${patientId} not found`);
    }

    Object.assign(patient, patientData);

    return this.repository.save(patient);
  }

  async findByEmpId(empId: number): Promise<Patient[]> {
    return await this.patientRepository.find({ where: { empId } });
  }

  async findAppById(appId: number): Promise<Patient[]> {
    return await this.patientRepository.find({ where: { appId } });
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
