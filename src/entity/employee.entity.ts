import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,  // Import this to define the foreign key column
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

  // Define deptId as a foreign key that references the Department entity
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

  // One-to-many relation between Employee and Appointments
  @OneToMany(() => Appointments, (appointment) => appointment.empId)
  appointments: Appointments[];

  // One-to-many relation between Employee and Medicines
  @OneToMany(() => Medicines, (medicine) => medicine.empId)
  medicines: Medicines[];

  // Many-to-one relation between Employee and Department, using @JoinColumn to specify the foreign key
  @ManyToOne(() => Department, (department) => department.employees)
  @JoinColumn({ name: 'deptId' })  // Explicitly define the foreign key column
  department: Department;
}
