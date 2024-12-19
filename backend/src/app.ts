import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

import { connectDB } from './config/database';
import { errorHandle } from './Middlewares/errorHandle';

dotenv.config();

const app = express();
app.use(express.json());
connectDB();

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World' });
});

app.use(errorHandle);

export default app;
