"use client";

import { motion } from "framer-motion";
import type { SRKVaultMovie } from "@/data/srkVault";

interface SRKRewardProps {
  question: SRKVaultMovie;
  correct: boolean;
  dialoguePlaying: boolean;
  onPlayDialogue: () => void;
  onContinue: () => void;
}

export default function SRKReward({ question, correct, dialoguePlaying, onPlayDialogue, onContinue }: SRKRewardProps) {
  return (
    <motion.section
      className="relative my-auto w-full max-w-3xl overflow-hidden rounded-[1.5rem] border border-[#e6c67a]/35 bg-[radial-gradient(circle_at_top,rgba(230,198,122,.18),transparent_45%),#090604] p-5 text-center shadow-[0_0_100px_rgba(230,198,122,.2)] sm:rounded-[2rem] sm:p-10"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <p className="text-[10px] uppercase tracking-[0.38em] text-[#e6c67a]">{correct ? "Correct answer" : "The director's cut"}</p>
      <h2 className="mt-3 font-serif text-3xl text-[#fff0c8] sm:mt-4 sm:text-6xl">{question.movie}</h2>
      <p className="mt-2 text-xs uppercase tracking-[.25em] text-[#e6c67a]/80">{question.year}</p>
      <p className="mx-auto mt-4 max-w-lg text-white/75">{question.tagline}</p>
      <div className="mx-auto mt-5 flex max-w-lg items-end justify-center gap-3 sm:mt-7">
        <img src={question.poster} alt="" className="h-28 rotate-[-4deg] rounded-md border-4 border-[#f0d493]/70 object-cover shadow-xl sm:h-48" />
        <img src={question.image} alt="Shah Rukh Khan" className="h-36 rounded-xl object-contain drop-shadow-[0_15px_24px_rgba(0,0,0,.7)] sm:h-60" />
      </div>
      <p className="mx-auto mt-4 max-w-md text-xs leading-relaxed text-white/55">{question.funFact}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button type="button" disabled={dialoguePlaying} onClick={onPlayDialogue} className="rounded-full border border-[#e6c67a]/55 bg-[#e6c67a]/15 px-5 py-3 text-xs uppercase tracking-[0.18em] text-[#fff0c8] disabled:opacity-60">
          {dialoguePlaying ? "▮▮ Playing dialogue" : "▶ Play dialogue"}
        </button>
        <button type="button" disabled={dialoguePlaying} onClick={onContinue} className="rounded-full border border-[#e6c67a]/55 px-5 py-3 text-xs uppercase tracking-[0.18em] text-[#fff0c8] disabled:opacity-40">
          Continue →
        </button>
      </div>
      {dialoguePlaying && <div className="mx-auto mt-4 flex h-5 items-center justify-center gap-1 text-[#e6c67a]">{[1, 2, 3, 4, 5].map((bar) => <motion.span key={bar} className="h-1 w-1 rounded-full bg-current" animate={{ scaleY: [1, 4, 1] }} transition={{ duration: 0.55, delay: bar * 0.08, repeat: Infinity }} />)}</div>}
    </motion.section>
  );
}
