import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
} from 'typeorm';
import { Patient } from './patient.entity';

@Entity()
export class Appointments {
  @PrimaryGeneratedColumn()
  appId: number;

  @Column()
  appDate: string;

  @Column()
  cause: string;

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

  @OneToOne(() => Patient, (patient) => patient.appId)
  patient: Patient[];
}
