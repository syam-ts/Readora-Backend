import express from "express";
import { UserController } from "../controllers/userCtrl";
const userRouter = express.Router();

const userCtrl = new UserController();

userRouter.post("/signup", userCtrl.signupUser);
userRouter.post('/login', userCtrl.loginUser);

export default userRouter;
