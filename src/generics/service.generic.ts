// import { Injectable } from '@nestjs/common';
// import { DeepPartial, ObjectLiteral, Repository } from 'typeorm';
// import * as jwt from 'jsonwebtoken';

// @Injectable()
// export class GenericService<T extends ObjectLiteral> {
//   public readonly secretKey = 'jsutlikethis';
//   public readonly accessTokenExpiry = '15m';
//   public readonly refreshTokenExpiry = '30m';
//   constructor(protected readonly repository: Repository<T>) {}

//   findAll(): Promise<T[]> {
//     return this.repository.find();
//   }

//   findOne(id: number): Promise<T | null> {
//     return this.repository.findOne({ where: { id } as any });
//   }

//   create(data: DeepPartial<T>): Promise<T> {
//     const entity = this.repository.create(data);
//     return this.repository.save(entity);
//   }

//   update(id: number, data: DeepPartial<T>): Promise<T> {
//     return this.repository.save({ ...data, id } as any);
//   }

//   async remove(id: number): Promise<void> {
//     return await this.repository.delete(id).then(() => undefined);
//   }

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
import { Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial, ObjectLiteral, Repository, QueryRunner, Like, FindManyOptions, FindOptionsOrder } from 'typeorm';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class GenericService<T extends ObjectLiteral> {
  public readonly secretKey = 'jsutlikethis';
  public readonly accessTokenExpiry = '15m';
  public readonly refreshTokenExpiry = '30m';

  constructor(protected readonly repository: Repository<T>) {}

  /**
   * Finds all entities.
   * @returns Promise<T[]>
   */
  async findAll(
    page: number,
    limit: number,
    sort?: string,
    order: 'ASC' | 'DESC' = 'ASC',
    search?: string,
  ): Promise<T[]> {
    const queryOptions: FindManyOptions<T> = {
      skip: (page - 1) * limit,
      take: limit,
      order: {} as FindOptionsOrder<T>, // Correct initialization with type assertion
      where: {},
    };
  
    // Add sorting if a sort field is provided
    if (sort) {
      (queryOptions.order as any)[sort] = order; // Use 'any' to bypass the type restriction
    }
  
    // Add searching
    if (search) {
      queryOptions.where = {
        name: Like(`%${search}%`) as any, // Ensure the type matches the entity's property type
      };
    }
  
    return this.repository.find(queryOptions);
  }

  /**
   * Finds a single entity by its ID.
   * @param id - The ID of the entity.ASC',
   * @returns Promise<T | null>
   */
  findOne(id: number): Promise<T | null> {
    try {
      return this.repository.findOne({ where: { id } as any });
    } catch (error) {
      throw new NotFoundException('Not Found')
    }
  }

  /**
   * Creates a new entity.
   * @param data - The data to create the entity.
   * @returns Promise<T>
   */
  create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  /**
   * Updates an existing entity.
   * @param id - The ID of the entity to update.
   * @param data - The new data to update the entity.
   * @returns Promise<T>
   */
  update(id: number, data: DeepPartial<T>): Promise<T> {
    return this.repository.save({ ...data, id } as any);
  }

  /**
   * Removes an entity by its ID.
   * @param id - The ID of the entity to remove.
   * @returns Promise<void>
   */
  async remove(id: number): Promise<void> {
    return await this.repository.delete(id).then(() => undefined);
  }

  /**
   * Creates a new entity within a transaction.
   * @param data - The data to create the entity.
   * @returns Promise<T>
   */
  async createWithTransaction(data: DeepPartial<T>): Promise<T> {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const entity = this.repository.create(data);
      const result = await queryRunner.manager.save(entity);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Generates JWT tokens.
   * @param payload - The payload to sign.
   * @returns { accessToken: string; refreshToken: string }
   */
  generateToken(payload: object): { accessToken: string; refreshToken: string } {
    const accessToken = jwt.sign(payload, this.secretKey, {
      expiresIn: this.accessTokenExpiry,
    });
    const refreshToken = jwt.sign(payload, this.secretKey, {
      expiresIn: this.refreshTokenExpiry,
    });

    return { accessToken, refreshToken };
  }

  /**
   * Verifies JWT token.
   * @param token - The token to verify.
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
