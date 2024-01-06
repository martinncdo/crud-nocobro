import dotenv from "dotenv";
import express from "express";
import router from "./router/router.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(cookieParser());
app.use(cors({
    origin: [process.env.ORIGIN1, process.env.ORIGIN2, process.env.ORIGIN3],
    credentials: true
}));
app.use(express.json());
app.use(router);

app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${process.env.PORT}`);
});
