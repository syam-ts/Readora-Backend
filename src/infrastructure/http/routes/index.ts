import { Router } from "express";
import userRouter from "./userRouter";
import articleRouter from "./articleRouter";

const indexRouter = Router();

indexRouter.use("/user", userRouter);
indexRouter.use("/article", articleRouter);

export default indexRouter;
