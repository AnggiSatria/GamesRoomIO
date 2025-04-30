import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/helpers/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// POST /reviews
export async function POST(req: Request) {
  const body = await req.json();
  const { rating, comment, gameId } = body;

  if (!rating || !comment || !gameId) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  const cookieStore = await cookies();
  const token =
    cookieStore.get("token")?.value ||
    req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let userId: string | undefined;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    userId = decoded.userId;
  } catch (err) {
    console.error("JWT error:", err);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  if (!userId) {
    return NextResponse.json(
      { message: "User ID not found in token" },
      { status: 400 }
    );
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

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
