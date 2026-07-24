"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2 } from "lucide-react";
import { hero } from "@/lib/content";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = 0.35;
  }, []);

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
        className="fixed bottom-8 right-8 z-[999] flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:scale-105 transition"
      >
        {playing ? <Pause size={22} /> : <Play size={22} />}
      </button>
    </>
  );
}