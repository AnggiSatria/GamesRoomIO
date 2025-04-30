// pages/api/platforms/[id].ts
import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/helpers/server";

export async function PUT(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();
  const { name, type } = await req.json();

  if (!id) {
    return NextResponse.json(
      { message: "Platform ID is required" },
      { status: 400 }
    );
  }

  if (!name || !type) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  const updatedPlatform = await prisma.platform.update({
    where: { id },
    data: {
      name,
      type,
    },
  });

  return NextResponse.json(updatedPlatform, { status: 200 }); // Kembalikan platform yang sudah diperbarui
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json(
      { message: "Platform ID is required" },
      { status: 400 }
    );
  }

  const platform = await prisma.platform.findUnique({
    where: { id },
  });

  if (!platform) {
    return NextResponse.json(
      { message: "Platform not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(platform, { status: 200 }); // Kembalikan platform yang ditemukan
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json(
      { message: "Platform ID is required" },
      { status: 400 }
    );
  }

  const deletedPlatform = await prisma.platform.delete({
    where: { id },
    select: { name: true }, // hanya ambil name
  });

  return NextResponse.json(
    {
      message: `Platform with name "${deletedPlatform.name}" has been successfully deleted.`,
    },
    { status: 200 }
  );
}
