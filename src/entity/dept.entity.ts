import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Patient } from './patient.entity';
import { Employee } from './employee.entity';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  deptID: number;

  @Column()
  deptName: string;

  @Column()
  location: string;

  @Column()
  empId: number;

  @Column()
  patientId: number;

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

  @OneToMany(() => Patient, (patient) => patient.deptID)
  patients: Patient[];
}
