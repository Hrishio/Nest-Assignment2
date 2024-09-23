import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    Column,
  } from 'typeorm';
  import { Patient } from './patient.entity';
  import { Medicines } from './medicine.entity';
  
  @Entity()
  export class PatientMedicine {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Patient, (patient) => patient.patientId)
    @JoinColumn({ name: 'patientId' })
    patient: Patient;
  
    @ManyToOne(() => Medicines, (medicine) => medicine.medId)
    @JoinColumn({ name: 'medId' })
    medicine: Medicines;
  
    @Column()
    dosage: string;
  
    @Column({ type: 'timestamp' })
    prescribedDate: Date;
  }
  