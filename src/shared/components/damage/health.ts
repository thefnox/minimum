import { component } from "@rbxts/matter";

export const Health = component<{ health: number }>("Health");
export type Health = ReturnType<typeof Health>;
