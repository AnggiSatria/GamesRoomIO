import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/shared/lib/helpers/server";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const user = await prisma.user.findUnique({
    where: { email },
    include: { profile: true }, // sertakan profile
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  const { password: _, ...userWithoutPassword } = user;

  console.log(_);

  return NextResponse.json({
    message: "Login successful",
    token,
    user: userWithoutPassword,
  });
}
