import { eventBus } from "./EventBus";
import { TimelineEvents } from "./events";
import { masterTimeline } from "./Timeline";
import { runtimeStore } from "./RuntimeStore";

class Director {
  private currentScene: string | null = null;

  start() {
    runtimeStore.setStatus("playing");

    masterTimeline.play();

    eventBus.emit(TimelineEvents.TIMELINE_PLAY);
  }

  pause() {
    runtimeStore.setStatus("paused");

    masterTimeline.pause();

    eventBus.emit(TimelineEvents.TIMELINE_PAUSE);
  }

  resume() {
    runtimeStore.setStatus("playing");

    masterTimeline.resume();

    eventBus.emit(TimelineEvents.TIMELINE_RESUME);
  }

  restart() {
    this.currentScene = null;

    runtimeStore.reset();

    masterTimeline.restart();

    runtimeStore.setStatus("playing");

    eventBus.emit(TimelineEvents.TIMELINE_PLAY);
  }

  startScene(id: string) {
    this.currentScene = id;

    runtimeStore.setScene(id);

    eventBus.emit(TimelineEvents.SCENE_START, {
      id,
    });
  }

  endScene(id: string) {
    if (this.currentScene !== id) return;

    eventBus.emit(TimelineEvents.SCENE_END, {
      id,
    });

    masterTimeline.resume();
  }

  startTransition(name: string) {
    eventBus.emit(TimelineEvents.TRANSITION_START, {
      name,
    });
  }

  endTransition(name: string) {
    eventBus.emit(TimelineEvents.TRANSITION_END, {
      name,
    });
  }

  getCurrentScene() {
    return this.currentScene;
  }
}

export const director = new Director();