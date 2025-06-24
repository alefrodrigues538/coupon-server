// src/models/User.ts
import { IsEmail, IsString, MinLength } from 'class-validator'; // npm install class-validator
import { Column, Entity, PrimaryColumn } from "typeorm"; // Ajuste para o seu banco de dados

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  name: string;

  @Column()
  @MinLength(6)
  password: string;

}