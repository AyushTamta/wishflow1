"use client";

import { motion } from "framer-motion";
import type { SRKQuizQuestion } from "@/data/srkQuiz";

interface SRKRewardProps {
  question: SRKQuizQuestion;
  correct: boolean;
  onContinue: () => void;
}

export default function SRKReward({ question, correct, onContinue }: SRKRewardProps) {
  return (
    <motion.section
      className="relative my-auto w-full max-w-3xl overflow-hidden rounded-[1.5rem] border border-[#e6c67a]/35 bg-[radial-gradient(circle_at_top,rgba(230,198,122,.18),transparent_45%),#090604] p-5 text-center shadow-[0_0_100px_rgba(230,198,122,.2)] sm:rounded-[2rem] sm:p-10"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <p className="text-[10px] uppercase tracking-[0.38em] text-[#e6c67a]">{correct ? "Correct answer" : "The director's cut"}</p>
      <h2 className="mt-3 font-serif text-3xl text-[#fff0c8] sm:mt-4 sm:text-6xl">{question.movie}</h2>
      <p className="mx-auto mt-4 max-w-lg text-white/75">{question.reward}</p>
      <div className="mx-auto mt-5 flex max-w-lg items-end justify-center gap-3 sm:mt-7">
        <img src={question.poster} alt="" className="h-28 rotate-[-4deg] rounded-md border-4 border-[#f0d493]/70 object-cover shadow-xl sm:h-48" />
        <img src={question.image} alt="Shah Rukh Khan" className="h-36 rounded-xl object-contain drop-shadow-[0_15px_24px_rgba(0,0,0,.7)] sm:h-60" />
      </div>
      <button type="button" onClick={onContinue} className="mt-7 rounded-full border border-[#e6c67a]/55 bg-[#e6c67a]/15 px-6 py-3 text-xs uppercase tracking-[0.22em] text-[#fff0c8] transition hover:bg-[#e6c67a]/25">
        Continue →
      </button>
    </motion.section>
  );
}
