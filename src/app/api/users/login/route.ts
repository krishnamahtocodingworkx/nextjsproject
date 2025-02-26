import { connect } from "../../../../dbConfig/dbConfig";
import User from "../../../../models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;
    if (!email || !password)
      return NextResponse.json({
        message: "All fields must be filled",
        status: 500,
      });

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      // check for password
      const validPassword = await bcrypt.compare(
        password,
        isUserExist.password
      );
      if (!validPassword) {
        return NextResponse.json({
          message: "Incorrect Password",
          success: false,
          status: 400,
        });
      }

      const tokenData = {
        id: isUserExist._id,
        email: isUserExist.email,
      };
      //   create token
      const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, {
        expiresIn: "1d",
      });

      const response = NextResponse.json({
        message: "Login successfull",
        success: true,
      });
      response.cookies.set("token", token, { httpOnly: true });

      return response;

      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    } else {
      return NextResponse.json({
        message: "User Not found",
        success: false,
        status: 400,
      });
    }

    // hash password
    // const salt = await bcrypt.genSalt(10);
    // const hashPassword = await bcrypt.hash(password, salt);
    // const newUser = new User({
    //   userName,
    //   email,
    //   password: hashPassword,
    // });
    // const savedUser = await newUser.save();

    // return NextResponse.json({
    //   message: "User created Successfull",
    //   success: true,
    //   savedUser,
    // });
  } catch (error) {
    console.log("Error :", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
