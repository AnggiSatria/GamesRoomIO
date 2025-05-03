import { handleOptions, withCORS } from "@/shared/lib/helpers/server/cors";
import { prisma } from "@/shared/lib/helpers/server/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function OPTIONS(request: NextRequest) {
  return handleOptions(request);
}

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

    if (!review) {
      const res = NextResponse.json({ message: "Not Found" }, { status: 404 });
      return withCORS(res, req.headers.get("origin") ?? "*");
    }

    const res = NextResponse.json(review);
    return withCORS(res, req.headers.get("origin") ?? "*");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Menangani error Prisma berdasarkan error.code, bukan Prisma.PrismaClientKnownRequestError
    if (error?.code) {
      const res = NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
      return withCORS(res, req.headers.get("origin") ?? "*");
    }
    if (error instanceof Error) {
      const res = NextResponse.json(
        { message: error.message },
        { status: 500 }
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

// PUT /reviews/:id
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();
  const { rating, comment } = body;

  if (!rating || !comment) {
    const res = NextResponse.json(
      { message: "Rating and comment are required" },
      { status: 400 }
    );
    return withCORS(res, req.headers.get("origin") ?? "*");
  }

  try {
    const updatedReview = await prisma.review.update({
      where: { id },
      data: { rating, comment },
    });

    const res = NextResponse.json(updatedReview);
    return withCORS(res, req.headers.get("origin") ?? "*");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Menangani error Prisma berdasarkan error.code
    if (error?.code === "P2025") {
      const res = NextResponse.json(
        { message: "Review not found" },
        { status: 404 }
      );
      return withCORS(res, req.headers.get("origin") ?? "*");
    }
    if (error instanceof Error) {
      const res = NextResponse.json(
        { message: error.message },
        { status: 500 }
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

    const res = NextResponse.json({
      message: `Review with ID ${deletedReview.id} has been successfully deleted.`,
    });
    return withCORS(res, req.headers.get("origin") ?? "*");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Menangani error Prisma berdasarkan error.code
    if (error?.code === "P2025") {
      const res = NextResponse.json(
        { message: "Review not found" },
        { status: 404 }
      );
      return withCORS(res, req.headers.get("origin") ?? "*");
    }
    if (error instanceof Error) {
      const res = NextResponse.json(
        { message: error.message },
        { status: 500 }
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
