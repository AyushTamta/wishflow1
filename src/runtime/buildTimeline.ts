import { masterTimeline } from "./Timeline";
import { STORY_TIMELINE } from "@/components/story/timeline";

export function buildTimeline() {
  masterTimeline.clear();

  STORY_TIMELINE.forEach((scene) => {
    masterTimeline.add(scene);
  });
}