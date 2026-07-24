"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import LetterPaper from "./LetterPaper";
import Typewriter from "./Typewriter";
import Signature from "./Signature";

interface LetterSceneProps {
  active: boolean;
  onComplete: () => void;
}

const LETTER = `Dear ______,

If you're reading this, it means you've reached the end of our little journey.

Every photograph you've seen holds a memory.
Every memory holds a feeling.
And every feeling reminds me how lucky I am to have shared those moments with you.

Thank you for every smile.
For every laugh.
For every late-night conversation.
For every memory we've created together.

Some moments fade.
Some photographs get old.

But the people who make those moments special...
stay with us forever.

I hope this is only the beginning of many more memories.

Happy Birthday ❤️`;

export default function LetterScene({
  active,
  onComplete,
}: LetterSceneProps) {
  const [typingDone, setTypingDone] = useState(false);
  const [signatureDone, setSignatureDone] = useState(false);
  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    if (!signatureDone) return;

    const timer = setTimeout(() => {
      setShowContinue(true);
    }, 600);

    return () => clearTimeout(timer);
  }, [signatureDone]);

  useEffect(() => {
    if (!active) {
      setTypingDone(false);
      setSignatureDone(false);
      setShowContinue(false);
    }
  }, [active]);

  if (!active) return null;

  return (
    <motion.section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080808] px-6 py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 1,
      }}
    >
      {/* Background glow */}
      <motion.div
        animate={{
          opacity: [0.15, 0.22, 0.15],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top,rgba(255,210,120,.12),transparent_70%)]
        "
      />

      <LetterPaper>
        <Typewriter
          text={LETTER}
          speed={28}
          className="text-lg md:text-xl leading-9"
          onComplete={() => setTypingDone(true)}
        />

        <AnimatePresence>
          {typingDone && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
            >
              <Signature
                name="Ayush"
                onComplete={() => setSignatureDone(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showContinue && (
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: .2,
              }}
              className="mt-14 flex justify-center"
            >
              <button
                onClick={onComplete}
                className="
                  rounded-full
                  border
                  border-zinc-300
                  bg-white/80
                  px-8
                  py-3
                  text-sm
                  font-medium
                  uppercase
                  tracking-[0.25em]
                  text-zinc-800
                  transition-all
                  duration-300
                  hover:scale-105
                  hover:bg-white
                  active:scale-95
                "
              >
                Continue
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </LetterPaper>
    </motion.section>
  );
}