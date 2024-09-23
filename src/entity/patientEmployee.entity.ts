import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Patient } from './patient.entity';
import { Employee } from './employee.entity';

@Entity()
export class PatientEmployee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  interactionType: string; // e.g., Consultation, Surgery, etc.

  @ManyToOne(() => Patient, (patient) => patient.patientId)
  @JoinColumn({ name: 'patientId' })
  patient: Patient;

  @ManyToOne(() => Employee, (employee) => employee.empId)
  @JoinColumn({ name: 'empId' })
  employee: Employee;

  @Column({ type: 'timestamp' })
  interactionDate: Date;
}
