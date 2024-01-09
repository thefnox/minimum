import { component } from "@rbxts/matter";

/**
 * The client component is used to identify the player entity.
 */
export const Client = component<{
	player: Player;
	loaded?: boolean;
}>("Client");
export type Client = ReturnType<typeof Client>;
