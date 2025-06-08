import { connectDB } from "./infrastructure/database/db";
import indexRouter from "./infrastructure/http/routes/index";
import cookieparser from "cookie-parser";
import bodyparser from 'body-parser';
import http from "node:http";
import path from "node:path";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({
  path: path.resolve(__dirname, "../env"),
});

const app = express();

app.use(bodyparser.json({ limit: '10mb' }));
app.use(bodyparser.urlencoded({ limit: '10mb', extended: true }));

app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
  })
);
app.use("/", indexRouter);

const server = http.createServer(app);

const PORT = process.env.PORT;

(async () => {
  await connectDB();
  server.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
})();
