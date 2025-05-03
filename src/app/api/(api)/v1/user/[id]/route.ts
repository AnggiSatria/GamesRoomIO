import { prisma } from "@/shared/lib/helpers/server";
import { handleOptions, withCORS } from "@/shared/lib/helpers/server/cors";
import { NextRequest, NextResponse } from "next/server";

export async function OPTIONS(request: NextRequest) {
  return handleOptions(request);
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
      },
    });

    if (!user) {
      const res = NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
      return withCORS(res, _request.headers.get("origin") ?? "*");
    }

    const res = NextResponse.json(user);
    return withCORS(res, _request.headers.get("origin") ?? "*");
  } catch (error) {
    console.error("Error fetching user:", error);
    const res = NextResponse.json(
      { message: "Failed to fetch user" },
      { status: 500 }
    );
    return withCORS(res, _request.headers.get("origin") ?? "*");
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const existingUser = await prisma.user.findUnique({ where: { id } });

    if (!existingUser) {
      const res = NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
      return withCORS(res, _request.headers.get("origin") ?? "*");
    }

    // Hapus user dan cascade ke profile jika ada
    await prisma.user.delete({
      where: { id },
    });

    const res = NextResponse.json({ message: "User deleted successfully" });
    return withCORS(res, _request.headers.get("origin") ?? "*");
  } catch (error) {
    console.error("Error deleting user:", error);
    const res = NextResponse.json(
      { message: "Failed to delete user" },
      { status: 500 }
    );
    return withCORS(res, _request.headers.get("origin") ?? "*");
  }
}
