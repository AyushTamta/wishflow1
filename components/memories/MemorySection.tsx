"use client";

import { useState } from "react";

import { memories } from "@/lib/content";
import MovieTicket from "@/components/ticket/MovieTicket";
import MemoryCard from "./MemoryCard";

export default function MemorySection() {
  const [started, setStarted] = useState(false);

  if (!started) {
    return <MovieTicket onStart={() => setStarted(true)} />;
  }

  return (
    <section className="min-h-screen bg-[#060912] py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-20 text-center text-5xl font-bold">
          Our Story
        </h2>

        <div className="space-y-20">
          {memories.map((memory, index) => (
            <MemoryCard
              key={index}
              image={memory.image}
              caption={memory.caption}
            />
          ))}
        </div>
      </div>
    </section>
  );
}