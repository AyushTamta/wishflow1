export const TimelineEvents = {
  SCENE_START: "scene:start",
  SCENE_END: "scene:end",

  TRANSITION_START: "transition:start",
  TRANSITION_END: "transition:end",

  TIMELINE_PLAY: "timeline:play",
  TIMELINE_PAUSE: "timeline:pause",
  TIMELINE_RESUME: "timeline:resume",
  TIMELINE_COMPLETE: "timeline:complete",
} as const;