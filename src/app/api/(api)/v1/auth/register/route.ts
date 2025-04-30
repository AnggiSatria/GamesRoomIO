import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/shared/lib/helpers/server";

export async function POST(request: Request) {
  const { username, email, password } = await request.json();

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
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
      profile: true, // agar data profile ikut dimuat
    },
  });

  // Jangan kirim password ke client
  const { password: _, ...userWithoutPassword } = user;

  console.log(_);

  return NextResponse.json(
    {
      message: "User registered successfully",
      data: userWithoutPassword,
    },
    { status: 201 }
  );
}
