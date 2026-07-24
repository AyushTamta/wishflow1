"use client";

import { useEffect, useState } from "react";
import {
  runtimeStore,
  type RuntimeState,
} from "./RuntimeStore";

export function useRuntime() {
  const [state, setState] = useState(
    runtimeStore.getState()
  );

  useEffect(() => {
    return runtimeStore.subscribe(setState);
  }, []);

  return state;
}