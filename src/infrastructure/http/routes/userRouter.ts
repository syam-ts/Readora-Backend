import express from "express";
import { UserController } from "../controllers/userCtrl";
import { AuthController } from "../controllers/authCtrl";
import { verifyToken } from "../../../utils/middleware/verifyToken";
const userRouter = express.Router();

const userCtrl = new UserController();
const authCtrl = new AuthController();

userRouter.get('/article/:articleId',verifyToken, userCtrl.monoArticleView);
userRouter.get('/profile/:userId', verifyToken,userCtrl.viewUserProfile);
userRouter.get('/articles/:userId',verifyToken, userCtrl.viewAllArticle);
userRouter.get('/user/articles/:userId',verifyToken, userCtrl.viewMyArticles)

userRouter.post("/signup", userCtrl.signupUser);
userRouter.post('/login', userCtrl.loginUser);
userRouter.post('/article/:userId',verifyToken, userCtrl.crateArticle); 
userRouter.post('/refreshToken', authCtrl.refreshToken); 

userRouter.put('/preferences/:userId', userCtrl.addPreferences);
userRouter.put('/user/profile',verifyToken, userCtrl.editProfile);
userRouter.put('/article',verifyToken, userCtrl.editArticle);
userRouter.put('/like/:articleId',verifyToken, userCtrl.likeArticle);
userRouter.put('/dislike/:articleId',verifyToken, userCtrl.dislikeArticle);

userRouter.delete('/article',verifyToken, userCtrl.deleteArticle) 

export default userRouter;
