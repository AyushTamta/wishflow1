import { sceneRegistry } from "./SceneRegistry";

import InvitationScene from "@/components/scenes/InvitationScene";
import ProjectorScene from "@/components/scenes/ProjectorScene";
import MemoryReel from "@/components/scenes/MemoryReel";
import ConstellationScene from "@/components/constellation/ConstellationScene";
import LetterScene from "@/components/scenes/LetterScene";
import CreditsScene from "@/components/scenes/CreditsScene";

export function registerScenes() {
  sceneRegistry.register({
    id: "invitation",
    component: InvitationScene,
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