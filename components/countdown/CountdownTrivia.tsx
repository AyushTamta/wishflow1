"use client";

import { useState } from "react";

export default function CountdownTrivia() {
  const [revealed, setRevealed] = useState(false);

  return (
    <section className="rounded-2xl border border-[#e6c67a]/30 bg-[#120b06]/75 px-5 py-4 text-center shadow-[0_0_32px_rgba(230,198,122,.1)] md:col-span-2">
      <p className="text-[9px] uppercase tracking-[0.3em] text-[#e6c67a]/75">🎬 Cinephile intermission</p>
      <h2 className="mt-2 font-serif text-xl text-[#fff0c8]">A tiny Bollywood trivia break</h2>
      <p className="mt-2 text-sm text-white/70">In which film did Shah Rukh Khan play both Om Prakash Makhija and Om Kapoor?</p>
      {revealed ? (
        <p className="mt-3 font-serif text-lg text-[#f2c867]">Om Shanti Om ✨</p>
      ) : (
        <button type="button" onClick={() => setRevealed(true)} className="mt-3 rounded-full border border-[#e6c67a]/45 bg-[#e6c67a]/10 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-[#fff0c8] transition hover:bg-[#e6c67a]/20">
          Reveal answer
        </button>
      )}
    </section>
  );
}
