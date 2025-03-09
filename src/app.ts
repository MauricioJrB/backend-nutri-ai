import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

import { connectDB } from './config/database';
import { errorHandle } from './Middlewares/errorHandle';

import userRouter from './Routers/userRouter';
import userDataRoutes from './Routers/userDataRouter';
import macronutrientesRoutes from './Routers/macronutrientsRouter';
import mealRoutes from './Routers/mealRouter';

dotenv.config();

const app = express();
app.use(express.json());
connectDB();

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World' });
});

app.use('/auth', userRouter);
app.use('/userdata', userDataRoutes);
app.use('/macronutrients', macronutrientesRoutes);
app.use('/meal', mealRoutes);
app.use(errorHandle);

export default app;
