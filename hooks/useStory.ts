"use client";

import { useStoryContext } from "@/context/StoryContext";

export function useStory() {
  return useStoryContext();
}