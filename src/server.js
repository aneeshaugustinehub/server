import cors from 'cors'
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {connectDB} from './config/db.js';
dotenv.config();
import userRouter from './Router/userRouter.js';
import TweetsRouter from './Router/TweetsRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors())

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', userRouter);
app.use('/tweets', TweetsRouter);
app.use('/profilesImage', express.static(path.join(process.cwd(), '/assets/profilesImage')));
app.use('/tweetsImage', express.static(path.join(process.cwd(), '/assets/tweetsImage')));

// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true // needed if you're sending cookies (e.g. JWT in httpOnly cookie) with requests
// }))

connectDB().then(() => {app.listen(PORT, () => {
                   console.log(`server running on port ${PORT}`);
                 })});