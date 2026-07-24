"use client";

import { useState } from "react";
import { StoryScene, STORY_SEQUENCE } from "@/types/story";

export function useStory() {
  const [scene, setScene] = useState(StoryScene.INVITATION);

  const next = () => {
    const currentIndex = STORY_SEQUENCE.indexOf(scene);

    if (currentIndex < STORY_SEQUENCE.length - 1) {
      setScene(STORY_SEQUENCE[currentIndex + 1]);
    }
  };

  const previous = () => {
    const currentIndex = STORY_SEQUENCE.indexOf(scene);

    if (currentIndex > 0) {
      setScene(STORY_SEQUENCE[currentIndex - 1]);
    }
  };

  return {
    scene,
    next,
    previous,
  };
}