import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from 'src/entity/dept.entity';
import { GenericService } from 'src/generics/service.generic';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class DeptService extends GenericService<Department> {
  constructor(
    @InjectRepository(Department)
    private readonly deptRepository: Repository<Department>,
  ) {
    super(deptRepository);
  }

  // Find all patients
  findAll(): Promise<Department[]> {
    return this.repository.find();
  }

  // Find one patient by ID
  findOne(id: number): Promise<Department | null> {
    return this.repository.findOneBy({ deptId: id });
  }

  // Remove a patient by ID
  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  // Create a new patient
  async create(deptData: Partial<Department>): Promise<Department | null> {
    const newDept = this.repository.create(deptData);
    return this.repository.save(newDept);
  }

  // Update an existing patient
  async update(
    id: number,
    deptData: Partial<Department>,
  ): Promise<Department | null> {
    const dept = await this.repository.findOneBy({ deptId: id });

    if (!dept) {
      return null;
    }

    Object.assign(dept, deptData);

    return this.repository.save(dept);
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
