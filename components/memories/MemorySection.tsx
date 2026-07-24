"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { memories } from "@/lib/content";
import MovieTicket from "@/components/ticket/MovieTicket";
import MemoryCard from "./MemoryCard";

export default function MemorySection() {
  const [started, setStarted] = useState(false);

  if (!started) {
    return <MovieTicket onStart={() => setStarted(true)} />;
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050814] py-24">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050814] via-[#08111f] to-black" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="mb-4 uppercase tracking-[0.5em] text-yellow-300">
            Memories
          </p>

          <h2 className="text-5xl font-black md:text-7xl">
            Our Story
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
            Every picture holds a memory. Every memory tells a story.
          </p>
        </motion.div>

        {/* Film Strip */}
        <div className="relative">
          {/* Top Film Strip */}
          <div className="mb-5 h-5 rounded-full bg-zinc-900">
            <div className="flex h-full justify-evenly">
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className="my-auto h-2.5 w-4 rounded-sm bg-black"
                />
              ))}
            </div>
          </div>

          {/* Memories */}
          <div className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
            {memories.map((memory, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.6,
                }}
                className="snap-center flex-shrink-0"
              >
                <MemoryCard
                  image={memory.image}
                  title={memory.title}
                  date={memory.date}
                  caption={memory.caption}
                />
              </motion.div>
            ))}
          </div>

          {/* Bottom Film Strip */}
          <div className="mt-5 h-5 rounded-full bg-zinc-900">
            <div className="flex h-full justify-evenly">
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className="my-auto h-2.5 w-4 rounded-sm bg-black"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Hint */}
        <motion.div
          animate={{
            x: [0, 10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
          }}
          className="mt-12 text-center text-white/50"
        >
          ← Scroll to explore →
        </motion.div>
      </div>
    </section>
  );
}