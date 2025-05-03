import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/shared/lib/helpers/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { handleOptions, withCORS } from "@/shared/lib/helpers/server/cors";

export async function OPTIONS(request: NextRequest) {
  return handleOptions(request);
}

// POST /reviews
export async function POST(req: Request) {
  const body = await req.json();
  const { rating, comment, gameId } = body;

  if (!rating || !comment || !gameId) {
    const res = NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
    return withCORS(res, req.headers.get("origin") ?? "*");
  }

  const cookieStore = await cookies();
  const token =
    cookieStore.get("token")?.value ||
    req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) {
    const res = NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    return withCORS(res, req.headers.get("origin") ?? "*");
  }

  let userId: string | undefined;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    userId = decoded.userId;
  } catch (err) {
    console.error("JWT error:", err);
    const res = NextResponse.json(
      { message: "Invalid token" },
      { status: 401 }
    );
    return withCORS(res, req.headers.get("origin") ?? "*");
  }

  if (!userId) {
    const res = NextResponse.json(
      { message: "User ID not found in token" },
      { status: 400 }
    );
    return withCORS(res, req.headers.get("origin") ?? "*");
  }

  try {
    const newReview = await prisma.review.create({
      data: {
        rating,
        comment,
        gameId,
        createdById: userId, // Use the userId from the token
      },
    });

    const res = NextResponse.json(newReview, { status: 201 });
    return withCORS(res, req.headers.get("origin") ?? "*");
  } catch (error) {
    console.log(error);

    const res = NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
    return withCORS(res, req.headers.get("origin") ?? "*");
  }
}
