import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import User from "@/models/user-model";
import connectToDatabase from "@/lib/mongodb";
import validator from "validator";

export async function POST(request: Request) {
  const { name, email, password, passwordConfirm } = await request.json();

  const isValidEmail = (email: string) => {
    return validator.isEmail(email);
  };

  if (!name || !email || !password || !passwordConfirm) {
    return NextResponse.json(
      {
        message: "Some required fields are missing",
        status: "fail",
      },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { message: "Invalid email format", status: "fail" },
      { status: 400 }
    );
  }

  if (password !== passwordConfirm) {
    return NextResponse.json(
      {
        message: "Passwords do not match",
        status: "fail",
      },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "A user with that email already exists",
          status: "fail",
        },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: "Account created successfully",
        status: "success",
        user: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
