import mongoose from "mongoose";

const MONGODB_URI = process.env.DATABASE;

if (!MONGODB_URI) {
  throw new Error("Please define mongodb uri env variable");
}

export default async function connectToDatabase() {
  // Log connection state
  if (mongoose.connection.readyState === 1) {
    console.log("Already connected to MongoDB.");
    return mongoose; // Already connected
  }

  const opts = { bufferCommands: false };

  try {
    // Establish a new connection to MongoDB
    await mongoose.connect(MONGODB_URI as string, opts);
    console.log("Connected to MongoDB.");
    return mongoose;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
