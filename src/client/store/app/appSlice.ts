import { createProducer } from "@rbxts/reflex";
import { PlayerGameState } from "shared/constants/playerState";
export interface AppState {
	isAdmin: boolean;
	loaded: boolean;
	hideUI?: boolean;
	playerState: PlayerGameState;
	previousPlayerState: PlayerGameState;
	entityId: number;
}

const initialState: AppState = {
	isAdmin: false,
	hideUI: false,
	loaded: false,
	playerState: PlayerGameState.Disconnected,
	previousPlayerState: PlayerGameState.Disconnected,
	entityId: -1,
};

export const appSlice = createProducer(initialState, {
	setPlayerState: (state, playerState: PlayerGameState) => ({
		...state,
		playerState,
		previousPlayerState: state.playerState,
	}),
	setAppLoaded: (state, loaded: boolean) => ({
		...state,
		loaded,
	}),
	setEntityId: (state, entityId: number) => ({
		...state,
		entityId,
	}),
	setIsAdmin: (state, isAdmin: boolean) => ({
		...state,
		isAdmin,
	}),
	setHideUI: (state, hideUI: boolean) => ({
		...state,
		hideUI,
	}),
});
