import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Appointments } from './appointments.entity';
import { Medicines } from './medicine.entity';
import { Department } from './dept.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  empId: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  address: string;

  @Column()
  dob: string;

  @Column()
  phoneNumber: string;

  @Column()
  patientId: number;

  @Column()
  deptId: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @Column({ nullable: false })
  createdBy: number;

  @Column({ nullable: false })
  updatedBy: number;

  @OneToMany(() => Appointments, (appointment) => appointment.empId)
  appointments: Appointments[];

  @OneToMany(() => Medicines, (medicine) => medicine.empId)
  medicines: Medicines[];

  @ManyToOne(() => Department, (department) => department.empId)
  department: Department;
}
