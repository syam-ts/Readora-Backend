import express from "express";
import http from "node:http";
import path from "node:path";
import dotenv from "dotenv";
dotenv.config({
  path: path.resolve(__dirname, "../env"),
});
import cors from "cors";
import { connectDB } from "./infrastructure/database/db";
import userRouter from "./infrastructure/http/routes/userRouter";
import cookieparser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || 'https://readora-puce.vercel.app',
    credentials: true,
  })
);
app.use("/", userRouter);

const server = http.createServer(app);

const PORT = process.env.PORT;

(async () => {
  await connectDB();
  server.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
})();
