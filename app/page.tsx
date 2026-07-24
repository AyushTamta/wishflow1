"use client";

import { useState } from "react";

import Countdown from "@/components/theatre/Countdown";
import Curtains from "@/components/theatre/Curtains";
import FilmGrain from "@/components/theatre/FilmGrain";
import ProjectorBeam from "@/components/theatre/ProjectorBeam";

import MarineDriveHero from "@/components/hero/MarineDriveHero";
import MusicPlayer from "@/components/music/MusicPlayer";

export default function Home() {
  const [openCurtains, setOpenCurtains] = useState(false);

  return (
    <main className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Film Grain */}
      <FilmGrain />

      {/* Projector Beam */}
      <ProjectorBeam />

      {/* Hero Scene */}
      <MarineDriveHero />

      {/* Theatre Countdown */}
      {!openCurtains && (
        <Countdown onComplete={() => setOpenCurtains(true)} />
      )}

      {/* Opening Curtains */}
      <Curtains open={openCurtains} />

      {/* Background Music */}
      <MusicPlayer />
    </main>
  );
}