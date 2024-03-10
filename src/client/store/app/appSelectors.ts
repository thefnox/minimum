import { createSelector } from "@rbxts/reflex";

import { RootState } from "..";

export const selectAppLoaded = (state: RootState) => state.app.loaded;
export const selectIsAdmin = (state: RootState) => state.app.isAdmin;
export const selectHideUI = (state: RootState) => state.app.hideUI;
export const selectPlayerState = (state: RootState) => state.app.playerState;
