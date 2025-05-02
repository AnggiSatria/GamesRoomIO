"use client";

import { useState } from "react";
import { toast, Toaster } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { IResponseGetGameById } from "@/shared/lib/helpers/client/services/interfaces/games.interfaces";
import { IResponseGetReviewList } from "@/shared/lib/helpers/client/services/interfaces/review.interfaces";

export default function GameDetailPage({
  game,
  reviews: initialReviews,
}: {
  game: IResponseGetGameById;
  reviews: IResponseGetReviewList[];
}) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [reviews, setReviews] =
    useState<IResponseGetReviewList[]>(initialReviews);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const res = await fetch(`${baseUrl}/api/v1/review`, {
      method: "POST",
      body: JSON.stringify({
        gameId: game.id,
        rating,
        comment,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const newReview = await res.json();
      setReviews((prev) => [newReview, ...prev]);
      setComment("");
      setRating(5);
    } else if (res.status === 401) {
      toast.error("Please Login First!!!");
    }

    setSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Toaster />
      <h1 className="text-3xl font-bold mb-4">{game?.title}</h1>

      <div className="flex w-full h-64">
        {game?.coverImage && (
          <Image
            src={game?.coverImage}
            alt={game?.title}
            className="w-full h-full object-cover rounded-md mb-6"
            width={256}
            height={256}
            layout="responsive"
          />
        )}
      </div>

      <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
        <span className="bg-blue-100 px-3 py-1 rounded-full">
          Genre: {game?.genre?.name}
        </span>
        <span className="bg-green-100 px-3 py-1 rounded-full">
          Platform: {game?.platform?.name}
        </span>
        <span className="bg-gray-100 px-3 py-1 rounded-full">
          Uploaded on: {new Date(game?.createdAt).toLocaleDateString()}
        </span>
      </div>

      <p className="text-gray-700 mb-6">{game?.description}</p>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Screenshots</h2>
        {Array.isArray(game?.screenshots) && game?.screenshots?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {game?.screenshots?.map((url, index) => (
              <Image
                key={index}
                src={url}
                alt={`Screenshot ${index + 1}`}
                className="w-full rounded-md h-64 object-cover"
                width={256}
                height={256}
                layout="responsive"
              />
            ))}
          </div>
        )}
      </div>

      <a
        href={game?.gameUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-500 transition mb-4"
      >
        Play Game
      </a>

      <br />
      <Link
        href="/"
        className="text-gray-700 hover:underline inline-block mt-4"
      >
        ← Back to Game List
      </Link>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>

        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <div>
            <label htmlFor="rating" className="block font-medium mb-1">
              Rating
            </label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-20 border rounded p-1"
              required
            >
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="comment" className="block font-medium mb-1">
              Comment
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full border rounded p-2"
              placeholder="Write your review..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500 transition"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>

        {reviews?.length === 0 ? (
          <p className="text-gray-600">No reviews yet.</p>
        ) : (
          <ul className="space-y-4">
            {reviews?.map((review) => (
              <li
                key={review?.id}
                className="border p-4 rounded-lg shadow-sm bg-white"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-800">
                    {review?.createdBy?.username || "Anonymous"}
                  </span>
                  <span className="text-yellow-500 font-semibold">
                    ⭐ {review?.rating}/5
                  </span>
                </div>
                <p className="text-gray-700 mb-1">{review?.comment}</p>
                <span className="text-sm text-gray-500">
                  {new Date(review?.createdAt).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
