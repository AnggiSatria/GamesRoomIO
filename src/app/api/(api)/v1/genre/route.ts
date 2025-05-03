// /app/api/genre/route.ts
import { NextResponse } from "next/server";
import prisma from "@/shared/lib/helpers/server/prisma";
import { withCORS } from "@/shared/lib/helpers/server/cors";

export async function POST(req: Request) {
  const { name } = await req.json();

  if (!name) {
    const res = NextResponse.json(
      { error: "Name is required" },
      { status: 400 }
    );
    return withCORS(res, req.headers.get("origin") ?? "*");
  }

  const genre = await prisma.genre.create({
    data: { name },
  });

  const res = NextResponse.json(genre);
  return withCORS(res, req.headers.get("origin") ?? "*");
}
