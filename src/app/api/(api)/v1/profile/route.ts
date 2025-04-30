import { NextResponse } from "next/server";
import prisma from "@/shared/lib/helpers/server/prisma";
import { getToken } from "@/shared/lib/helpers/server/auth";

export async function PUT(request: Request) {
  const token = await getToken(request);
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { image } = await request.json();

  const profile = await prisma.profile.upsert({
    where: { idUser: token.userId },
    update: { image },
    create: { idUser: token.userId, image },
  });

  return NextResponse.json(profile);
}
