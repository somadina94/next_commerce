import mongoose, { Document, Model, Schema } from "mongoose";

interface User extends Document {
  name: string;
  email: string;
  password?: string;
  id: string;
}

const UserSchema: Schema<User> = new mongoose.Schema({
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
});

const User: Model<User> =
  mongoose.models.User || mongoose.model<User>("User", UserSchema);

export default User;
