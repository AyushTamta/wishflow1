"use client";

import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const tracks = [
  { title: "Ruk Ja O Dil Deewane", subtitle: "Dilwale Dulhania Le Jayenge", src: "/audio/ddlj-jukebox.mp3" },
  { title: "Mere Mehboob Mere Sanam", subtitle: "Duplicate", src: "/audio/mere-mehboob-jukebox.mp3" },
  { title: "Main Koi Aisa Geet Gaoon", subtitle: "Yes Boss", src: "/audio/yes-boss-jukebox.mp3" },
  { title: "Deewangi Deewangi", subtitle: "Om Shanti Om", src: "/audio/deewangi-jukebox.mp3" },
];

export default function CountdownJukebox({ className = "" }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(tracks[index].src);
    audio.preload = "metadata";
    audio.onended = () => setIndex((current) => (current + 1) % tracks.length);
    audioRef.current = audio;
    return () => audio.pause();
  }, [index]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !playing) return;
    void audio.play().catch(() => setPlaying(false));
  }, [index, playing]);

  const changeTrack = (direction: number) => {
    audioRef.current?.pause();
    setIndex((current) => (current + direction + tracks.length) % tracks.length);
  };

  const track = tracks[index];

  return (
    <section className={`mt-4 flex min-h-[12rem] w-full max-w-xl flex-col rounded-2xl border border-[#e6c67a]/30 bg-[#120b06]/80 p-3 text-left shadow-[0_0_32px_rgba(230,198,122,.1)] sm:mt-5 sm:p-4 ${className}`}>
      <div className="flex items-center gap-3">
        <div className="relative flex h-14 w-20 shrink-0 items-center justify-center rounded-md border border-[#e6c67a]/55 bg-[linear-gradient(135deg,#9a4d35,#f0b95f_50%,#75301f)] shadow-inner sm:h-16 sm:w-24">
          <div className="absolute inset-x-2 top-2 h-8 rounded-sm bg-[#f2d89d]/90" />
          <div className="relative mt-1 flex gap-3"><span className="h-5 w-5 rounded-full border-2 border-[#21140e] bg-[#e8bc68]" /><span className="h-5 w-5 rounded-full border-2 border-[#21140e] bg-[#e8bc68]" /></div>
          <p className="absolute bottom-1 text-[6px] font-bold uppercase tracking-[.18em] text-[#25150e]">Ambay FM</p>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[8px] uppercase tracking-[.24em] text-[#e6c67a]/70">Countdown mixtape · {index + 1}/4</p>
          <p className="mt-1 truncate text-sm font-medium text-[#fff0c8] sm:text-base">{track.title}</p>
          <p className="truncate text-[10px] text-white/50">{track.subtitle}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1 text-[#f2d89d]">
          <button type="button" onClick={() => changeTrack(-1)} aria-label="Previous song" className="rounded-full p-2 hover:bg-white/10"><SkipBack size={16} /></button>
          <button type="button" onClick={() => setPlaying((current) => !current)} aria-label={playing ? "Pause playlist" : "Play playlist"} className="rounded-full border border-[#e6c67a]/50 bg-[#e6c67a]/15 p-2.5"><>{playing ? <Pause size={17} /> : <Play size={17} />}</></button>
          <button type="button" onClick={() => changeTrack(1)} aria-label="Next song" className="rounded-full p-2 hover:bg-white/10"><SkipForward size={16} /></button>
        </div>
      </div>
      <div className="mt-auto border-t border-[#e6c67a]/15 pt-3">
        <div className="flex items-center justify-between text-[8px] uppercase tracking-[0.2em] text-[#e6c67a]/60">
          <span>Side A · Ambay&apos;s mixtape</span>
          <span>{playing ? "● Now spinning" : "○ Ready to play"}</span>
        </div>
        <div className="mt-2 flex gap-1.5" aria-hidden="true">
          {tracks.map((item, itemIndex) => (
            <span key={item.src} className={`h-1.5 flex-1 rounded-full ${itemIndex === index ? "bg-[#f2c867] shadow-[0_0_10px_rgba(242,200,103,.75)]" : "bg-[#e6c67a]/20"}`} />
          ))}
        </div>
        <p className="mt-2 text-[10px] italic text-white/40">Four songs. One very cinematic wait.</p>
      </div>
    </section>
  );
}
