import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/shared/lib/helpers/server";
import jwt from "jsonwebtoken";
import { handleOptions, withCORS } from "@/shared/lib/helpers/server/cors";

export async function OPTIONS(request: NextRequest) {
  return handleOptions(request);
}

export async function POST(request: Request) {
  const { username, email, password } = await request.json();

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    const res = NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );

    return withCORS(res, request.headers.get("origin") ?? "*");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      profile: { create: {} },
    },
    include: {
      profile: true,
    },
  });

  const { password: _, ...userWithoutPassword } = user;

  console.log(_);

  // Generate JWT token
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET as string, // simpan ini di .env
    {
      expiresIn: "7d",
    }
  );

  const res = NextResponse.json(
    {
      message: "User registered successfully",
      data: userWithoutPassword,
      token, // dikirim ke client
    },
    { status: 201 }
  );

  return withCORS(res, request.headers.get("origin") ?? "*");
}
