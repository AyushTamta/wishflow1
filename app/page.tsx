"use client";

import { useState } from "react";

import Countdown from "@/components/theatre/Countdown";
import Curtains from "@/components/theatre/Curtains";
import FilmGrain from "@/components/theatre/FilmGrain";
import ProjectorBeam from "@/components/theatre/ProjectorBeam";

import MarineDriveHero from "@/components/hero/MarineDriveHero";
import MusicPlayer from "@/components/music/MusicPlayer";

import { MemorySection } from "@/components/memories";

export default function Home() {
  const [openCurtains, setOpenCurtains] = useState(false);

  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Theatre Intro */}
      <div className="relative h-screen overflow-hidden">
        <FilmGrain />

        <ProjectorBeam />

        <MarineDriveHero />

        {!openCurtains && (
          <Countdown onComplete={() => setOpenCurtains(true)} />
        )}

        <Curtains open={openCurtains} />

        <MusicPlayer />
      </div>

      {/* Story Begins */}
      <MemorySection />
    </main>
  );
}