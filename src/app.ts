import express from "express";
import http from "node:http";
import dotenv from "dotenv";
import { connectDB } from "./infrastructure/database/db";

dotenv.config({});

const app = express();

const server = http.createServer(app);

const PORT = process.env.PORT;

(async () => {
    await connectDB();
    server.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
})();
