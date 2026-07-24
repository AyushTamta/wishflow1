"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import LetterPaper from "./LetterPaper";
import Typewriter from "./Typewriter";
import Signature from "./Signature";

import { ActiveStorySceneProps } from "@/types/scene";
import { useScene } from "@/hooks/useScene";

const LETTER = `Dear Ambay,

If you're reading this, it means you've reached the end of our little journey.

Every photograph you've seen holds a memory.
Every memory holds a feeling.
And every feeling reminds me how lucky I am to have shared those moments with you.

Thank you for every smile.
For every laugh.

Happy Birthday ❤️`;

export default function LetterScene({
  active,
  onComplete,
}: ActiveStorySceneProps) {
  useScene("letter", active);

  const [typingDone, setTypingDone] = useState(false);
  const [signatureDone, setSignatureDone] = useState(false);
  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    if (!active) return;

    console.log("LetterScene mounted");

    setTypingDone(false);
    setSignatureDone(false);
    setShowContinue(false);
  }, [active]);

  useEffect(() => {
    console.log({
      typingDone,
      signatureDone,
      showContinue,
    });
  }, [typingDone, signatureDone, showContinue]);

  useEffect(() => {
    if (!signatureDone) return;

    console.log("Signature finished");

    const timer = window.setTimeout(() => {
      console.log("Showing continue button");
      setShowContinue(true);
    }, 600);

    return () => clearTimeout(timer);
  }, [signatureDone]);

  if (!active) return null;

  return (
    <motion.section
      className="relative min-h-screen overflow-y-auto bg-[#080808] px-6 py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,210,120,.12),transparent_70%)]"
        animate={{
          opacity: [0.15, 0.22, 0.15],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl items-center justify-center">
        <LetterPaper>
          <Typewriter
            text={LETTER}
            speed={28}
            className="text-lg leading-9 md:text-xl"
            onComplete={() => {
              console.log("TYPEWRITER COMPLETE");
              setTypingDone(true);
            }}
          />

          <AnimatePresence>
            {typingDone && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Signature
                  name="Ayush"
                  onComplete={() => {
                    console.log("SIGNATURE COMPLETE");
                    setSignatureDone(true);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showContinue && (
              <motion.div
                className="mt-14 flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <button
                  onClick={() => {
                    console.log("CONTINUE CLICKED");
                    onComplete();
                  }}
                  className="rounded-full border border-zinc-300 bg-white/80 px-8 py-3 text-sm font-medium uppercase tracking-[0.25em] text-zinc-800 transition-all duration-300 hover:scale-105 hover:bg-white active:scale-95"
                >
                  Continue
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </LetterPaper>
      </div>
    </motion.section>
  );
}