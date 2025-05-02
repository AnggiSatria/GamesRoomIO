import React from "react";

export default function HeroSection() {
  return (
    <>
      <section className="flex flex-col items-center justify-center text-center py-24 px-4">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          Play Anywhere with{" "}
          <span className="text-purple-500">GamesRoom IO</span>
        </h2>
        <p className="text-lg md:text-xl max-w-xl mb-8 text-gray-300">
          Your favorite games, no installation needed. Just click and play!
        </p>
      </section>
    </>
  );
}
