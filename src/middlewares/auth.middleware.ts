// src/middlewares/auth.middleware.ts
import { NextFunction, Request, Response } from 'express';
import { jwtService, TokenPayload } from '../services/JWT.service';

// Estendendo a interface Request do Express para adicionar o 'user'
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Nenhum token fornecido ou token mal formatado.' });
    return
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwtService.verify(token);
    req.user = decoded; // Adiciona o payload do token ao objeto req.user
    next();
  } catch (error: any) {
    if (error.message === 'Token expirado.') {
      res.status(401).json({ message: 'Token de autenticação expirado.' });
    }
    res.status(401).json({ message: 'Token de autenticação inválido.', error: error.message });
  }
};