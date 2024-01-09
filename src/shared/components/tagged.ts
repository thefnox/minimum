import { ShatterOnKill, Breakable, ShouldRespawn, DamageResistance } from "shared/components";

// Models with CollectionService tags that match these components will automatically be added to the world
export const TAGGED_COMPONENTS = new Set([ShatterOnKill, Breakable, ShouldRespawn, DamageResistance]);
