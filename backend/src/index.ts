import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectMongoDB } from './config/mongoClient';
import { connectprismaPgDB } from './config/prismaClient';
import userRouter from './routes/userRouter';
import { setupSwagger } from './swagger';
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(cookieParser());

app.set('trust proxy', 1);
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
connectMongoDB();
connectprismaPgDB();

setupSwagger(app);

app.use('/api', userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`)
});
