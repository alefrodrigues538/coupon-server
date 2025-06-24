// src/middlewares/errorHandler.ts
import { NextFunction, Request, Response } from 'express';

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(err);

  res.status(statusCode).json({
    success: false,
    message: message,
    // Em ambiente de produção, evite enviar detalhes de erro sensíveis
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};