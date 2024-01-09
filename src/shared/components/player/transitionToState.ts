import { component } from "@rbxts/matter";
import { PlayerGameState } from "shared/constants/playerState";

const Workspace = game.GetService("Workspace");

export const TransitionToState = component<{
	state: PlayerGameState;
	created: number;
	time: number;
	nonSkippable?: boolean;
}>("TransitionToState", {
	state: PlayerGameState.Playing,
	created: Workspace.GetServerTimeNow(),
	time: 0,
});
export type TransitionToState = ReturnType<typeof TransitionToState>;
