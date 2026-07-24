"use client";

import { useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { StoryScene } from "@/types/story";
import { useStory } from "@/hooks/useStory";

import TransitionLayer from "@/components/effects/TransitionLayer";

import MarineDriveHero from "@/components/MarineDriveHero";
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

    // Fade OUT
    await wait(350);

    next();

    // Fade IN
    await wait(450);

    setIsTransitioning(false);
  }, [
    isTransitioning,
    next,
    setIsTransitioning,
  ]);

  const renderScene = () => {
    switch (scene) {
      case StoryScene.INVITATION:
        return (
          <InvitationCard
            visible
            onBegin={transitionToNext}
          />
        );

      case StoryScene.PROJECTOR:
        return (
          <ProjectorScene
            active
            onComplete={transitionToNext}
          />
        );

      case StoryScene.MEMORIES:
        return (
          <MemoryReel
            active
            onComplete={transitionToNext}
          />
        );

      case StoryScene.LETTER:
        return (
          <LetterScene
            active
            onComplete={transitionToNext}
          />
        );

      case StoryScene.CREDITS:
        return (
          <CreditsScene
            active
            onReplay={reset}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {/* Persistent Background */}
      <AnimatePresence mode="wait">
        {(scene === StoryScene.INTRO ||
          scene === StoryScene.INVITATION) && (
          <motion.div
            key="marine-drive"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1,
            }}
          >
            <MarineDriveHero />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Transition */}
      <TransitionLayer
        isVisible={isTransitioning}
      />

      {/* Current Scene */}
      <AnimatePresence mode="wait">
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
          {renderScene()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}