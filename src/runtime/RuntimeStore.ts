type RuntimeStatus =
  | "idle"
  | "playing"
  | "paused"
  | "finished";

interface RuntimeState {
  currentScene: string | null;
  status: RuntimeStatus;
}

type Listener = (state: RuntimeState) => void;

class RuntimeStore {
  private state: RuntimeState = {
    currentScene: null,
    status: "idle",
  };

  private listeners = new Set<Listener>();

  getState(): RuntimeState {
    return this.state;
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);

    listener(this.state);

    return () => {
      this.listeners.delete(listener);
    };
  }

  private emit() {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }

  setScene(scene: string | null) {
    if (this.state.currentScene === scene) return;

    this.state = {
      ...this.state,
      currentScene: scene,
    };

    this.emit();
  }

  setStatus(status: RuntimeStatus) {
    if (this.state.status === status) return;

    this.state = {
      ...this.state,
      status,
    };

    this.emit();
  }

  reset() {
    this.state = {
      currentScene: null,
      status: "idle",
    };

    this.emit();
  }
}

export const runtimeStore = new RuntimeStore();

export type { RuntimeStatus, RuntimeState };