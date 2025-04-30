import { prisma } from "@/shared/lib/helpers/server";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

// GET /reviews/:id
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const review = await prisma.review.findUnique({
      where: { id },
      include: { game: true, createdBy: true },
    });

    if (!review)
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    return NextResponse.json(review);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle known Prisma errors
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /reviews/:id
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();
  const { rating, comment } = body;

  if (!rating || !comment) {
    return NextResponse.json(
      { message: "Rating and comment are required" },
      { status: 400 }
    );
  }

  try {
    const updatedReview = await prisma.review.update({
      where: { id },
      data: { rating, comment },
    });

    return NextResponse.json(updatedReview);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { message: "Review not found" },
        { status: 404 }
      );
    }
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /reviews/:id
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const deletedReview = await prisma.review.delete({
      where: { id },
      select: { id: true },
    });

    return NextResponse.json({
      message: `Review with ID ${deletedReview.id} has been successfully deleted.`,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { message: "Review not found" },
        { status: 404 }
      );
    }
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
