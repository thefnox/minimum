import { AnyEntity, component } from "@rbxts/matter";

/**
 * Keeping track of models that have been touched by an entity, and their corresponding entities.
 */
export const Touched = component<{ entities: AnyEntity[]; parts: BasePart[] }>("Touched", { entities: [], parts: [] });
export type Touched = ReturnType<typeof Touched>;
