"use client";

import { AnimatePresence, motion } from "framer-motion";

import { StoryScene } from "@/types/story";
import { useStory } from "@/hooks/useStory";

import MarineDriveHero from "@/components/MarineDriveHero";
import InvitationCard from "@/components/invitation/InvitationCard";
import { ProjectorScene } from "@/components/projector";

// Temporary placeholders
function Placeholder({ title }: { title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-40 flex items-center justify-center bg-black"
    >
      <h1 className="text-5xl font-light tracking-[0.25em] text-white">
        {title}
      </h1>
    </motion.div>
  );
}

export default function StoryDirector() {
  const { scene, next } = useStory();

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background Layer */}
      <AnimatePresence mode="wait">
        {(scene === StoryScene.INTRO ||
          scene === StoryScene.INVITATION) && (
          <motion.div
            key="marine-drive"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.2,
            }}
            className="absolute inset-0"
          >
            <MarineDriveHero />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Story Layer */}
      <AnimatePresence mode="wait">
        {scene === StoryScene.INVITATION && (
          <motion.div
            key="invitation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.8,
              },
            }}
            className="absolute inset-0 z-20"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1,
            }}
            className="absolute inset-0 z-30"
          >
            <ProjectorScene />
          </motion.div>
        )}

        {scene === StoryScene.MEMORIES && (
          <Placeholder title="MEMORIES" />
        )}

        {scene === StoryScene.LETTER && (
          <Placeholder title="LETTER" />
        )}

        {scene === StoryScene.CREDITS && (
          <Placeholder title="THANK YOU" />
        )}
      </AnimatePresence>
    </div>
  );
}