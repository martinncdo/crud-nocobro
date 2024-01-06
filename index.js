import dotenv from "dotenv";
import express from "express";
import router from "./router/router.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(cookieParser());
app.use(cors({
    origin: ["http://127.0.0.1:5500", "http://192.168.0.177:5500", "http://localhost:5500"],
    credentials: true
}));
app.use(express.json());
app.use(router);

app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${process.env.PORT}`);
});

console.log(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD);