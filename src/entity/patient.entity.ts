import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Employee } from './employee.entity';
import { Appointments } from './appointments.entity';
import { Medicines } from './medicine.entity';
import { Department } from './dept.entity';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  patientId: number;

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
  empId: number;

  @Column({nullable:true})
  deptID: number;

  @Column()
  appId: number;

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

  @OneToMany(() => Appointments, (appointment) => appointment.patientId)
  appointments: Appointments[];

  @OneToMany(() => Medicines, (medicine) => medicine.patientId)
  medicines: Medicines[];

  @OneToOne(() => Appointments, (appointment) => appointment.patientId)
  patient: Appointments[];

  @ManyToOne(() => Department, (department) => department.patientId)
  department: Department;
}
