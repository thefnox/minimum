import { AnyEntity, component } from "@rbxts/matter";

/**
 * A way to track and automatically dispose of parts that are meant to exist for a short while.
 */
export const Gibs = component<{ parts: BasePart[]; spawnTime: number; existTime: number; fadeTime: number }>("Gibs");
export type Gibs = ReturnType<typeof Gibs>;
