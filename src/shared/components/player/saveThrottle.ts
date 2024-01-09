import { component } from "@rbxts/matter";

export const SaveThrottle = component<{ time: number }>("SaveThrottle", { time: 10 });
export type SaveThrottle = ReturnType<typeof SaveThrottle>;
