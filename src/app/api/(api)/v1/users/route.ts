import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/helpers/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        profile: true,
      },
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
