import express from "express";
import http from 'node:http'; 
import dotenv from 'dotenv'; 

dotenv.config({})


const app = express();

 
const server = http.createServer(app);

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
})