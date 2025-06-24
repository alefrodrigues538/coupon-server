import { Router } from "express";
import { controller } from "../controllers/auth.controller";

const router: Router = Router()

//Routes
router.post("/api/auth", controller.login)

export { router as authRouter };

