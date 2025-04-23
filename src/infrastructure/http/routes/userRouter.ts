import express from "express";
import { UserController } from "../controllers/userCtrl";
const userRouter = express.Router();

const userCtrl = new UserController();

userRouter.get('/viewAllArticles/:type', userCtrl.viewAllArticle);//
userRouter.get('/monoArticleView/:articleId', userCtrl.monoArticleView);//
userRouter.get('/profile/:userId', userCtrl.viewUserProfile);

userRouter.post('/profile', userCtrl.editProfile);//
userRouter.post("/signup", userCtrl.signupUser);
userRouter.post('/login', userCtrl.loginUser);
userRouter.post('/article/:userId', userCtrl.crateArticle); //only for creating
userRouter.put('/article', userCtrl.editArticle);//edit find path and query params difference
userRouter.delete('/article', userCtrl.deleteArticle) //delete

export default userRouter;
