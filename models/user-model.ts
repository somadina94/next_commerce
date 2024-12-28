import mongoose, { Document, Model, Schema } from "mongoose";

console.log("rans");

interface User extends Document {
  name: string;
  email: string;
  password?: string;
  id: string;
  role: string;
  createdAt: Date;
}

const UserSchema: Schema<User> = new mongoose.Schema<User>({
  name: {
    type: String,
    required: [true, "Please provide your fullname"],
  },
  email: {
    type: String,
    required: [true, "Please provide a valid email."],
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User: Model<User> =
  mongoose.models.User || mongoose.model<User>("User", UserSchema);

export default User;
