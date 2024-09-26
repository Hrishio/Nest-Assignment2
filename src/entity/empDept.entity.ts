import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    Column,
  } from 'typeorm';
  import { Employee } from './employee.entity';
  import { Department } from './dept.entity';
  
  @Entity()
  export class EmployeeDepartment {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Employee, (employee) => employee.empId)
    @JoinColumn({ name: 'empId' })
    employee: Employee;
  
    @ManyToOne(() => Department, (department) => department.deptID)
    @JoinColumn({ name: 'deptId' })
    department: Department;
  
    @Column({ type: 'timestamp' })
    startDate: Date;
  
    @Column({ type: 'timestamp', nullable: true })
    endDate: Date; // When the employee left the department (optional)
  }
  