import { NextRequest, NextResponse } from "next/server";
import prisma from "@/shared/lib/helpers/server/prisma";
import { handleOptions, withCORS } from "@/shared/lib/helpers/server/cors";

export async function OPTIONS(request: NextRequest) {
  return handleOptions(request);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const platforms = await prisma.platform.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
    skip: (page - 1) * limit,
    take: limit,
  });

  const res = NextResponse.json(platforms);
  return withCORS(res, req.headers.get("origin") ?? "*");
}
