// pages/api/platforms/index.ts
import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/helpers/server";
import { withCORS } from "@/shared/lib/helpers/server/cors";

export async function POST(req: Request) {
  const { name, type } = await req.json();

  if (!name || !type) {
    const res = NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
    return withCORS(res, req.headers.get("origin") ?? "*");
  }

  const newPlatform = await prisma.platform.create({
    data: {
      name,
      type,
    },
  });

  const res = NextResponse.json(newPlatform, { status: 201 }); // Kembalikan data platform baru
  return withCORS(res, req.headers.get("origin") ?? "*");
}
