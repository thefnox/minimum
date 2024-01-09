import { component } from "@rbxts/matter";

export const ShatterOnKill = component<{ gibsDuration: number }>("ShatterOnKill", { gibsDuration: 5 });
export type ShatterOnKill = ReturnType<typeof ShatterOnKill>;
