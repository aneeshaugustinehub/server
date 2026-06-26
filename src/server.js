import express from 'express';
import { connectDB } from './DB/db.js';
import dotenv from 'dotenv';
dotenv.config();

import userRouter from './Router/userRouter.js';
import postRouter from './Router/userRouter.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/users', userRouter);
app.use('/posts', postRouter);

connectDB();

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
})