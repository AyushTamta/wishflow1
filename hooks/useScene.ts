"use client";

import { useCallback, useEffect } from "react";

import { eventBus } from "@/src/runtime/EventBus";
import { TimelineEvents } from "@/src/runtime/events";

interface UseSceneReturn {
  completeScene: () => void;
}

export function useScene(
  id: string,
  active: boolean
): UseSceneReturn {
  useEffect(() => {
    if (!active) return;

    eventBus.emit(TimelineEvents.SCENE_START, {
      id,
    });

    return () => {
      eventBus.emit(TimelineEvents.SCENE_END, {
        id,
      });
    };
  }, [id, active]);

  const completeScene = useCallback(() => {
    eventBus.emit(TimelineEvents.SCENE_END, {
      id,
    });
  }, [id]);

  return {
    completeScene,
  };
}