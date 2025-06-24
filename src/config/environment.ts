// src/config/environment.ts
import dotenv from 'dotenv';
dotenv.config();

interface Env {
  PORT: number;
  NODE_ENV: string;
  DATABASE_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
}

const getEnv = (): Env => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error('JWT_SECRET is not defined in environment variables!');
    process.exit(1); // Encerra a aplicação se a chave secreta não estiver presente
  }

  return {
    PORT: parseInt(process.env.PORT || '3001', 10),
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase',
    JWT_SECRET: jwtSecret,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
  };
};

export const env = getEnv();