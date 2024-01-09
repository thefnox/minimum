import { component } from "@rbxts/matter";

/**
 * Modify the CFrame of an entity
 */
export const Transform = component<{ cf: CFrame; doNotReconcile?: boolean }>("Transform");
export type Transform = ReturnType<typeof Transform>;
