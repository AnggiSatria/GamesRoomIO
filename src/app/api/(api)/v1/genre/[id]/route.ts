// /app/api/v1/genres/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/shared/lib/helpers/server/prisma";
import { handleOptions, withCORS } from "@/shared/lib/helpers/server/cors";

export async function OPTIONS(request: NextRequest) {
  return handleOptions(request);
}

// GET /genres/:id
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const genre = await prisma.genre.findUnique({
      where: { id },
    });

    if (!genre) {
      const res = NextResponse.json(
        { message: "Genre not found" },
        { status: 404 }
      );
      return withCORS(res, req.headers.get("origin") ?? "*");
    }

    const res = NextResponse.json(genre);
    return withCORS(res, req.headers.get("origin") ?? "*");
  } catch (error) {
    console.error(error);
    const res = NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
    return withCORS(res, req.headers.get("origin") ?? "*");
  }
}

// PUT /genres/:id
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const body = await req.json();
  const { name } = body;

  if (!name) {
    const res = NextResponse.json(
      { message: "Name is required" },
      { status: 400 }
    );
    return withCORS(res, req.headers.get("origin") ?? "*");
  }

  try {
    const updatedGenre = await prisma.genre.update({
      where: { id },
      data: { name },
    });

    const res = NextResponse.json(updatedGenre);
    return withCORS(res, req.headers.get("origin") ?? "*");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Mengatasi error yang berasal dari Prisma
    if (error?.code === "P2025") {
      const res = NextResponse.json(
        { message: "Genre not found" },
        { status: 404 }
      );
      return withCORS(res, req.headers.get("origin") ?? "*");
    }

    const res = NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
    return withCORS(res, req.headers.get("origin") ?? "*");
  }
}

// DELETE /genres/:id
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const deletedGenre = await prisma.genre.delete({
      where: { id },
      select: { name: true },
    });

    const res = NextResponse.json({
      message: `Genre "${deletedGenre.name}" has been successfully deleted.`,
    });
    return withCORS(res, req.headers.get("origin") ?? "*");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Mengatasi error yang berasal dari Prisma
    if (error?.code === "P2025") {
      const res = NextResponse.json(
        { message: "Genre not found" },
        { status: 404 }
      );
      return withCORS(res, req.headers.get("origin") ?? "*");
    }

    const res = NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
    return withCORS(res, req.headers.get("origin") ?? "*");
  }
}
