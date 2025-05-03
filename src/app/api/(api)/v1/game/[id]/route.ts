import { NextRequest, NextResponse } from "next/server";
import prisma from "@/shared/lib/helpers/server/prisma";
import { v2 as cloudinary } from "cloudinary";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { handleOptions, withCORS } from "@/shared/lib/helpers/server/cors";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function OPTIONS(request: NextRequest) {
  return handleOptions(request);
}

// GET
export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const game = await prisma.game.findUnique({
    where: { id },
    include: {
      genre: true,
      platform: true,
    },
  });

  if (!game) {
    const res = NextResponse.json(
      { message: "Game not found" },
      { status: 404 }
    );
    return withCORS(res, _req.headers.get("origin") ?? "*");
  }

  const res = NextResponse.json(game);
  return withCORS(res, _req.headers.get("origin") ?? "*");
}

// PUT
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const formData = await req.formData();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const gameUrl = formData.get("gameUrl") as string;
  const genreId = formData.get("genreId") as string;
  const platformId = formData.get("platformId") as string;

  const coverImageFile = formData.get("coverImage") as File | null;
  const screenshotsFiles = formData.getAll("screenshots") as File[];

  const cookieStore = await cookies();
  const token =
    cookieStore.get("token")?.value ||
    req.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    const res = NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    return withCORS(res, req.headers.get("origin") ?? "*");
  }

  let userId: string | undefined;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    userId = decoded.userId;
  } catch (err) {
    console.error("JWT error:", err);
    const res = NextResponse.json(
      { message: "Invalid token" },
      { status: 401 }
    );
    return withCORS(res, req.headers.get("origin") ?? "*");
  }

  if (!userId) {
    const res = NextResponse.json(
      { message: "User ID not found in token" },
      { status: 400 }
    );
    return withCORS(res, req.headers.get("origin") ?? "*");
  }

  const missingFields: string[] = [];
  if (!title) missingFields.push("title");
  if (!description) missingFields.push("description");
  if (!gameUrl) missingFields.push("gameUrl");
  if (!genreId) missingFields.push("genreId");
  if (!platformId) missingFields.push("platformId");

  if (missingFields.length > 0) {
    const res = NextResponse.json(
      { message: "Missing required fields", missingFields },
      { status: 400 }
    );
    return withCORS(res, req.headers.get("origin") ?? "*");
  }

  let coverImageUrl: string | undefined;
  if (coverImageFile) {
    const coverBuffer = await coverImageFile.arrayBuffer();
    const coverBase64 = Buffer.from(coverBuffer).toString("base64");
    const coverUpload = await cloudinary.uploader.upload(
      `data:${coverImageFile.type};base64,${coverBase64}`,
      { folder: "games/cover" }
    );
    coverImageUrl = coverUpload.secure_url;
  }

  const screenshotUrls: string[] = [];
  if (screenshotsFiles.length > 0) {
    for (const file of screenshotsFiles) {
      const buffer = await file.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");
      const result = await cloudinary.uploader.upload(
        `data:${file.type};base64,${base64}`,
        { folder: "games/screenshots" }
      );
      screenshotUrls.push(result.secure_url);
    }
  }

  const updatedGame = await prisma.game.update({
    where: { id },
    data: {
      title,
      description,
      gameUrl,
      genre: { connect: { id: genreId } },
      platform: { connect: { id: platformId } },
      ...(coverImageUrl && { coverImage: coverImageUrl }),
      ...(screenshotUrls.length > 0 && {
        screenshots: JSON.stringify(screenshotUrls),
      }),
    },
  });

  const res = NextResponse.json(updatedGame);
  return withCORS(res, req.headers.get("origin") ?? "*");
}

// DELETE
export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await prisma.game.delete({ where: { id } });
  const res = NextResponse.json({ message: "Game deleted successfully" });
  return withCORS(res, _req.headers.get("origin") ?? "*");
}
