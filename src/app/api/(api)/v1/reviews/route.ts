import { prisma } from "@/shared/lib/helpers/server";
import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const page = Number(searchParams.get("page") || 1);
//   const limit = Number(searchParams.get("limit") || 10);
//   const search = searchParams.get("search") || "";

//   const reviews = await prisma.review.findMany({
//     where: {
//       OR: [
//         { comment: { contains: search, mode: "insensitive" } },
//         { game: { title: { contains: search, mode: "insensitive" } } },
//       ],
//     },
//     include: { game: true, createdBy: true },
//     skip: (page - 1) * limit,
//     take: limit,
//     orderBy: { createdAt: "desc" },
//   });

//   return NextResponse.json(reviews);
// }

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  const search = searchParams.get("search") || "";
  const gameId = searchParams.get("gameId"); // ← tambahkan ini

  const reviews = await prisma.review.findMany({
    where: {
      AND: [
        gameId ? { gameId } : {}, // ← filter by gameId kalau ada
        {
          OR: [
            { comment: { contains: search, mode: "insensitive" } },
            { game: { title: { contains: search, mode: "insensitive" } } },
          ],
        },
      ],
    },
    include: { game: true, createdBy: true },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(reviews);
}
