import { connect } from "../../../../dbConfig/dbConfig";
import User from "../../../../models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { userName, email, password } = reqBody;
    if (!userName || !email || !password)
      return NextResponse.json({
        message: "All fields must be filled",
        status: 500,
      });

    const isUserAlreadyExist = await User.findOne({ email });
    if (isUserAlreadyExist) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });
    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User created Successfull",
      success: true,
      savedUser,
    });
  } catch (error) {
    console.log("Error :", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
