import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/shared/lib/helpers/server";
import jwt from "jsonwebtoken";
import { handleOptions, withCORS } from "@/shared/lib/helpers/server/cors";

export async function OPTIONS(request: NextRequest) {
  return handleOptions(request);
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      const res = NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
      return withCORS(res, request.headers.get("origin") ?? "*");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const profile = await prisma.profile.findUnique({
      where: { idUser: decoded.userId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    if (!profile) {
      const res = NextResponse.json(
        { message: "Profile not found" },
        { status: 404 }
      );
      return withCORS(res, request.headers.get("origin") ?? "*");
    }

    const res = NextResponse.json({ profile });
    return withCORS(res, request.headers.get("origin") ?? "*");
  } catch (error) {
    console.log(error);

    const res = NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
    return withCORS(res, request.headers.get("origin") ?? "*");
  }
}
