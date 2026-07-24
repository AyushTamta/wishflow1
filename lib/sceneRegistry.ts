import { StoryScene } from "@/types/story";

import InvitationCard from "@/components/invitation/InvitationCard";
import { ProjectorScene } from "@/components/projector";
import { MemoryReel } from "@/components/memories";
import LetterScene from "@/components/letter/LetterScene";
import CreditsScene from "@/components/credits/CreditsScene";

export const SceneRegistry = {
  [StoryScene.INVITATION]: InvitationCard,
  [StoryScene.PROJECTOR]: ProjectorScene,
  [StoryScene.MEMORIES]: MemoryReel,
  [StoryScene.LETTER]: LetterScene,
  [StoryScene.CREDITS]: CreditsScene,
};