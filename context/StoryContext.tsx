"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";

import { STORY_SEQUENCE, StoryScene } from "@/types/story";

interface StoryContextType {
  scene: StoryScene;

  isTransitioning: boolean;

  next: () => void;
  previous: () => void;
  goTo: (scene: StoryScene) => void;
  reset: () => void;

  transitionToNext: () => Promise<void>;
  transitionToPrevious: () => Promise<void>;
}

const StoryContext = createContext<StoryContextType | null>(null);

const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

interface Props {
  children: ReactNode;
}

export function StoryProvider({ children }: Props) {
  const [scene, setScene] = useState(STORY_SEQUENCE[0]);

  const [isTransitioning, setIsTransitioning] =
    useState(false);

  const next = useCallback(() => {
    setScene((current) => {
      const index = STORY_SEQUENCE.indexOf(current);

      if (index >= STORY_SEQUENCE.length - 1) {
        return current;
      }

      return STORY_SEQUENCE[index + 1];
    });
  }, []);

  const previous = useCallback(() => {
    setScene((current) => {
      const index = STORY_SEQUENCE.indexOf(current);

      if (index <= 0) {
        return current;
      }

      return STORY_SEQUENCE[index - 1];
    });
  }, []);

  const goTo = useCallback((scene: StoryScene) => {
    setScene(scene);
  }, []);

  const reset = useCallback(() => {
    setScene(STORY_SEQUENCE[0]);
  }, []);

  const transitionToNext = useCallback(async () => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    // Play transition OUT
    await wait(300);

    next();

    // Play transition IN
    await wait(500);

    setIsTransitioning(false);
  }, [isTransitioning, next]);

  const transitionToPrevious = useCallback(async () => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    await wait(300);

    previous();

    await wait(500);

    setIsTransitioning(false);
  }, [isTransitioning, previous]);

  const value = useMemo(
    () => ({
      scene,

      isTransitioning,

      next,
      previous,
      goTo,
      reset,

      transitionToNext,
      transitionToPrevious,
    }),
    [
      scene,
      isTransitioning,
      next,
      previous,
      goTo,
      reset,
      transitionToNext,
      transitionToPrevious,
    ]
  );

  return (
    <StoryContext.Provider value={value}>
      {children}
    </StoryContext.Provider>
  );
}

export function useStoryContext() {
  const context = useContext(StoryContext);

  if (!context) {
    throw new Error(
      "useStoryContext must be used inside StoryProvider."
    );
  }

  return context;
}