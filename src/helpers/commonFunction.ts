// import { NextRequest } from "next/server";
// import jwt from "jsonwebtoken";

// export const getIdFromToken = (request: NextRequest) => {
//   try {
//     const token = request.cookies.get("token")?.value || "";
//     const decodedToken:any = jwt.verify(token, process.env.JWT_SECRET!);
//     return decodedToken.id;
//   } catch (error:any) {
//     throw new Error(error.message);
//   }
// };

import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getIdFromToken = (request: NextRequest): string | null => {
  try {
    const token = request.cookies.get("token")?.value ?? "";
    if (!token) return null; // Handle missing token

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables.");
      return null;
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as {
      id: string;
    };
    return decodedToken.id;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null; // Return null instead of throwing an error
  }
};
