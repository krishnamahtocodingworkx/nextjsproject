import { getIdFromToken } from "@/helpers/commonFunction";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import { connect } from "../../../../dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = getIdFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    if (!user) {
      return NextResponse.json({
        message: "User Not found",
        success: false,
        status: 404,
      });
    }
    return NextResponse.json({
      user,
      message: "User Details fetched successfull",
      status: 200,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
