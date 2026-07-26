"use client";

import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import CountdownJukebox from "./CountdownJukebox";
import SRKQuiz from "./SRKQuiz";

const QUIZ_START = new Date("2026-07-26T22:30:00+05:30").getTime();
const BIRTHDAY_START = new Date("2026-07-27T00:00:00+05:30").getTime();

let tickAudioContext: AudioContext | null = null;

function splitRemaining(remaining: number) {
  const total = Math.max(0, remaining);
  const days = Math.floor(total / 86_400_000);
  const hours = Math.floor((total % 86_400_000) / 3_600_000);
  const minutes = Math.floor((total % 3_600_000) / 60_000);
  const seconds = Math.floor((total % 60_000) / 1_000);
  const milliseconds = total % 1_000;

  return { days, hours, minutes, seconds, milliseconds };
}

function playTick(context: AudioContext) {
  const now = context.currentTime;
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = "square";
  oscillator.frequency.setValueAtTime(1_150, now);
  gain.gain.setValueAtTime(0.075, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.085);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.09);
}

function useTickSound(enabled: boolean) {
  const [unlocked, setUnlocked] = useState(
    () => tickAudioContext?.state === "running"
  );

  const enableSound = useCallback(() => {
    if (!tickAudioContext) tickAudioContext = new AudioContext();

    // iOS Safari only permits the first audible sound within the tap itself.
    // Start one now, then keep the same audio context for subsequent ticks.
    playTick(tickAudioContext);
    void tickAudioContext.resume().then(() => {
      setUnlocked(tickAudioContext?.state === "running");
    });
  }, []);

  useEffect(() => {
    const unlock = () => void enableSound();

    window.addEventListener("pointerdown", unlock, { once: true, capture: true });
    window.addEventListener("keydown", unlock, { once: true, capture: true });

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [enableSound]);

  useEffect(() => {
    if (!enabled || !unlocked || !tickAudioContext) return;

    const tick = () => playTick(tickAudioContext!);

    let previousSecond = Math.floor(Date.now() / 1_000);
    tick();
    const interval = window.setInterval(() => {
      const currentSecond = Math.floor(Date.now() / 1_000);
      if (currentSecond === previousSecond) return;
      previousSecond = currentSecond;
      tick();
    }, 50);

    return () => window.clearInterval(interval);
  }, [enabled, unlocked]);

  return { unlocked, enableSound };
}

function TimeUnit({ value, label, digits = 2 }: { value: number; label: string; digits?: number }) {
  return (
    <div className="min-w-[3.45rem] text-center sm:min-w-[4.75rem] md:min-w-[7rem]">
      <motion.div
        key={value}
        initial={{ opacity: 0.4, y: 7 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.16 }}
        className="font-mono text-3xl font-semibold tabular-nums text-[#fff0c8] drop-shadow-[0_0_22px_rgba(255,213,126,.38)] sm:text-4xl md:text-7xl"
      >
        {String(value).padStart(digits, "0")}
      </motion.div>
      <p className="mt-1.5 text-[8px] uppercase tracking-[0.2em] text-[#e7c77d]/65 sm:mt-3 sm:text-[9px] md:text-[10px]">{label}</p>
    </div>
  );
}

interface BirthdayGateProps {
  children: ReactNode;
}

function LaunchCountdown({ children }: BirthdayGateProps) {
  const [seconds, setSeconds] = useState(10);
  const { unlocked, enableSound } = useTickSound(seconds > 0);

  useEffect(() => {
    if (seconds === 0) return;

    const timer = window.setTimeout(() => {
      setSeconds((current) => current - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [seconds]);

  if (seconds === 0) return <>{children}</>;

  return (
    <main className="relative flex h-[100dvh] items-center justify-center overflow-hidden bg-black px-6 text-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,217,133,.2),transparent_22%),linear-gradient(135deg,#030303,#1c0f08,#030303)]" />
      <motion.div
        className="pointer-events-none absolute h-[min(74vw,38rem)] w-[min(74vw,38rem)] rounded-full border border-[#e6c67a]/25"
        animate={{ rotate: 360, scale: [0.92, 1.04, 0.92] }}
        transition={{ rotate: { duration: 12, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity } }}
      />
      <div className="relative z-10">
        <p className="mb-6 text-[10px] uppercase tracking-[0.52em] text-[#e6c67a]/75">The screening begins</p>
        <motion.p
          key={seconds}
          initial={{ opacity: 0, scale: 1.45, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.42, ease: "easeOut" }}
          className="font-mono text-[9rem] font-bold leading-none tabular-nums text-[#fff0c8] drop-shadow-[0_0_36px_rgba(255,213,126,.55)] md:text-[15rem]"
        >
          {seconds}
        </motion.p>
        <p className="mt-7 font-serif text-xl text-white/75 md:text-2xl">Ready for the surprise?</p>
        {!unlocked && (
          <button
            type="button"
            onClick={() => void enableSound()}
            className="mt-5 rounded-full border border-[#e6c67a]/40 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-[#f2c867]"
          >
            Tap to enable ticking
          </button>
        )}
      </div>
    </main>
  );
}

export default function BirthdayGate({ children }: BirthdayGateProps) {
  const [now, setNow] = useState<number | null>(null);
  const { unlocked, enableSound } = useTickSound(now !== null && now < BIRTHDAY_START);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const interval = window.setInterval(tick, 16);
    return () => window.clearInterval(interval);
  }, []);

  if (now !== null && now >= BIRTHDAY_START) return <LaunchCountdown>{children}</LaunchCountdown>;

  const remaining = splitRemaining(BIRTHDAY_START - (now ?? BIRTHDAY_START));

  return (
    <main className="relative flex h-[100dvh] items-start justify-center overflow-y-auto bg-[#050403] px-3 py-[max(1rem,env(safe-area-inset-top))] text-center sm:px-5 md:items-center md:overflow-hidden md:py-0">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(211,157,70,.18),transparent_35%),radial-gradient(circle_at_12%_88%,rgba(91,25,29,.34),transparent_30%),linear-gradient(145deg,#040302,#17100a_55%,#030303)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-[linear-gradient(135deg,rgba(255,255,255,.06),transparent_55%)]" />
      <motion.div
        className="pointer-events-none absolute left-[8%] top-[14%] h-32 w-32 rounded-full border border-[#e6c67a]/15 md:h-56 md:w-56"
        animate={{ rotate: 360, scale: [1, 1.08, 1] }}
        transition={{ rotate: { duration: 24, repeat: Infinity, ease: "linear" }, scale: { duration: 5, repeat: Infinity } }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-[12%] right-[9%] h-20 w-20 rounded-full border border-[#e6c67a]/15 md:h-40 md:w-40"
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />

      <motion.section
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="relative z-10 my-auto w-full max-w-5xl rounded-[1.5rem] border border-[#e6c67a]/20 bg-black/20 px-4 py-5 shadow-[0_0_100px_rgba(0,0,0,.55)] backdrop-blur-sm sm:rounded-[2rem] sm:px-5 sm:py-6 md:px-12 md:py-14"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.48em] text-[#f2c867]">⚠ No spoilers</p>
        <h1 className="mt-3 font-serif text-2xl text-white sm:mt-4 sm:text-3xl md:mt-5 md:text-6xl">Curiosity is part of the experience.</h1>
        <p className="mt-2 text-xs tracking-wide text-white/55 sm:mt-4 sm:text-sm md:text-base">Please wait...</p>
        <button
          type="button"
          onClick={() => void enableSound()}
          className="mt-2 rounded-full border border-[#e6c67a]/40 bg-[#e6c67a]/10 px-4 py-1.5 text-[9px] uppercase tracking-[0.18em] text-[#f2c867] transition hover:bg-[#e6c67a]/20 sm:mt-3 sm:py-2 sm:text-[10px] md:mt-5"
        >
          {unlocked ? "✓ Ticking enabled" : "Tap to enable ticking"}
        </button>

        <div className="mx-auto my-3 h-px max-w-2xl bg-gradient-to-r from-transparent via-[#e6c67a]/70 to-transparent sm:my-5 md:my-9" />
        <div className="flex flex-wrap items-start justify-center gap-x-2 gap-y-3 sm:gap-x-3 sm:gap-y-4 md:gap-x-8 md:gap-y-8">
          <TimeUnit value={remaining.days} label="Days" />
          <TimeUnit value={remaining.hours} label="Hours" />
          <TimeUnit value={remaining.minutes} label="Minutes" />
          <TimeUnit value={remaining.seconds} label="Seconds" />
          <TimeUnit value={remaining.milliseconds} label="Milliseconds" digits={3} />
        </div>
        <div className="mx-auto mt-3 h-px max-w-2xl bg-gradient-to-r from-transparent via-[#e6c67a]/45 to-transparent sm:mt-5 md:mt-9" />
        <p className="mt-3 text-[11px] italic text-[#f1d99c]/70 sm:mt-4 sm:text-xs md:mt-6">Some surprises are worth waiting for. 🎬</p>
        <CountdownJukebox />
        <SRKQuiz now={now} unlockAt={QUIZ_START} />
      </motion.section>
    </main>
  );
}
