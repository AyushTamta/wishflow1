"use client";

import { useState } from "react";
import {
  Countdown,
  Curtains,
  FilmGrain,
  ProjectorBeam,
} from "@/components/theatre";

import { MarineDriveHero } from "@/components/hero";

export default function Home() {
  const [openCurtains, setOpenCurtains] = useState(false);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black">
      {/* Hero (behind curtains) */}
      <MarineDriveHero />

      {/* Cinema Effects */}
      <ProjectorBeam />
      <FilmGrain />

      {/* Countdown */}
      {!openCurtains && (
        <Countdown onComplete={() => setOpenCurtains(true)} />
      )}

      {/* Curtains */}
      <Curtains open={openCurtains} />
    </main>
  );
}