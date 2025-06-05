import express from "express";
import http from "node:http";
import path from "node:path";
import dotenv from "dotenv";
dotenv.config({
  path: path.resolve(__dirname, "../env"),
});
import cors from "cors";
import { connectDB } from "./infrastructure/database/db";
<<<<<<< HEAD
import indexRouter from './infrastructure/http/routes/index';
import cookieparser from 'cookie-parser';
 
=======
import userRouter from "./infrastructure/http/routes/userRouter";
import cookieparser from "cookie-parser";
>>>>>>> a79778edd5f248f3be44b6beb6ff156c13fd7bb4

const app = express();

app.use(express.json());
app.use(cookieparser());
app.use(
<<<<<<< HEAD
    cors({
        origin: process.env.FRONTEND_ORIGIN,
        credentials: true
    })
)
app.use('/', indexRouter);
=======
  cors({
    origin: 'https://readora-puce.vercel.app',
    credentials: true,
  })
);
app.use("/", userRouter);

>>>>>>> a79778edd5f248f3be44b6beb6ff156c13fd7bb4
const server = http.createServer(app);

const PORT = process.env.PORT;


(async () => {
  await connectDB();
  server.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
})();
