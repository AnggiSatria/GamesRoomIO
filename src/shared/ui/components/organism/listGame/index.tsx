"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useReadGames } from "@/shared/lib/helpers/client/services/games";
import { IResponseGetGamesList } from "@/shared/lib/helpers/client/services/interfaces/games.interfaces";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface GameListProps {
  search: string;
}

export default function GameList({ search }: GameListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const activeFilter = {
    search: search,
    page: `${currentPage}&limit=${itemsPerPage}`,
  };

  const { data: dataGames, isLoading } = useReadGames(activeFilter);

  const games = dataGames && dataGames?.data?.data;
  const totalItems = dataGames?.data?.totalItems || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const skeletons = [1, 2, 3];

  return (
    <div className="w-full xl:max-w-4xl mx-auto p-4 order-2 xl:order-1">
      <h1 className="text-2xl font-bold mb-4">Game List</h1>
      <ul className="space-y-8">
        {isLoading
          ? skeletons?.map((_, idx) => (
              <li
                key={idx}
                className="border-b pb-4 flex flex-col sm:flex-row gap-4"
              >
                <Skeleton className="w-full sm:w-32 h-40 object-cover rounded-md" />
                <Skeleton className="flex-1" />
              </li>
            ))
          : games?.map((game: IResponseGetGamesList) => (
              <li
                key={game?.id}
                className="border-b pb-4 flex flex-col sm:flex-row gap-4"
              >
                <Image
                  src={game?.coverImage}
                  alt={game?.title}
                  className="w-full sm:w-32 h-40 object-cover rounded-md"
                  width={640}
                  height={160}
                />
                <div className="flex-1">
                  <h2 className="text-lg sm:text-xl font-semibold text-blue-600">
                    <Link
                      href={`/game/${game?.id}`}
                      rel="noopener noreferrer"
                      className="cursor-pointer hover:underline"
                    >
                      {game?.title}
                    </Link>
                  </h2>
                  <p className="text-gray-700 text-sm sm:text-base">
                    {game?.description}
                  </p>
                  <div className="text-xs sm:text-sm text-gray-500 mt-1">
                    Genre: {game?.genre?.name} • Platform:{" "}
                    {game?.platform?.name} •{" "}
                    {new Date(game?.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </li>
            ))}
      </ul>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage - 1);
              }}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            return (
              <PaginationItem key={page} className="text-[#0a0a0a]">
                <PaginationLink
                  href="#"
                  isActive={page === currentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(page);
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          {totalPages > 5 && currentPage < totalPages - 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
