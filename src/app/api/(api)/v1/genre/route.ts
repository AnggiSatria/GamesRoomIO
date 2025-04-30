// /app/api/genre/route.ts
import { NextResponse } from "next/server";
import prisma from "@/shared/lib/helpers/server/prisma";

export async function POST(req: Request) {
  const { name } = await req.json();

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const genre = await prisma.genre.create({
    data: { name },
  });

  return NextResponse.json(genre);
}
