import express from "express";
import { UserController } from "../controllers/userCtrl";
const userRouter = express.Router();

const userCtrl = new UserController();

userRouter.get('/article/:articleId', userCtrl.monoArticleView);
userRouter.get('/profile/:userId', userCtrl.viewUserProfile);
userRouter.get('/articles/:userId', userCtrl.viewAllArticle);
userRouter.get('/user/articles/:userId', userCtrl.viewMyArticles)

userRouter.post("/signup", userCtrl.signupUser);
userRouter.post('/login', userCtrl.loginUser);
userRouter.post('/article/:userId', userCtrl.crateArticle); 

userRouter.put('/user/profile', userCtrl.editProfile);
userRouter.put('/article', userCtrl.editArticle);//edit find path and query params difference

userRouter.delete('/article', userCtrl.deleteArticle) 

export default userRouter;
