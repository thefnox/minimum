import { component } from "@rbxts/matter";

export const PlayerModel = component<{
	character: Model;
	humanoid: Humanoid;
}>("PlayerModel");
export type PlayerModel = ReturnType<typeof PlayerModel>;
