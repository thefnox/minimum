import { combineProducers, InferState } from "@rbxts/reflex";
import { useProducer, UseProducerHook } from "@rbxts/react-reflex";

import { appSlice } from "./app";
import { playerSlice } from "./player";

export type RootStore = typeof store;

export type RootState = InferState<RootStore>;

export function createStore() {
	const store = combineProducers({
		app: appSlice,
		player: playerSlice,
	});

	return store;
}

export const store = createStore();

export const useStore: UseProducerHook<RootStore> = useProducer;
