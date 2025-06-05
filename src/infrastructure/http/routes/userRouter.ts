import { Router } from "express";
import { UserController } from "../controllers/userCtrl";
import { AuthController } from "../controllers/authCtrl";
import { verifyToken } from "../../../utils/middleware/verifyToken";

const userRouter = Router();
const userController = new UserController();
const authController = new AuthController();

const {
    viewUserProfile,
    signupUser,
    loginUser,
    verifyOtp,
    addPreferences,
    editProfile,
} = userController;
const { refreshToken } = authController;

userRouter.get("/profile/:userId", verifyToken, viewUserProfile);

userRouter.post("/signup", signupUser);
userRouter.post("/login", loginUser);
userRouter.post("/verifyOtp", verifyOtp);
userRouter.post("/refreshToken", refreshToken);
userRouter.put("/preferences/:userId", addPreferences);
userRouter.put("/user/profile", verifyToken, editProfile);

export default userRouter;
