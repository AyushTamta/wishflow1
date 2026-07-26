"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useQuizAudio() {
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const dialogueRef = useRef<HTMLAudioElement | null>(null);
  const [dialoguePlaying, setDialoguePlaying] = useState(false);

  const fadeMusic = useCallback((target: number) => {
    const music = musicRef.current;
    if (!music) return;
    const start = music.volume;
    const startedAt = performance.now();
    const timer = window.setInterval(() => {
      const progress = Math.min(1, (performance.now() - startedAt) / 2000);
      music.volume = start + (target - start) * progress;
      if (progress === 1) window.clearInterval(timer);
    }, 40);
  }, []);

  const resumeMusic = useCallback(() => {
    const music = musicRef.current;
    if (!music) return;
    music.volume = 0;
    void music.play().then(() => fadeMusic(0.32));
  }, [fadeMusic]);

  const startMusic = resumeMusic;

  const playDialogue = useCallback((source: string) => {
    const music = musicRef.current;
    if (music) music.pause();
    dialogueRef.current?.pause();
    const dialogue = new Audio(source);
    dialogueRef.current = dialogue;
    dialogue.onended = () => {
      setDialoguePlaying(false);
      resumeMusic();
    };
    setDialoguePlaying(true);
    void dialogue.play().catch(() => {
      setDialoguePlaying(false);
      resumeMusic();
    });
  }, [resumeMusic]);

  const stopAll = useCallback(() => {
    dialogueRef.current?.pause();
    if (musicRef.current) fadeMusic(0);
  }, [fadeMusic]);

  useEffect(() => {
    const music = new Audio("/audio/dhoom-taana.mp3");
    music.loop = true;
    music.preload = "auto";
    musicRef.current = music;
    return () => {
      music.pause();
      dialogueRef.current?.pause();
    };
  }, []);

  return { startMusic, playDialogue, dialoguePlaying, stopAll };
}
