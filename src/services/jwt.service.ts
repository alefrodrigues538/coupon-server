// src/utils/jwt.ts
import jwt from 'jsonwebtoken';
import { env } from '../config/environment';

export interface TokenPayload {
  id: string;
  email: string;
  // Adicione outros dados que você queira no payload do token
}

export class JwtService {
  private secret: string;
  private expiresIn: string;

  constructor() {
    this.secret = env.JWT_SECRET;
    this.expiresIn = env.JWT_EXPIRES_IN;
  }

  /**
   * Gera um novo JWT.
   * @param payload Os dados a serem incluídos no token.
   * @returns O token JWT assinado.
   */
  public sign(payload: TokenPayload): string {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN as any })
  }

  /**
   * Verifica a validade de um JWT e retorna seu payload.
   * @param token O token JWT a ser verificado.
   * @returns O payload do token se for válido, ou lança um erro.
   */
  public verify(token: string): TokenPayload {
    try {
      const decoded = jwt.verify(token, this.secret) as TokenPayload;
      return decoded;
    } catch (error) {
      // Lidar com diferentes tipos de erro (TokenExpiredError, JsonWebTokenError)
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Token expirado.');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Token inválido.');
      }
      throw error; // Propagar outros erros
    }
  }
}

export const jwtService = new JwtService();