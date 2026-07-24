"use client";

import { useCallback, useMemo, useState } from "react";
import { STORY_SEQUENCE, StoryScene } from "@/types/story";

export function useStory() {
  const [scene, setScene] = useState<StoryScene>(StoryScene.INTRO);

  const index = useMemo(
    () => STORY_SEQUENCE.indexOf(scene),
    [scene]
  );

  const next = useCallback(() => {
    if (index >= STORY_SEQUENCE.length - 1) return;

    setScene(STORY_SEQUENCE[index + 1]);
  }, [index]);

  const previous = useCallback(() => {
    if (index <= 0) return;

    setScene(STORY_SEQUENCE[index - 1]);
  }, [index]);

  const goTo = useCallback((scene: StoryScene) => {
    setScene(scene);
  }, []);

  return {
    scene,
    next,
    previous,
    goTo,
    isFirst: index === 0,
    isLast: index === STORY_SEQUENCE.length - 1,
    progress: index / (STORY_SEQUENCE.length - 1),
  };
}