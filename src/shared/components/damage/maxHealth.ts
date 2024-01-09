import { component } from "@rbxts/matter";

export const MaxHealth = component<{ amount: number }>("MaxHealth");
export type MaxHealth = ReturnType<typeof MaxHealth>;
