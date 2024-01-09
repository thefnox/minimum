import { component } from "@rbxts/matter";

/**
 * Syncs an animation track
 */
export const TrackSync = component<{ serverTime: number; trackTime: number; stopped?: boolean }>("TrackSync");
export type TrackSync = ReturnType<typeof TrackSync>;
