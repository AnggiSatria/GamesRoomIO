// app/games/[id]/page.tsx

import { IResponseGetGameById } from "@/shared/lib/helpers/client/services/interfaces/games.interfaces";
import { IResponseGetReviewList } from "@/shared/lib/helpers/client/services/interfaces/review.interfaces";
import GameDetailPage from "@/shared/ui/components/templates/GameDetailPage";

type tParams = Promise<{ id: string }>;

export default async function GameDetail({ params }: { params: tParams }) {
  const { id } = await params;

  // Fetch game detail
  const gameRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/game/${id}`,
    {
      cache: "no-store",
    }
  );
  const game: IResponseGetGameById = await gameRes.json();

  // Fetch reviews
  const reviewsRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/reviews?gameId=${id}`,
    { cache: "no-store" }
  );
  const reviews: IResponseGetReviewList[] = await reviewsRes.json();

  return (
    <>
      <GameDetailPage game={game} reviews={reviews} />
    </>
  );
}
