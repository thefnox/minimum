import { component } from "@rbxts/matter";

export const HealthRegen = component<{ regenAmount: number; lastTick?: number }>("HealthRegen");
export type HealthRegen = ReturnType<typeof HealthRegen>;
