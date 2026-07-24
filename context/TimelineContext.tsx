"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

import type {
  RuntimeState,
} from "@/runtime/types";

const TimelineContext =
  createContext<{
    state: RuntimeState;
    setState: React.Dispatch<
      React.SetStateAction<RuntimeState>
    >;
  } | null>(null);

export function TimelineProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] =
    useState<RuntimeState>({
      scene: null,
      status: "idle",
      progress: 0,
    });

  return (
    <TimelineContext.Provider
      value={{
        state,
        setState,
      }}
    >
      {children}
    </TimelineContext.Provider>
  );
}

export function useTimelineContext() {
  const ctx = useContext(TimelineContext);

  if (!ctx) {
    throw new Error(
      "TimelineProvider missing."
    );
  }

  return ctx;
}