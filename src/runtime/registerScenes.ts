import { sceneRegistry } from "./SceneRegistry";

import InvitationCard from "@/components/invitation/InvitationCard";
import ProjectorScene from "@/components/projector/ProjectorScene";
import MemoryReel from "@/components/memories/MemoryReel";
import ConstellationScene from "@/components/constellation/ConstellationScene";
import LetterScene from "@/components/letter/LetterScene";
import CreditsScene from "@/components/credits/CreditsScene";

export function registerScenes() {
  sceneRegistry.register({
    id: "invitation",
    component: InvitationCard,
  });

  sceneRegistry.register({
    id: "projector",
    component: ProjectorScene,
  });

  sceneRegistry.register({
    id: "memoryReel",
    component: MemoryReel,
  });

  sceneRegistry.register({
    id: "constellation",
    component: ConstellationScene,
  });

  sceneRegistry.register({
    id: "letter",
    component: LetterScene,
  });

  sceneRegistry.register({
    id: "credits",
    component: CreditsScene,
  });
}