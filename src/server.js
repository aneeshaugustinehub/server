import express from 'express';
import { connectDB } from './DB/db.js';
import dotenv from 'dotenv';
dotenv.config();

import userRouter from './Router/userRouter.js';
import postRouter from './Router/userRouter.js';


const app = express();
app.use('/users', userRouter);
app.use('/post', postRouter);

connectDB();

app.listen(3000, () => {
  console.log('server running on port 3000');
})