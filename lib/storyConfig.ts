import { StoryScene } from "@/types/story";

export const STORY_CONFIG = {
  introDuration: 3000,
  invitationDelay: 1000,
  projectorDelay: 800,
  memoryTransition: 700,
};

export const SCENE_TITLES: Record<StoryScene, string> = {
  [StoryScene.INTRO]: "Opening",
  [StoryScene.INVITATION]: "Invitation",
  [StoryScene.PROJECTOR]: "Projector",
  [StoryScene.MEMORIES]: "Memories",
  [StoryScene.LETTER]: "Letter",
  [StoryScene.CREDITS]: "Credits",
};