// /app/api/genres/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/shared/lib/helpers/server/prisma";
import { handleOptions, withCORS } from "@/shared/lib/helpers/server/cors";

export async function OPTIONS(request: NextRequest) {
  return handleOptions(request);
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const search = url.searchParams.get("search") || "";
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);

  const genres = await prisma.genre.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
    skip: (page - 1) * limit,
    take: limit,
  });

  const res = NextResponse.json(genres);
  return withCORS(res, req.headers.get("origin") ?? "*");
}
