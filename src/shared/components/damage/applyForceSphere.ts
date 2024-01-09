import { component } from "@rbxts/matter";
import { DamageType } from "shared/constants/data";

export const ApplyForceSphere = component<{
	position: Vector3;
	radius: number;
	affectsPlayers: boolean;
	force: number;
}>("ApplyForceSphere");
export type ApplyForceSphere = ReturnType<typeof ApplyForceSphere>;
