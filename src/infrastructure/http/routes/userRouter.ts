import express from "express";
import { UserController } from "../controllers/userCtrl";
const userRouter = express.Router();

const userCtrl = new UserController();

userRouter.post("/signup", userCtrl.signupUser);
userRouter.post('/login', userCtrl.loginUser);
userRouter.post('/createArticle', userCtrl.crateArticle);
userRouter.get('/viewAllArticles/:type', userCtrl.viewAllArticle);

export default userRouter;
