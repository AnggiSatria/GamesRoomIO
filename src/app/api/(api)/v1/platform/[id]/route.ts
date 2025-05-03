// pages/api/platforms/[id].ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/shared/lib/helpers/server";
import { handleOptions, withCORS } from "@/shared/lib/helpers/server/cors";

export async function OPTIONS(request: NextRequest) {
  return handleOptions(request);
}

export async function PUT(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();
  const { name, type } = await req.json();

  if (!id) {
    const res = NextResponse.json(
      { message: "Platform ID is required" },
      { status: 400 }
    );
    return withCORS(res, req.headers.get("origin") ?? "*");
  }

  if (!name || !type) {
    const res = NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
    return withCORS(res, req.headers.get("origin") ?? "*");
  }

  const updatedPlatform = await prisma.platform.update({
    where: { id },
    data: {
      name,
      type,
    },
  });

  const res = NextResponse.json(updatedPlatform, { status: 200 }); // Kembalikan platform yang sudah diperbarui
  return withCORS(res, req.headers.get("origin") ?? "*");
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    const res = NextResponse.json(
      { message: "Platform ID is required" },
      { status: 400 }
    );
    return withCORS(res, req.headers.get("origin") ?? "*");
  }

  const platform = await prisma.platform.findUnique({
    where: { id },
  });

  if (!platform) {
    const res = NextResponse.json(
      { message: "Platform not found" },
      { status: 404 }
    );
    return withCORS(res, req.headers.get("origin") ?? "*");
  }

  const res = NextResponse.json(platform, { status: 200 }); // Kembalikan platform yang ditemukan
  return withCORS(res, req.headers.get("origin") ?? "*");
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    const res = NextResponse.json(
      { message: "Platform ID is required" },
      { status: 400 }
    );
    return withCORS(res, req.headers.get("origin") ?? "*");
  }

  const deletedPlatform = await prisma.platform.delete({
    where: { id },
    select: { name: true }, // hanya ambil name
  });

  const res = NextResponse.json(
    {
      message: `Platform with name "${deletedPlatform.name}" has been successfully deleted.`,
    },
    { status: 200 }
  );
  return withCORS(res, req.headers.get("origin") ?? "*");
}
