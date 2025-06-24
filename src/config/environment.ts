// src/config/environment.ts
import dotenv from 'dotenv';
dotenv.config();

interface Env {
  PORT: number;
  NODE_ENV: string;
  DATABASE_URL: string;
  // Adicione outras variáveis de ambiente aqui
}

const getEnv = (): Env => {
  return {
    PORT: parseInt(process.env.PORT || '3000', 10),
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/mydatabase',
    // Defina valores padrão ou lance erros se variáveis essenciais não existirem
  };
};

export const env = getEnv();