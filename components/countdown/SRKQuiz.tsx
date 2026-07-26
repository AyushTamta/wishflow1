"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { srkVault } from "@/data/srkVault";
import { useQuizAudio } from "./AudioManager";
import SRKIntro from "./SRKIntro";
import SRKQuestion from "./SRKQuestion";
import SRKReward from "./SRKReward";

interface SRKQuizProps {
  now: number | null;
  unlockAt: number;
}

type QuizScreen = "welcome" | "intro" | "question" | "reward" | "halfway" | "final-reel" | "complete";

function formatTime(remaining: number) {
  const safe = Math.max(0, remaining);
  const hours = Math.floor(safe / 3_600_000);
  const minutes = Math.floor((safe % 3_600_000) / 60_000);
  const seconds = Math.floor((safe % 60_000) / 1_000);
  return [hours, minutes, seconds].map((value) => String(value).padStart(2, "0")).join(":");
}

export default function SRKQuiz({ now, unlockAt }: SRKQuizProps) {
  const [screen, setScreen] = useState<QuizScreen>("welcome");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { startMusic, playDialogue, dialoguePlaying, stopAll } = useQuizAudio();

  const unlocked = now !== null && now >= unlockAt;
  const question = srkVault[questionIndex];

  useEffect(() => setMounted(true), []);

  const startQuiz = () => {
    setScreen("intro");
  };

  const beginQuestions = () => {
    startMusic();
    setScreen("question");
  };

  const revealReward = () => setScreen("reward");

  const continueAfterReward = () => {
    startMusic();
    if (questionIndex === 4) return setScreen("halfway");
    if (questionIndex === 8) return setScreen("final-reel");
    if (questionIndex === srkVault.length - 1) return setScreen("complete");
    setQuestionIndex((current) => current + 1);
    setSelected(null);
    setScreen("question");
  };

  const continueBreak = () => {
    setQuestionIndex((current) => current + 1);
    setSelected(null);
    setScreen("question");
  };

  const closeQuiz = () => {
    stopAll();
    setScreen("welcome");
    setQuestionIndex(0);
    setSelected(null);
    setScore(0);
  };

  if (!unlocked) {
    return (
      <section className="mt-5 w-full max-w-xl rounded-2xl border border-[#e6c67a]/25 bg-[#120b06]/65 px-5 py-5 text-center shadow-[0_0_32px_rgba(230,198,122,.08)]">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#e6c67a]">Private screening</p>
        <h2 className="mt-3 font-serif text-2xl text-[#fff0c8]">A Little Surprise 👀</h2>
        <p className="mt-4 text-sm leading-relaxed text-white/75">Hey, Ambay. 👋<br /><br />This one&apos;s almost ready.<br />Come back at 10:30 PM.</p>
        <p className="mt-5 font-mono text-3xl tabular-nums text-[#f2c867]">{formatTime(unlockAt - (now ?? unlockAt))}</p>
        <p className="mt-1 text-[9px] uppercase tracking-[0.22em] text-white/45">until 26 Jul · 10:30 PM</p>
      </section>
    );
  }

  if (screen === "welcome") {
    return (
      <section className="mt-5 w-full max-w-xl rounded-2xl border border-[#e6c67a]/30 bg-[#120b06]/75 px-5 py-6 text-center shadow-[0_0_40px_rgba(230,198,122,.12)]">
        <p className="font-serif text-2xl text-[#fff0c8]">Hey, Ambay. 👋</p>
        <p className="mt-4 text-sm leading-relaxed text-white/75">Looks like you&apos;ve found a little surprise before the real surprise.<br /><br />So while the countdown keeps ticking...<br />I thought we&apos;d make the wait a little more fun.</p>
        <p className="mt-5 font-serif text-xl text-[#f2c867]">Ready for a tiny challenge?</p>
        <button type="button" onClick={startQuiz} className="mt-5 rounded-full border border-[#e6c67a]/55 bg-[#e6c67a]/15 px-6 py-3 text-xs uppercase tracking-[0.22em] text-[#fff0c8] transition hover:bg-[#e6c67a]/25">▶ Let&apos;s Play</button>
      </section>
    );
  }

  const experience = (
    <div className="fixed inset-0 z-[250] flex items-start justify-center overflow-y-auto bg-black/95 p-3 py-5 text-center sm:items-center sm:p-4">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(196,132,42,.2),transparent_35%),linear-gradient(145deg,#050302,#1b0e07,#030202)]" />
      <div className="pointer-events-none absolute -left-[14%] top-[13%] h-24 w-[75%] -rotate-[12deg] opacity-35 [background:radial-gradient(ellipse_at_center,transparent_42%,rgba(230,198,122,.45)_43%,rgba(230,198,122,.45)_47%,transparent_48%),repeating-linear-gradient(90deg,rgba(230,198,122,.34)_0_9px,transparent_9px_28px)] [mask-image:linear-gradient(90deg,transparent,black_18%,black_82%,transparent)]" />
      <div className="pointer-events-none absolute -right-[17%] bottom-[11%] h-28 w-[78%] rotate-[10deg] opacity-30 [background:radial-gradient(ellipse_at_center,transparent_42%,rgba(230,198,122,.45)_43%,rgba(230,198,122,.45)_47%,transparent_48%),repeating-linear-gradient(90deg,rgba(230,198,122,.34)_0_9px,transparent_9px_28px)] [mask-image:linear-gradient(90deg,transparent,black_18%,black_82%,transparent)]" />
      <AnimatePresence mode="wait">
        {screen === "intro" && <SRKIntro key="intro" onStart={beginQuestions} />}
        {screen === "question" && <SRKQuestion key={`question-${questionIndex}`} index={questionIndex} question={question} selected={selected} onSelect={(option) => { setSelected(option); if (option === question.answer) setScore((current) => current + 1); }} onContinue={revealReward} />}
        {screen === "reward" && <SRKReward key={`reward-${questionIndex}`} question={question} correct={selected === question.answer} dialoguePlaying={dialoguePlaying} onPlayDialogue={() => playDialogue(question.dialogue)} onContinue={continueAfterReward} />}
        {screen === "halfway" && <BreakCard key="halfway" title="Halfway there, Ambay." body="Five reels down.\nFive more to go." action="Continue" onClick={continueBreak} />}
        {screen === "final-reel" && <BreakCard key="final" title="One last movie." body="One last memory.\nReady?" action="Ready" onClick={continueBreak} />}
        {screen === "complete" && <FinishCard key="complete" score={score} dialoguePlaying={dialoguePlaying} onPlayDialogue={() => playDialogue("/audio/end-card-dialogue.mp3")} onClose={closeQuiz} />}
      </AnimatePresence>
    </div>
  );

  return mounted ? createPortal(experience, document.body) : null;
}

function BreakCard({ title, body, action, onClick }: { title: string; body: string; action: string; onClick: () => void }) {
  return <motion.section initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} className="relative my-auto w-full max-w-xl rounded-[2rem] border border-[#e6c67a]/35 bg-[#0b0705] px-5 py-8 shadow-[0_0_100px_rgba(230,198,122,.18)] sm:px-7 sm:py-12"><p className="text-[10px] uppercase tracking-[.4em] text-[#e6c67a]">Intermission</p><h2 className="mt-5 font-serif text-3xl text-[#fff0c8] sm:text-4xl">{title}</h2><p className="mt-5 whitespace-pre-line text-base leading-relaxed text-white/70 sm:text-lg">{body}</p><button type="button" onClick={onClick} className="mt-8 rounded-full border border-[#e6c67a]/55 px-6 py-3 text-xs uppercase tracking-[.2em] text-[#fff0c8]">{action} →</button></motion.section>;
}

function FinishCard({ score, dialoguePlaying, onPlayDialogue, onClose }: { score: number; dialoguePlaying: boolean; onPlayDialogue: () => void; onClose: () => void }) {
  return <motion.section initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} className="relative my-auto w-full max-w-xl rounded-[2rem] border border-[#e6c67a]/35 bg-[#0b0705] px-5 py-8 shadow-[0_0_100px_rgba(230,198,122,.18)] sm:px-7 sm:py-12"><p className="text-5xl">🏆</p><h2 className="mt-4 font-serif text-4xl text-[#fff0c8] sm:text-5xl">True SRK Fan</h2><p className="mt-5 text-lg text-[#f2c867]">Score: {score} / 10</p><p className="mt-8 text-white/75">Ye to sirf trailer tha...</p><p className="mt-5 font-serif text-xl italic text-[#fff0c8] sm:text-2xl">Picture abhi baaki hai,<br />mere dost.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><button type="button" disabled={dialoguePlaying} onClick={onPlayDialogue} className="rounded-full border border-[#e6c67a]/55 px-5 py-3 text-xs uppercase tracking-[.18em] text-[#fff0c8] disabled:opacity-60">{dialoguePlaying ? "▮▮ Playing finale" : "▶ Play final dialogue"}</button><button type="button" disabled={dialoguePlaying} onClick={onClose} className="rounded-full border border-[#e6c67a]/55 bg-[#e6c67a]/15 px-5 py-3 text-xs uppercase tracking-[.18em] text-[#fff0c8] disabled:opacity-40">Return to Countdown</button></div></motion.section>;
}
