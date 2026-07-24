import { eventBus } from "./EventBus";
import { TimelineEvents } from "./events";

class Director {
  startScene(id: string) {
    eventBus.emit(TimelineEvents.SCENE_START, {
      id,
    });
  }

  endScene(id: string) {
    eventBus.emit(TimelineEvents.SCENE_END, {
      id,
    });
  }

  startTransition(name: string) {
    eventBus.emit(
      TimelineEvents.TRANSITION_START,
      {
        name,
      }
    );
  }

  endTransition(name: string) {
    eventBus.emit(
      TimelineEvents.TRANSITION_END,
      {
        name,
      }
    );
  }
}

export const director = new Director();