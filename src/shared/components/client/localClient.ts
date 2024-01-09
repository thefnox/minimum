import { component } from "@rbxts/matter";

export const LocalClient = component<{
	player: Player;
}>("LocalClient");
export type LocalClient = ReturnType<typeof LocalClient>;
