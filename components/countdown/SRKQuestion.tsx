"use client";

import { motion } from "framer-motion";
import type { SRKQuizQuestion } from "@/data/srkQuiz";

interface SRKQuestionProps {
  index: number;
  question: SRKQuizQuestion;
  selected: number | null;
  onSelect: (option: number) => void;
  onContinue: () => void;
}

export default function SRKQuestion({
  index,
  question,
  selected,
  onSelect,
  onContinue,
}: SRKQuestionProps) {
  const answered = selected !== null;
  const wasCorrect = selected === question.answer;

  return (
    <motion.section
      key={index}
      className="relative my-auto w-full max-w-4xl overflow-hidden rounded-[1.5rem] border border-[#e6c67a]/25 bg-[#0a0705]/95 p-4 shadow-[0_0_90px_rgba(230,198,122,.14)] sm:rounded-[2rem] sm:p-8"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
    >
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(230,198,122,.22)_1px,transparent_1px)] [background-size:18px_18px]" />
      <div className="relative grid gap-5 md:grid-cols-[1fr_220px] md:items-center md:gap-6">
        <div>
          <p className="text-[10px] uppercase tracking-[0.34em] text-[#e6c67a]">
            Reel {index + 1} / 10 · {index < 3 ? "Warm-up" : index < 7 ? "Cinephile" : "Final cut"}
          </p>
          <h2 className="mt-3 font-serif text-3xl text-[#fff0c8] sm:mt-4 sm:text-5xl">Name that film</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75 sm:mt-4 sm:text-lg">{question.clue}</p>

          <div className="mt-5 grid gap-2 sm:mt-6 sm:gap-3 sm:grid-cols-2">
            {question.options.map((option, optionIndex) => {
              const isSelected = selected === optionIndex;
              const isCorrect = optionIndex === question.answer;
              const resultClass = !answered
                ? "border-white/15 bg-white/[.04] hover:border-[#e6c67a]/70 hover:bg-[#e6c67a]/10"
                : isCorrect
                  ? "border-emerald-300/70 bg-emerald-300/15 text-emerald-100"
                  : isSelected
                    ? "border-red-300/60 bg-red-400/10 text-red-100"
                    : "border-white/10 bg-white/[.02] text-white/40";

              return (
                <button
                  type="button"
                  key={option}
                  disabled={answered}
                  onClick={() => onSelect(optionIndex)}
                  className={`rounded-xl border px-3 py-2.5 text-left text-xs transition sm:px-4 sm:py-3 sm:text-sm ${resultClass}`}
                >
                  <span className="mr-2 text-[#e6c67a]/70">{String.fromCharCode(65 + optionIndex)}.</span>
                  {option}
                </button>
              );
            })}
          </div>

          {answered && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-5">
              <p className={`text-sm font-medium ${wasCorrect ? "text-emerald-200" : "text-[#fff0c8]/85"}`}>
                {wasCorrect ? "Correct — that was a proper SRK moment. ✨" : `The answer was ${question.movie}.`}
              </p>
              <button type="button" onClick={onContinue} className="mt-4 rounded-full border border-[#e6c67a]/50 bg-[#e6c67a]/10 px-5 py-2 text-xs uppercase tracking-[0.2em] text-[#fff0c8] transition hover:bg-[#e6c67a]/20">
                Reveal reward →
              </button>
            </motion.div>
          )}
        </div>

        <div className="mx-auto order-first w-24 rotate-2 rounded-lg border-4 border-[#f0d493]/70 bg-[#24150d] p-1 shadow-2xl sm:w-32 md:order-none md:w-full">
          <img src={question.poster} alt={`${question.movie} poster`} className="aspect-[2/3] w-full object-cover" />
        </div>
      </div>
    </motion.section>
  );
}
