import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
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

  async findPatientById(patientId: number): Promise<Employee[]> {
    return await this.empRepository.find({ where: { patientId } });
  }

  // Remove a patient by ID
  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  // Create a new patient
  // Example for AppService

async create(empData: DeepPartial<Employee>): Promise<Employee> {
  const newEmp = this.repository.create(empData);
  return this.repository.save(newEmp);
}

async update(
  id: number,
  empData: DeepPartial<Employee>,
): Promise<Employee> {
  const emp = await this.repository.preload({ empId: id, ...empData });

  if (!emp) {
    throw new Error(`Entity with id ${id} not found`);
  }

  return this.repository.save(emp);
}

}
