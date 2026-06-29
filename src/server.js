import dotenv from 'dotenv';
import express from 'express';

import {connectDB} from './config/db.js';

dotenv.config();

import userRouter from './Router/userRouter.js';
import TweetsRouter from './Router/TweetsRouter.js';

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

// add rate limiter per user 429 error ("Too Many Requests")

app.use('/users', userRouter);
app.use('/Tweets', TweetsRouter);

connectDB().then( () => {
  app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
  })
});