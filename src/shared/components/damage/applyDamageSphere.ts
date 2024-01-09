import { component } from "@rbxts/matter";
import { DamageType } from "shared/constants/data";

export const ApplyDamageSphere = component<{
	position: Vector3;
	radius: number;
	affectsPlayers: boolean;
	damage: number;
	damageType: DamageType;
}>("ApplyDamageSphere");
export type ApplyDamageSphere = ReturnType<typeof ApplyDamageSphere>;
