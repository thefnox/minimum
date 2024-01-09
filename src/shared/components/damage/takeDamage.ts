import { AnyEntity, component } from "@rbxts/matter";
import { DamageType } from "shared/constants/data";

export const TakeDamage = component<{ damageType: DamageType; amount: number; inflictor?: AnyEntity }>("TakeDamage");
export type TakeDamage = ReturnType<typeof TakeDamage>;
