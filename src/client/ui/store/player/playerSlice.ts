import { createProducer } from "@rbxts/reflex";

export interface SwimState {
	health: number;
}

const initialState: SwimState = {
	health: 100,
};

export const playerSlice = createProducer(initialState, {
	setHealth: (state, health: number) => ({
		...state,
		health,
	}),
});
