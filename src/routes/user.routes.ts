import { Router } from "express";
import { controller } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares";

const userRouter: Router = Router()

//Routes
userRouter.get("/api/users", authMiddleware, controller.getAllUsers)
userRouter.get("/api/user/:id", authMiddleware, controller.getUserById)
userRouter.post("/api/register", controller.createUser)

export { userRouter };

