import { DamageResistance } from "shared/components";
import { DamageType } from "shared/constants/data";

export const calculateResistance = (damageResistances: DamageResistance, damageType: DamageType) => {
	if (damageResistances === undefined) {
		return 0;
	}
	switch (damageType) {
		case DamageType.Slash:
			return damageResistances.slashResistance ?? 0;
		case DamageType.Blunt:
			return damageResistances.bluntResistance ?? 0;
		case DamageType.Explosive:
			return damageResistances.explosiveResistance ?? 0;
		case DamageType.Fire:
			return damageResistances.fireResistance ?? 0;
		case DamageType.Electric:
			return damageResistances.electricResistance ?? 0;
		case DamageType.Poison:
			return damageResistances.poisonResistance ?? 0;
		case DamageType.Radiation:
			return damageResistances.radiationResistance ?? 0;
		case DamageType.Crush:
			return damageResistances.crushResistance ?? 0;
		default:
			return 0;
	}
};

export const damageTypeToColor = (damageType: DamageType) => {
	switch (damageType) {
		case DamageType.Electric:
			return new Color3(1, 1, 0);
		case DamageType.Poison:
			return new Color3(0.79, 0.11, 1);
		case DamageType.Radiation:
			return new Color3(0.16, 1, 0.09);
		default:
			return new Color3(1, 0, 0);
	}
};
