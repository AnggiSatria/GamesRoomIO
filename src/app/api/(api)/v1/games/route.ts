import { NextResponse } from "next/server";
import prisma from "@/shared/lib/helpers/server/prisma";

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

  return NextResponse.json({
    data: games,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalItems: total,
  });
  // return NextResponse.json(games);
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

  return NextResponse.json(game, { status: 201 });
}
