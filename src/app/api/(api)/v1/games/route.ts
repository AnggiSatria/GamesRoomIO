import { NextRequest, NextResponse } from "next/server";
import prisma from "@/shared/lib/helpers/server/prisma";
import { handleOptions, withCORS } from "@/shared/lib/helpers/server/cors";

export async function OPTIONS(request: NextRequest) {
  return handleOptions(request);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search");
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = 10;

  const games = await prisma.game.findMany({
    where: {
      OR: [
        { title: { contains: search || "", mode: "insensitive" } },
        { description: { contains: search || "", mode: "insensitive" } },
      ],
    },
    skip: (page - 1) * limit,
    take: limit,
    include: {
      genre: true,
      platform: true,
    },
  });

  const total = await prisma.game.count({
    where: {
      OR: [
        { title: { contains: search || "", mode: "insensitive" } },
        { description: { contains: search || "", mode: "insensitive" } },
      ],
    },
  });

  const res = NextResponse.json({
    data: games,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalItems: total,
  });
  return withCORS(res, request.headers.get("origin") ?? "*");
}

export async function POST(request: Request) {
  const {
    title,
    description,
    gameUrl,
    coverImage,
    screenshots,
    genreId,
    platformId,
    createdById,
  } = await request.json();

  const game = await prisma.game.create({
    data: {
      title,
      description,
      gameUrl,
      coverImage,
      screenshots,
      genre: { connect: { id: genreId } },
      platform: { connect: { id: platformId } },
      createdBy: { connect: { id: createdById } },
    },
  });

  const res = NextResponse.json(game, { status: 201 });
  return withCORS(res, request.headers.get("origin") ?? "*");
}
