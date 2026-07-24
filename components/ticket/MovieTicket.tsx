"use client";

import { motion } from "framer-motion";

type MovieTicketProps = {
  onStart?: () => void;
};

export default function MovieTicket({ onStart }: MovieTicketProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060912] px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 60 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative w-full max-w-2xl rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-800 border border-yellow-500/30 shadow-2xl"
      >
        {/* Ticket perforation */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-[#060912] -ml-5" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-[#060912] -mr-5" />

        <div className="p-10 text-center">
          <p className="text-yellow-300 tracking-[0.4em] text-sm uppercase">
            Admit One
          </p>

          <h2 className="mt-6 text-5xl font-black">
            WishFlow
          </h2>

          <p className="mt-4 text-white/70">
            Every story deserves a beautiful beginning.
          </p>

          <button
            onClick={onStart}
            className="mt-10 rounded-full bg-yellow-400 px-8 py-4 font-semibold text-black transition hover:scale-105"
          >
            Begin the Story
          </button>
        </div>
      </motion.div>
    </div>
  );
}