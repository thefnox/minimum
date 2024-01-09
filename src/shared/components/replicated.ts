import { ComponentCtor } from "@rbxts/matter/lib/component";
import { Client, TrackSync, Health, Gibs, ReceiveForce, DamageResistance } from "shared/components";

// Components that should automatically be replicated to the player
export const REPLICATED_COMPONENTS = new Set<ComponentCtor>([Client, Health, Gibs, TrackSync]);
// Components that should automatically be replicated to the player they are assigned to
export const REPLICATED_PLAYER_ONLY = new Set<ComponentCtor>([DamageResistance, ReceiveForce, Health]);
