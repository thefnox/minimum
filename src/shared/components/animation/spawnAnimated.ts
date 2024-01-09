import { component } from "@rbxts/matter";

/**
 * Attaches an animator to the entity
 */
export const SpawnAnimated = component<{ animation?: string; animationSpeed?: number }>("SpawnAnimated", {
	animationSpeed: 1,
});
export type SpawnAnimated = ReturnType<typeof SpawnAnimated>;
