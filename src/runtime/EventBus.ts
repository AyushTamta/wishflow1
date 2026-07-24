export type EventHandler<T = unknown> = (payload: T) => void;

export class EventBus {
  private listeners = new Map<string, Set<EventHandler>>();

  on<T = unknown>(event: string, handler: EventHandler<T>) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }

    this.listeners.get(event)!.add(handler as EventHandler);

    return () => this.off(event, handler);
  }

  off<T = unknown>(event: string, handler: EventHandler<T>) {
    this.listeners.get(event)?.delete(handler as EventHandler);
  }

  emit<T = unknown>(event: string, payload?: T) {
    this.listeners
      .get(event)
      ?.forEach((handler) => handler(payload));
  }

  clear() {
    this.listeners.clear();
  }
}

export const eventBus = new EventBus();