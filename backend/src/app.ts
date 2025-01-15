import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

import { connectDB } from './config/database';
import { errorHandle } from './Middlewares/errorHandle';

import userRoutes from './Routers/userRouter';
import macronutrientesRoutes from './Routers/macronutrientsRouter';

dotenv.config();

const app = express();
app.use(express.json());
connectDB();

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World' });
});

app.use('/user', userRoutes);
app.use('/nutrition', macronutrientesRoutes);
app.use(errorHandle);

export default app;
