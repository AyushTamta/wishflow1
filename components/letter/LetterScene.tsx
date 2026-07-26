"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import LetterPaper from "./LetterPaper";
import Typewriter from "./Typewriter";

import { ActiveStorySceneProps } from "@/types/scene";
import { useScene } from "@/hooks/useScene";

const LETTER = `Dear Ambay,

If you're reading this, it means you've reached the end of this little journey.

These past few months of knowing you have given me memories I'll always cherish. More than that, you've given me something far more valuable—hope. Every time I see you, I'm reminded that life has so much more to offer, and somehow, you make me look forward to it a little more.

Thank you for being you, and thank you for reminding me that hope really is a good thing... maybe the best of things.

Happy Birthday. ✦`;

export default function LetterScene({
  active,
  onComplete,
}: ActiveStorySceneProps) {
  useScene("letter", active);

  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    if (!active) return;

    setTypingDone(false);
  }, [active]);

  if (!active) return null;

  return (
    <motion.section
      className="relative h-[100dvh] overflow-hidden bg-[#080705]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,210,120,.16),transparent_58%),linear-gradient(180deg,#120c08,#050403)]" />
      <div className="absolute inset-0 opacity-[0.12] bg-[url('/images/textures/paper.jpg')] bg-cover bg-center mix-blend-soft-light" />

      <div className="relative z-10 h-full overflow-y-auto px-5 py-6 md:px-10 md:py-8">
        <LetterPaper>
          <div className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-5xl flex-col justify-center py-10 md:py-14">
            <motion.p
              className="mb-8 text-center text-xs uppercase tracking-[0.55em] text-[#8b5d28]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              A letter from the end of the reel
            </motion.p>

            <Typewriter
              text={LETTER}
              speed={18}
              className="whitespace-pre-line font-serif text-xl leading-10 text-[#332317] md:text-2xl md:leading-[3.1rem]"
              onComplete={() => setTypingDone(true)}
            />

            <AnimatePresence>
              {typingDone && (
                <motion.div
                  className="mt-12 flex flex-col items-center gap-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="h-px w-56 bg-gradient-to-r from-transparent via-[#9b6a2e] to-transparent" />
                  <button
                    onClick={onComplete}
                    className="rounded-full border border-[#7b4b1d]/35 bg-[#3b2210]/90 px-8 py-4 text-sm font-medium uppercase tracking-[0.32em] text-[#f7dfb5] shadow-[0_18px_50px_rgba(58,34,16,.28)] transition hover:scale-105 hover:bg-[#4d2b12] active:scale-95"
                  >
                    Roll Credits
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </LetterPaper>
      </div>
    </motion.section>
  );
}
