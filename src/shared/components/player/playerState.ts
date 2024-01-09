import { component } from "@rbxts/matter";
import { PlayerGameState } from "shared/constants/playerState";

export const PlayerState = component<{
	state: PlayerGameState;
}>("PlayerState");
export type PlayerState = ReturnType<typeof PlayerState>;
