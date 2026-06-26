import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Mongoose connected successfully!');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1); 
  }
}