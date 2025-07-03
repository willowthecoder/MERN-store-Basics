import mongoose from "mongoose";

import dotenv from "dotenv";

// Ensure env is loaded
dotenv.config({ path: "./.env" });
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log("MONGO_URL:", process.env.MONGO_URL);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit the process with failure 1, 0 means success
  }
};
