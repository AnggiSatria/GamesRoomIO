// pages/api/platforms/index.ts
import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/helpers/server";

export async function POST(req: Request) {
  const { name, type } = await req.json();

  if (!name || !type) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  const newPlatform = await prisma.platform.create({
    data: {
      name,
      type,
    },
  });

  return NextResponse.json(newPlatform, { status: 201 }); // Kembalikan data platform baru
}
