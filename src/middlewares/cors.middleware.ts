// src/middlewares/cors.ts
import { Request, Response, NextFunction } from 'express';
import cors from 'cors'; // npm install cors @types/cors

// Você pode configurar o CORS de forma mais específica aqui
const corsOptions = {
  origin: '*', // Ou uma lista de domínios permitidos
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

export const corsMiddleware = cors(corsOptions);