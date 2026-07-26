"use client";

import { StoryDirector } from "@/components/story";
import MusicPlayer from "@/components/music/MusicPlayer";
import { BirthdayGate } from "@/components/countdown";

export default function Home() {
  return (
    <BirthdayGate>
      <main className="relative h-[100dvh] overflow-hidden bg-black">
        <StoryDirector />
        <MusicPlayer />
      </main>
    </BirthdayGate>
  );
}
