import { Router } from "express";
import { controller } from "../controllers/user.controller";

const userRouter: Router = Router()

//Routes
userRouter.get("/api/users", controller.getAllUsers)
userRouter.get("/api/user/:id", controller.getUserById)
userRouter.post("/api/user", controller.createUser)

export { userRouter };

