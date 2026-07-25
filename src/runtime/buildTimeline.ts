import { masterTimeline } from "./Timeline";
import { STORY_TIMELINE } from "@/components/story/timeline";

export function buildTimeline() {
  masterTimeline.clear();

  let position = 0;

  STORY_TIMELINE.forEach((scene) => {
    masterTimeline.addLabel(scene.label);
    masterTimeline.add(() => undefined, position);

    position += scene.duration;
  });
}
