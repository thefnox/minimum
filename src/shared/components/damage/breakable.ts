import { component } from "@rbxts/matter";

export const Breakable = component<{
	health: number;
}>("Breakable", { health: 50 });
export type Breakable = ReturnType<typeof Breakable>;
