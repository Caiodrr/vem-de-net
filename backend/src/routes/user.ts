import { Router } from "express";
import { userController } from "../controllers/user";

const userRouter = Router();

userRouter.post("/", userController.insertUser);
userRouter.get("/:id", userController.getUser);
userRouter.get("/cpf/:cpf", userController.getUserCpf);

export { userRouter };
