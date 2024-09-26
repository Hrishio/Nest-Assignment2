// src/entity/user.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users') // Adjust the table name according to your database
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string; // Ensure you're storing hashed passwords!

  // Add other relevant fields here
}
