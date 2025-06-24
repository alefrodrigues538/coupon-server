// src/config/database.ts
import mongoose from "mongoose";
import { env } from "./environment";

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(env.DATABASE_URL);
    console.log('MongoDB connected successfully with Mongoose!');
  } catch (error) {
    console.error("Error connecting to MongoDB with Mongoose:", error);
    process.exit(1);
  }
};