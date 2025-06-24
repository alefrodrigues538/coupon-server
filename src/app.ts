// src/app.ts
import dotenv from "dotenv";
import express from "express";
import { AppDataSource } from "./config/database";
import { corsMiddleware } from "./middlewares";
import * as routes from "./routes";

dotenv.config();

export class App {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.initializeDatabase();
    this.setupMiddlewares();
    this.setupRoutes();
  }

  private setupMiddlewares(): void {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(corsMiddleware);
  }

  private async initializeDatabase(): Promise<void> {
    try {
      await AppDataSource.initialize();
      console.log('Database connected successfully!');
    } catch (err) {
      console.error("Error during Data Source initialization", err);
      process.exit(1);
    }
  }

  private setupRoutes(): void {
    Object.values(routes).forEach(router => {
      this.server.use(router);
    });
  }

  public listen(port: number | string): void {
    this.server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
}