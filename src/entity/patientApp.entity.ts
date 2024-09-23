import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Patient } from './patient.entity';
  import { Appointments } from './appointments.entity';
  
  @Entity()
  export class PatientAppointment {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Patient, (patient) => patient.patientId)
    @JoinColumn({ name: 'patientId' })
    patient: Patient;
  
    @ManyToOne(() => Appointments, (appointment) => appointment.appId)
    @JoinColumn({ name: 'appId' })
    appointment: Appointments;
  }
  