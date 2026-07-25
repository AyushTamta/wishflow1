"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { hero } from "@/lib/content";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = 0.35;
  }, []);

  useEffect(() => {
    const startAudio = async () => {
      if (!audioRef.current || playing) return;

      try {
        await audioRef.current.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    };

    window.addEventListener("pointerdown", startAudio, {
      once: true,
    });
    window.addEventListener("keydown", startAudio, {
      once: true,
    });

    return () => {
      window.removeEventListener("pointerdown", startAudio);
      window.removeEventListener("keydown", startAudio);
    };
  }, [playing]);

  const toggle = async () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      try {
        await audioRef.current.play();
      } catch {}
    }

    setPlaying(!playing);
  };

  return (
    <>
      <audio ref={audioRef} loop src={hero.music} />

      <button
        onClick={toggle}
        aria-label={playing ? "Pause background music" : "Play background music"}
        className="fixed bottom-8 right-8 z-[999] flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-xl transition hover:scale-105 hover:border-[#E6C67A]/60"
      >
        {playing ? <Pause size={22} /> : <Play size={22} />}
      </button>
    </>
  );
}
