"use client";

import { useEffect, useState } from "react";

import {
  runtimeStore,
  type RuntimeState,
} from "@/src/runtime/RuntimeStore";

export function useRuntime() {
  const [state, setState] = useState<RuntimeState>(
    runtimeStore.getState()
  );

  useEffect(() => {
    return runtimeStore.subscribe(setState);
  }, []);

  return state;
}