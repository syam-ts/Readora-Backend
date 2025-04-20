import express from "express";
import http from "node:http";
import dotenv from "dotenv";
import cors from 'cors';
import { connectDB } from "./infrastructure/database/db";
import userRouter from './infrastructure/http/routes/userRouter'
import cookieparser from 'cookie-parser';

dotenv.config({});

const app = express();

app.use(express.json());
app.use(cookieparser())
app.use(
    cors({
        origin: process.env.FRONTEND_ORIGIN,
        credentials: true
    })
)
app.use('/user', userRouter);

const server = http.createServer(app);

const PORT = process.env.PORT;

(async () => {
    await connectDB();
    server.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
})();
