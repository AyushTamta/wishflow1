"use client";

import { AnimatePresence, motion } from "framer-motion";

import { StoryScene } from "@/types/story";
import { useStory } from "@/hooks/useStory";

import MarineDriveHero from "@/components/MarineDriveHero";
import InvitationCard from "@/components/invitation/InvitationCard";
import { ProjectorScene } from "@/components/projector";
import { MemoryReel } from "@/components/memories";
import LetterScene from "@/components/letter/LetterScene";
import CreditsScene from "@/components/credits/CreditsScene";

export default function StoryDirector() {
  const { scene, next } = useStory();

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {/* Persistent Marine Drive Background */}
      <AnimatePresence mode="wait">
        {(scene === StoryScene.INTRO ||
          scene === StoryScene.INVITATION) && (
          <motion.div
            key="marine-drive"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <MarineDriveHero />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Story Scene */}
      <AnimatePresence mode="wait">
        {scene === StoryScene.INVITATION && (
          <motion.div
            key="invitation"
            className="absolute inset-0 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.8,
              },
            }}
          >
            <InvitationCard
              visible
              onBegin={next}
            />
          </motion.div>
        )}

        {scene === StoryScene.PROJECTOR && (
          <motion.div
            key="projector"
            className="absolute inset-0 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <ProjectorScene
              active
              onComplete={next}
            />
          </motion.div>
        )}

        {scene === StoryScene.MEMORIES && (
          <motion.div
            key="memories"
            className="absolute inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MemoryReel
              active
              onComplete={next}
            />
          </motion.div>
        )}

        {scene === StoryScene.LETTER && (
          <motion.div
            key="letter"
            className="absolute inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LetterScene
              active
              onComplete={next}
            />
          </motion.div>
        )}

        {scene === StoryScene.CREDITS && (
          <motion.div
            key="credits"
            className="absolute inset-0 z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <CreditsScene active />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}