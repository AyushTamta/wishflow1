import type {
  ComponentType,
} from "react";

import type {
  SceneDefinition,
  SceneId,
} from "./scene";

export class SceneRegistry {
  private scenes = new Map<
    SceneId,
    SceneDefinition
  >();

  register(scene: SceneDefinition) {
    this.scenes.set(scene.id, scene);
  }

  get(id: SceneId) {
    return this.scenes.get(id);
  }

  getComponent(
    id: SceneId
  ): ComponentType<any> | null {
    return this.scenes.get(id)?.component ?? null;
  }

  getAll() {
    return [...this.scenes.values()];
  }

  has(id: SceneId) {
    return this.scenes.has(id);
  }

  clear() {
    this.scenes.clear();
  }
}

export const sceneRegistry =
  new SceneRegistry();