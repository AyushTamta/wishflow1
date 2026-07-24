"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { STORY_SEQUENCE, StoryScene } from "@/types/story";

interface StoryContextType {
  scene: StoryScene;

  isTransitioning: boolean;
  setIsTransitioning: React.Dispatch<React.SetStateAction<boolean>>;

  next: () => void;
  previous: () => void;
  goTo: (scene: StoryScene) => void;
  reset: () => void;
}

const StoryContext = createContext<StoryContextType | null>(null);

interface StoryProviderProps {
  children: ReactNode;
}

export function StoryProvider({
  children,
}: StoryProviderProps) {
  const [scene, setScene] = useState<StoryScene>(
    STORY_SEQUENCE[0]
  );

  const [isTransitioning, setIsTransitioning] =
    useState(false);

  useEffect(() => {
    console.log("Scene changed:", scene);
  }, [scene]);

  const next = useCallback(() => {
    setScene((current) => {
      const index = STORY_SEQUENCE.indexOf(current);

      console.log("Current:", current);
      console.log("Index:", index);

      if (index >= STORY_SEQUENCE.length - 1) {
        console.log("Already at last scene");
        return current;
      }

      const nextScene = STORY_SEQUENCE[index + 1];

      console.log("Next scene:", nextScene);

      return nextScene;
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
    setIsTransitioning(false);
  }, []);

  const value = useMemo(
    () => ({
      scene,
      isTransitioning,
      setIsTransitioning,
      next,
      previous,
      goTo,
      reset,
    }),
    [
      scene,
      isTransitioning,
      next,
      previous,
      goTo,
      reset,
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
      "useStoryContext must be used within StoryProvider."
    );
  }

  return context;
}