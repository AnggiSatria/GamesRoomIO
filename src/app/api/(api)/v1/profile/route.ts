import { NextRequest, NextResponse } from "next/server";
import prisma from "@/shared/lib/helpers/server/prisma";
import { getToken } from "@/shared/lib/helpers/server/auth";
import { handleOptions, withCORS } from "@/shared/lib/helpers/server/cors";

export async function OPTIONS(request: NextRequest) {
  return handleOptions(request);
}

export async function PUT(request: Request) {
  const token = await getToken(request);
  if (!token) {
    const res = NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    return withCORS(res, request.headers.get("origin") ?? "*");
  }

  const { image } = await request.json();

  const profile = await prisma.profile.upsert({
    where: { idUser: token.userId },
    update: { image },
    create: { idUser: token.userId, image },
  });

  const res = NextResponse.json(profile);
  return withCORS(res, request.headers.get("origin") ?? "*");
}
