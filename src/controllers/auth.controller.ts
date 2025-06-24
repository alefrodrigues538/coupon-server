// src/controllers/auth.controller.ts
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { IUser, User } from '../models/User';
import { jwtService } from '../services/JWT.service';

export class AuthController {
  constructor() {
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  async register(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;
    try {
      // 1. Verificar se o usuário já existe
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(409).json({ message: 'Email já registrado.' });
      }

      // 2. Hash da senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // 3. Criar e salvar o novo usuário
      const newUser: IUser = new User({
        name,
        email,
        password: hashedPassword,
      });
      await newUser.save();

      // 4. Gerar JWT
      const token = jwtService.sign({ id: newUser._id.toString(), email: newUser.email });

      // 5. Retornar resposta (sem a senha)
      const { password: _, ...userWithoutPassword } = newUser.toObject();
      res.status(201).json({ user: userWithoutPassword, token });
    } catch (error: any) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Erro ao registrar usuário.', error: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
      // 1. Encontrar o usuário pelo email (incluindo a senha que está com select: false)
      const user = await User.findOne({ email }).select('+password'); // Seleciona a senha temporariamente
      if (!user) {
        res.status(400).json({ message: 'Credenciais inválidas.' });
        return
      }

      // 2. Comparar a senha fornecida com a senha hash
      const isMatch = await bcrypt.compare(password, user.password as string);
      if (!isMatch) {
        res.status(400).json({ message: 'Credenciais inválidas.' });
      }

      // 3. Gerar JWT
      const token = jwtService.sign({ id: user._id.toString(), email: user.email });

      // 4. Retornar resposta
      const { password: _, ...userWithoutPassword } = user.toObject(); // Remove a senha antes de retornar
      res.status(200).json({ user: userWithoutPassword, token });
    } catch (error: any) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Erro ao fazer login.', error: error.message });
    }
  }
}

export const controller = new AuthController();