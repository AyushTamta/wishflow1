import { registerScenes } from "./registerScenes";
import { buildTimeline } from "./buildTimeline";
import { director } from "./Director";

let initialized = false;

export function initializeRuntime() {
  if (initialized) return;

  registerScenes();
  buildTimeline();

  initialized = true;
}

export {
  director,
};