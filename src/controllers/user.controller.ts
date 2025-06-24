
import { Request, Response } from 'express';
import { IUser, User } from '../models/User';

export class UserController {
  constructor() {
    // Amarra o 'this' de cada método ao contexto da instância do UserController
    this.getAllUsers = this.getAllUsers.bind(this);
    // this.getUserById = this.getUserById.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      await User.find().then((data) => {
        res.status(200).json(data)
      }).catch((err) => {
        res.status(err.status).json(err)
      })
    } catch (error) {
      console.error("Error getting users:", error);
      res.status(500).json({ message: "Error retrieving users" });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const user: IUser | null = await User.findById(id).select('-password');
      if (!user) {
        res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("Error getting user by ID:", error);
      res.status(500).json({ message: "Error retrieving user" });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;
    try {
      const newUser: IUser = new User({ name, email, password });
      await newUser.save().then(() => {
        const { password: _, ...userWithoutPassword } = newUser.toObject();
        res.status(201).json(userWithoutPassword);
      })
    } catch (error: any) {
      console.error("Error creating user:", error);
      if (error.code === 11000) {
        res.status(409).json({ message: "Email already registered." });
      }
      res.status(500).json({ message: "Error creating user", error: error.message });
    }
  }
}

export const controller = new UserController();