// // import { Injectable } from '@nestjs/common';
// // import { InjectRepository } from '@nestjs/typeorm';
// // import { DeepPartial, Repository } from 'typeorm';
// // import { Patient } from 'src/entity/patient.entity';
// // import { GenericService } from 'src/generics/service.generic';
// // import * as jwt from 'jsonwebtoken';

// // @Injectable()
// // export class PatientService extends GenericService<Patient> {
// //   constructor(
// //     @InjectRepository(Patient)
// //     private readonly patientRepository: Repository<Patient>,
// //   ) {
// //     super(patientRepository);
// //   }

// //   // Find all patients
// //   findAll(): Promise<Patient[]> {
// //     return this.repository.find();
// //   }

// //   // Find one patient by ID
// //   findOne(id: number): Promise<Patient | null> {
// //     return this.repository.findOneBy({ patientId: id });
// //   }

// //   // Remove a patient by ID
// //   async remove(id: number): Promise<void> {
// //     await this.repository.delete(id);
// //   }

// //   // Create a new patient
// // // Example for AppService

// // async create(patientData: DeepPartial<Patient>): Promise<Patient> {
// //   const newPatient = this.repository.create(patientData);
// //   return this.repository.save(newPatient);
// // }

// // async update(
// //   id: number,
// //   patientData: DeepPartial<Patient>,
// // ): Promise<Patient> {
// //   const patient = await this.repository.preload({ patientId: id, ...patientData });

// //   if (!patient) {
// //     throw new Error(`Entity with id ${id} not found`);
// //   }

// //   return this.repository.save(patient);
// // }

// //   generateToken(payload: object): {
// //     accessToken: string;
// //     refreshToken: string;
// //   } {
// //     const accessToken = jwt.sign(payload, this.secretKey, {
// //       expiresIn: this.accessTokenExpiry,
// //     });
// //     const refreshToken = jwt.sign(payload, this.secretKey, {
// //       expiresIn: this.refreshTokenExpiry,
// //     });

// //     return { accessToken, refreshToken };
// //   }

// //   verifyToken(token: string): object | null {
// //     try {
// //       return jwt.verify(token, this.secretKey) as object;
// //     } catch (error) {
// //       return null;
// //     }
// //   }
// // }
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import {
//   DeepPartial,
//   EntityManager,
//   FindManyOptions,
//   FindOptionsOrder,
//   Like,
//   Repository,
// } from 'typeorm';
// import { Patient } from 'src/entity/patient.entity';
// import { GenericService } from 'src/generics/service.generic';
// import * as jwt from 'jsonwebtoken';
// import { TransactionService } from '@src/transactions/transaction.service';
// import { CreatePatientDto, updatePatientDto } from '@src/dtos/patient.dto';

// @Injectable()
// export class PatientService extends GenericService<Patient> {
//   constructor(
//     @InjectRepository(Patient)
//     private readonly patientRepository: Repository<Patient>,
//     private readonly entityManager: EntityManager,
//     private readonly transactionService:TransactionService,
//   ) {
//     super(patientRepository);
//   }

//   /**
//    * Find all patients.
//    * @returns Promise<Patient[]>
//    */
//   // findAll(
//   //   page: number,
//   //   limit: number,
//   //   sort?: string,
//   //   order?: 'ASC' | 'DESC',
//   //   search?: string,
//   // ): Promise<Patient[]>;

//   // findAll(
//   //   page: number,
//   //   limit: number,
//   //   search?: string,
//   //   sort?: string,
//   //   order?: 'ASC' | 'DESC',
//   // ): Promise<{
//   //   data: Patient[];
//   //   currentPage: number;
//   //   nextPage: number | null;
//   //   prevPage: number | null;
//   //   totalItems: number;
//   //   totalPages: number;
//   // }>;
//   // Implementation
//   // async findAll(
//   //   page: number,
//   //   limit: number,
//   //   search?: string,
//   //   sort?: string,
//   //   order: 'ASC' | 'DESC' = 'ASC'
//   // ): Promise<any> {  // Use any to allow flexible return types
//   //   const queryOptions: FindManyOptions<Patient> = {
//   //     skip: (page - 1) * limit,
//   //     take: limit,
//   //     order: {} as FindOptionsOrder<Patient>,
//   //     where: {},
//   //   };

//   //   if (sort) {
//   //     (queryOptions.order as any)[sort] = order;
//   //   }

//   //   if (search) {
//   //     queryOptions.where = {
//   //       firstName: Like(`%${search}%`) as any,
//   //     };
//   //   }

//   //   const [data, total] = await this.repository.findAndCount(queryOptions);
//   //   const totalPages = Math.ceil(total / limit);
//   //   const nextPage = page < totalPages ? page + 1 : null;
//   //   const prevPage = page > 1 ? page - 1 : null;

//   //   return {
//   //     data,
//   //     currentPage: page,
//   //     nextPage,
//   //     prevPage,
//   //     totalItems: total,
//   //     totalPages,
//   //   };
//   // }// Assuming this is your entity

//   // Define the overloads
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

// // Implementation
// async findAll(
//   page: number,
//   limit: number,
//   searchOrSort?: keyof Patient,
//   sortOrOrder?: string | 'ASC' | 'DESC',
//   order?: 'ASC' | 'DESC',
// ): Promise<any> {
//   const queryOptions: FindManyOptions<Patient> = {
//     skip: (page - 1) * limit, // Pagination offset
//     take: limit, // Pagination limit
//     order: {}, // Empty initially
//     where: {}, // Empty initially, filled based on search
//   };

//   // Determine search and sort/order
//   let search: string | undefined;
//   let sort: keyof Patient | undefined
//   let orderBy: 'ASC' | 'DESC' | undefined;

//   if (typeof sortOrOrder === 'string' && (sortOrOrder === 'ASC' || sortOrOrder === 'DESC')) {
//     orderBy = sortOrOrder;
//     sort = searchOrSort; // Assign the searchOrSort to sort if it's a string
//   } else {
//     search = searchOrSort; // Assign to search if it's not an order
//     sort = sortOrOrder as keyof Patient; // Ensure it's treated as a string
//   }

//   // If sort is provided, add it to the order options
//   if (sort) {
//     (queryOptions.order as FindOptionsOrder<Patient>)[sort] = orderBy || 'ASC'; // Default to ASC if no order is provided
//   }

//   // If search is provided, filter by firstName (or adjust to the correct field)
//   if (search) {
//     queryOptions.where = {
//       firstName: Like(`%${search}%`), // Modify 'firstName' if field is named differently in entity
//     };
//   }

//   try {
//     const [data, total] = await this.repository.findAndCount(queryOptions); // Fetch data and total count
//     const totalPages = Math.ceil(total / limit); // Calculate total pages
//     const nextPage = page < totalPages ? page + 1 : null; // Calculate next page
//     const prevPage = page > 1 ? page - 1 : null; // Calculate previous page

//     return {
//       data,
//       currentPage: page,
//       nextPage,
//       prevPage,
//       totalItems: total,
//       totalPages,
//     };
//   } catch (error) {
//     throw new Error(`Error fetching patients: ${error}`); // Error handling
//   }
// }

//   /**
//    * Find one patient by ID.
//    * @param id - ID of the patient to find.
//    * @returns Promise<Patient | null>
//    */
//   findOne(id: number): Promise<Patient | null> {
//     return this.repository.findOneBy({ patientId: id });
//   }

//   /**
//    * Remove a patient by ID.
//    * @param id - ID of the patient to remove.
//    * @returns Promise<void>
//    */
//   async remove(id: number): Promise<void> {
//     await this.repository.delete(id);
//   }

//   /**
//    * Create a new patient.
//    * @param patientData - Data for the new patient.
//    * @returns Promise<Patient>
//    */
//   // async create(patientData: DeepPartial<Patient>): Promise<Patient> {
//   //   const newPatient = this.repository.create(patientData);
//   //   return this.repository.save(newPatient);
//   // }

//   // async create(createDto: DeepPartial<Patient>): Promise<Patient> {
//   // async create(createDto: CreatePatientDto): Promise<Patient> {
//   //   return await this.transactionService.executeInTransaction(this.patientRepository.manager, async () => {
//   //     const newPatient = this.patientRepository.create(createDto); // Use patientRepository instead of repository
//   //     return await this.patientRepository.save(newPatient);
//   //   });
//   // }
//   async createPatient(createPatientDto: CreatePatientDto): Promise<Patient> {
//     return this.transactionService.handleTransaction(async (queryRunner) => {
//       // Create the patient using the transaction manager
//       const patient = queryRunner.manager.create(Patient, createPatientDto);
//       return await queryRunner.manager.save(patient); // Save the patient and return it
//     });
//   }

//   /**
//    * Update an existing patient.
//    * @param id - ID of the patient to update.
//    * @param patientData - Data to update.
//    * @returns Promise<Patient>
//    */
//   async update(
//     patientId: number,
//     // patientData: DeepPartial<Patient>,
//     patientData: updatePatientDto,
//   ): Promise<Patient> {
//     const patient = await this.repository.findOne({ where: { patientId } });

//     if (!patient) {
//       throw new Error(`Patient with ID ${patientId} not found`);
//     }

//     Object.assign(patient, patientData);

//     return this.repository.save(patient);
//   }

//   async findByEmpId(empId: number): Promise<Patient[]> {
//     return await this.patientRepository.find({ where: { empId } });
//   }

//   async findAppById(appId: number): Promise<Patient[]> {
//     return await this.patientRepository.find({ where: { appId } });
//   }

//   /**
//    * Generate JWT tokens.
//    * @param payload - Payload to encode in the token.
//    * @returns { accessToken: string; refreshToken: string; }
//    */
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

//   /**
//    * Verify JWT token.
//    * @param token - Token to verify.
//    * @returns object | null
//    */
//   verifyToken(token: string): object | null {
//     try {
//       return jwt.verify(token, this.secretKey) as object;
//     } catch (error) {
//       return null;
//     }
//   }
// }
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeepPartial,
  EntityManager,
  FindManyOptions,
  FindOptionsOrder,
  Like,
  Repository,
} from 'typeorm';
import { Patient } from 'src/entity/patient.entity';
import { GenericService } from 'src/generics/service.generic';
import * as bcrypt from 'bcryptjs';

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
  // ACCESS_TOKEN_SECRET = 'Benchmark@2024'
  // REFRESH_TOKEN_SECRET = 'BITS@2024'
  // ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY
  // REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY
  // generateToken(payload: object): {
  //   accessToken: string;
  //   refreshToken: string;
  // } {
  //   const accessToken = jwt.sign(payload, this.secretKey, {
  //     expiresIn: '1h',
  //   });
  //   const refreshToken = jwt.sign(payload, this.secretKey, {
  //     expiresIn: '2h',
  //   });

  //   return { accessToken, refreshToken };
  // }
  // generateTokenP(patientData: DeepPartial<Patient>): string {
  //   const payload = { ...patientData }; // Customize the payload as needed
  //   return this.jwtService.sign(payload); // Generate the token
  // }

  // /**
  //  * Verify a JWT token.
  //  * @param token - Token to verify.
  //  * @returns Decoded payload or null if verification fails.
  //  */
  // verifyToken(token: string): object | null {
  //   try {
  //     return jwt.verify(token, ) as object;
  //   } catch (error) {
  //     console.log(error);
  //     return null
  //   }
  // }

  async validateUser(email: string, password: string): Promise<any> {
    try {
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
