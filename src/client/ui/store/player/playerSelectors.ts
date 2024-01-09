import { createSelector } from "@rbxts/reflex";

import { RootState } from "..";

export const selectHealth = (state: RootState) => state.player.health;
