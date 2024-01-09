import { component } from "@rbxts/matter";

/**
 * Attaches an animator to the entity, that is synced to all clients
 */
export const SpawnAnimatedServerside = component<{ animation?: string; animationSpeed?: number }>(
	"SpawnAnimatedServerside",
	{
		animationSpeed: 1,
	},
);
export type SpawnAnimatedServerside = ReturnType<typeof SpawnAnimatedServerside>;
