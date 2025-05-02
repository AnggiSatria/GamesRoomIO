// /app/api/v1/genres/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/shared/lib/helpers/server/prisma";

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
      return NextResponse.json({ message: "Genre not found" }, { status: 404 });
    }

    return NextResponse.json(genre);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
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
    return NextResponse.json({ message: "Name is required" }, { status: 400 });
  }

  try {
    const updatedGenre = await prisma.genre.update({
      where: { id },
      data: { name },
    });

    return NextResponse.json(updatedGenre);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Mengatasi error yang berasal dari Prisma
    if (error?.code === "P2025") {
      return NextResponse.json({ message: "Genre not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
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

    return NextResponse.json({
      message: `Genre "${deletedGenre.name}" has been successfully deleted.`,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Mengatasi error yang berasal dari Prisma
    if (error?.code === "P2025") {
      return NextResponse.json({ message: "Genre not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
