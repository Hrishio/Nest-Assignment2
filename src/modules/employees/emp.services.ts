import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from 'src/entity/patient.entity';
import { GenericService } from 'src/generics/service.generic';
import { Employee } from 'src/entity/employee.entity';

@Injectable()
export class EmpService extends GenericService<Employee> {
  constructor(
    @InjectRepository(Employee)
    private readonly empRepository: Repository<Employee>,
  ) {
    super(empRepository);
  }

  // Find all patients
  findAll(): Promise<Employee[]> {
    return this.repository.find();
  }

  // Find one patient by ID
  findOne(id: number): Promise<Employee | null> {
    return this.repository.findOneBy({ empId: id });
  }

  // Remove a patient by ID
  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  // Create a new patient
  async create(empData: Partial<Employee>): Promise<Employee | null> {
    const newEmp = this.repository.create(empData);
    return this.repository.save(newEmp);
  }

  // Update an existing patient
  async update(
    id: number,
    empData: Partial<Employee>,
  ): Promise<Employee | null> {
    const emp = await this.repository.findOneBy({ empId: id });

    if (!emp) {
      return null;
    }

    Object.assign(emp, empData);

    return this.repository.save(emp);
  }
}
