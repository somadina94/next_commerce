import mongoose from "mongoose";

const MONGODB_URI = process.env.DATABASE;

if (!MONGODB_URI) {
  throw new Error("Please define mongodb uri env variable");
}

export default async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  const opts = { bufferCommands: false };

  await mongoose.connect(MONGODB_URI!, opts);
  return mongoose;
}
