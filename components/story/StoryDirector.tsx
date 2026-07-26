"use client";

import { useCallback } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { StoryScene } from "@/types/story";
import { useStory } from "@/hooks/useStory";

import TransitionLayer from "@/components/effects/TransitionLayer";

import MarineDriveHero from "@/components/hero/MarineDriveHero";
import InvitationCard from "@/components/invitation/InvitationCard";
import { ProjectorScene } from "@/components/projector";
import { MemoryReel } from "@/components/memories";
import LetterScene from "@/components/letter/LetterScene";
import CreditsScene from "@/components/credits/CreditsScene";

const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export default function StoryDirector() {
  const {
    scene,
    next,
    reset,
    isTransitioning,
    setIsTransitioning,
  } = useStory();

  const transitionToNext = useCallback(async () => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    await wait(350);

    next();

    await wait(450);

    setIsTransitioning(false);
  }, [
    isTransitioning,
    next,
    setIsTransitioning,
  ]);

  const sceneMap: Partial<Record<StoryScene, ReactNode>> = {
    [StoryScene.INVITATION]: (
      <InvitationCard
        visible
        onBegin={transitionToNext}
      />
    ),

    [StoryScene.PROJECTOR]: (
      <ProjectorScene
        active
        onComplete={transitionToNext}
      />
    ),

    [StoryScene.MEMORIES]: (
      <MemoryReel
        active
        onComplete={transitionToNext}
      />
    ),

    [StoryScene.LETTER]: (
      <LetterScene
        active
        onComplete={transitionToNext}
      />
    ),

    [StoryScene.CREDITS]: (
      <CreditsScene
        active
        onReplay={reset}
      />
    ),
  };

  return (
    <div className="relative h-[100dvh] w-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {scene === StoryScene.INTRO && (
          <motion.div
            key="marine-drive"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <MarineDriveHero onComplete={transitionToNext} />
          </motion.div>
        )}
      </AnimatePresence>

      <TransitionLayer
        isVisible={isTransitioning}
      />

      <AnimatePresence mode="wait">
        {scene !== StoryScene.INTRO && (
          <motion.div
            key={scene}
            className="absolute inset-0"
            initial={{
              opacity: 0,
              scale: 0.995,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 1.005,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            {sceneMap[scene] ?? null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
