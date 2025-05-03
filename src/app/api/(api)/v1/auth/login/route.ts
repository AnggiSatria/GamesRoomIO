import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/shared/lib/helpers/server";
import jwt from "jsonwebtoken";
import { handleOptions, withCORS } from "@/shared/lib/helpers/server/cors";

export async function OPTIONS(req: NextRequest) {
  return handleOptions(req); // handle preflight
}

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const user = await prisma.user.findUnique({
    where: { email },
    include: { profile: true }, // sertakan profile
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    const res = NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );

    return withCORS(res, request.headers.get("origin") ?? "*");
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  const { password: _, ...userWithoutPassword } = user;

  console.log(_);

  const res = NextResponse.json({
    message: "Login successful",
    token,
    user: userWithoutPassword,
  });

  return withCORS(res, request.headers.get("origin") ?? "*");
}
