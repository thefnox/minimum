import { AnyEntity, component } from "@rbxts/matter";

/**
 * A way to keep track of entities based on their Workspace model.
 */
export const BoundEntities = component<{ models: Model[]; entities: AnyEntity[] }>("BoundEntities", {
	models: [],
	entities: [],
});
export type BoundEntities = ReturnType<typeof BoundEntities>;
