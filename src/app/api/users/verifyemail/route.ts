import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqestBody = await request.json();
    const { token } = reqestBody;
    console.log("token :", token);

    const user = await User.findOne({
      verifyToken: token,
      VerifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User Not Found or Token expires",
        },
        { status: 400 }
      );
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.VerifyTokenExpiry = undefined;
    
    await user.save();

    return NextResponse.json({
        message:'Email verified successful',
        status:200,
        success:true,
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
