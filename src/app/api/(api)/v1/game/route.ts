import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/helpers/server";
import { v2 as cloudinary } from "cloudinary";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  const formData = await req.formData();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const gameUrl = formData.get("gameUrl") as string;
  const genreId = formData.get("genreId") as string;
  const platformId = formData.get("platformId") as string;

  const coverImageFile = formData.get("coverImage") as File;
  const screenshotsFiles = formData.getAll("screenshots") as File[];

  const cookieStore = await cookies();
  const token =
    cookieStore.get("token")?.value ||
    req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let userId: string | undefined;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    userId = decoded.userId;
  } catch (err) {
    console.error("JWT error:", err);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  if (!userId) {
    return NextResponse.json(
      { message: "User ID not found in token" },
      { status: 400 }
    );
  }

  // ✅ Deteksi field yang kosong
  const missingFields: string[] = [];
  if (!title) missingFields.push("title");
  if (!description) missingFields.push("description");
  if (!gameUrl) missingFields.push("gameUrl");
  if (!coverImageFile) missingFields.push("coverImage");
  if (!genreId) missingFields.push("genreId");
  if (!platformId) missingFields.push("platformId");

  if (missingFields.length > 0) {
    return NextResponse.json(
      {
        message: "Missing required fields",
        missingFields,
      },
      { status: 400 }
    );
  }

  // Verifikasi apakah Platform ada
  const platformExists = await prisma.platform.findUnique({
    where: { id: platformId },
  });

  if (!platformExists) {
    return NextResponse.json(
      { message: `Platform with ID ${platformId} not found` },
      { status: 400 }
    );
  }

  // Verifikasi apakah Genre ada
  const genreExists = await prisma.genre.findUnique({
    where: { id: genreId },
  });

  if (!genreExists) {
    return NextResponse.json(
      { message: `Genre with ID ${genreId} not found` },
      { status: 400 }
    );
  }

  // Upload cover image
  const coverBuffer = await coverImageFile.arrayBuffer();
  const coverBase64 = Buffer.from(coverBuffer).toString("base64");
  const coverUpload = await cloudinary.uploader.upload(
    `data:${coverImageFile.type};base64,${coverBase64}`,
    { folder: "games/cover" }
  );

  // Upload screenshots
  const screenshotUrls: string[] = [];

  for (const file of screenshotsFiles) {
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    const result = await cloudinary.uploader.upload(
      `data:${file.type};base64,${base64}`,
      { folder: "games/screenshots" }
    );

    screenshotUrls.push(result.secure_url);
  }

  // Create the game record
  const game = await prisma.game.create({
    data: {
      title,
      description,
      gameUrl,
      coverImage: coverUpload.secure_url,
      screenshots: JSON.stringify(screenshotUrls),
      genre: { connect: { id: genreId } },
      platform: { connect: { id: platformId } },
      createdBy: { connect: { id: userId } },
    },
  });

  return NextResponse.json(game, { status: 201 });
}
