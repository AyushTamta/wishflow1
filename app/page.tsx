"use client";

import { StoryDirector } from "@/components/story";
import MusicPlayer from "@/components/music/MusicPlayer";

export default function Home() {
  return (
    <main className="relative h-screen overflow-hidden bg-black">
      <StoryDirector />
      <MusicPlayer />
    </main>
  );
}
