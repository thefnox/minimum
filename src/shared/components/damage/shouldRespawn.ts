import { component } from "@rbxts/matter";

export const ShouldRespawn = component<{
	destroyed: boolean;
	respawnExclusionRadius?: number;
	destroyTime?: number;
	respawnTime?: number;
	respawnFrame?: CFrame;
}>("ShouldRespawn", { destroyed: false, respawnTime: 30 });
export type ShouldRespawn = ReturnType<typeof ShouldRespawn>;
