// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { User } from '../models/user.model';

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.userRepository.find();
      return res.status(200).json(users);
    } catch (error) {
      console.error("Error getting users:", error);
      return res.status(500).json({ message: "Error retrieving users" });
    }
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const user = await this.userRepository.findOneBy({ id: id as any });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      console.error("Error getting user by ID:", error);
      return res.status(500).json({ message: "Error retrieving user" });
    }
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    try {
      const newUser = this.userRepository.create({ name, email, password });
      await this.userRepository.save(newUser);
      return res.status(201).json(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ message: "Error creating user" });
    }
  }

  // Implemente update, delete, etc.
}