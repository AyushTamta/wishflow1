import { registerScenes } from "./registerScenes";

let initialized = false;

export function initializeRuntime() {
  if (initialized) return;

  registerScenes();

  initialized = true;
}