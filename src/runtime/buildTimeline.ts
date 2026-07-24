import { masterTimeline } from "./Timeline";
import { STORY_TIMELINE } from "@/story/timeline";
import { director } from "./Director";
export function buildTimeline() {
  masterTimeline.clear();

  STORY_TIMELINE.forEach((scene) => {
    masterTimeline.addLabel(scene.label);

    masterTimeline.add(() => {
        director.startScene(scene.label);
    });

    masterTimeline.instance.to(
      {},
      {
        duration: scene.duration,
      }
    );
  });
}