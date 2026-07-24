"use client";

import { memories } from "@/lib/content";
import MemoryCard from "./MemoryCard";

export default function MemorySection() {
  return (
    <section className="min-h-screen bg-[#060912] py-32 px-8">
      <h2 className="text-5xl font-bold text-center mb-20">
        Our Story
      </h2>

      <div className="max-w-6xl mx-auto space-y-24">
        {memories.map((memory, index) => (
          <MemoryCard
            key={index}
            image={memory.image}
            caption={memory.caption}
          />
        ))}
      </div>
    </section>
  );
}