import { prisma } from "@/shared/lib/helpers/server/prisma";
import { NextResponse } from "next/server";

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Menangani error Prisma berdasarkan error.code, bukan Prisma.PrismaClientKnownRequestError
    if (error?.code) {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Menangani error Prisma berdasarkan error.code
    if (error?.code === "P2025") {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Menangani error Prisma berdasarkan error.code
    if (error?.code === "P2025") {
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
