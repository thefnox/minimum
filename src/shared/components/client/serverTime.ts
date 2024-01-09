import { component } from "@rbxts/matter";

export const ServerTime = component<{ serverTime: number; lastSync?: number; latency?: number; offset?: number }>(
	"ServerTime",
);
export type ServerTime = ReturnType<typeof ServerTime>;
