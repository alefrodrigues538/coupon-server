// src/config/database.ts
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { User } from "../models/user.model";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mongodb",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: [User,],
});