import { component } from "@rbxts/matter";

/**
 * A reference to the model this entity refers to
 */
export const Renderable = component<{ model: Model; doNotDestroy?: boolean }>("Renderable");
export type Renderable = ReturnType<typeof Renderable>;
