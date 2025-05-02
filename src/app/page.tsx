"use client";

import HeroSection from "@/shared/ui/components/molecules/hero";
import SidebarFilter from "@/shared/ui/components/molecules/sidebarFilter";
import GameList from "@/shared/ui/components/organism/listGame";
import Navbar from "@/shared/ui/components/organism/navbar/page";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Navbar */}
      <Navbar />
      {/* Hero */}
      <HeroSection />
      {/* List Game */}
      <div className="flex w-full gap-3 xl:px-7 flex-col xl:flex-row">
        <GameList search={debouncedSearchTerm} />
        <SidebarFilter
          onSearchChange={(val) => {
            setSearchTerm(val);
          }}
          onPlatformChange={(platforms) => {
            console.log(platforms);
          }}
        />
      </div>
    </main>
  );
}
