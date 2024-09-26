import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

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

  @Column({ unique: true })
  password: string;

  @Column()
  address: string;

  @Column()
  dob: string;

  @Column()
  phoneNumber: string;

  @Column()
  empId: number;

  @Column({ nullable: true })
  deptID: number;

  @Column()
  appId: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date; // Changed to optional

  @Column()
  createdBy: number;

  @Column()
  updatedBy: number;
}
