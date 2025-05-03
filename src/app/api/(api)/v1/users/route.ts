import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/shared/lib/helpers/server";
import { handleOptions, withCORS } from "@/shared/lib/helpers/server/cors";

export async function OPTIONS(request: NextRequest) {
  return handleOptions(request);
}

export async function GET(req: Request) {
  try {
    const users = await prisma.user.findMany({
      include: {
        profile: true,
      },
    });

    const res = NextResponse.json({ users });
    return withCORS(res, req.headers.get("origin") ?? "*");
  } catch (error) {
    console.error("Error fetching users:", error);
    const res = NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 }
    );
    return withCORS(res, req.headers.get("origin") ?? "*");
  }
}
