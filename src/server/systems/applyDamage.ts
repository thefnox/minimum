import { AnyEntity, World } from "@rbxts/matter";
import {
	AppliesDamageTrigger,
	ApplyDamageSphere,
	Client,
	Health,
	LastDamaged,
	Renderable,
	TakeDamage,
	Touched,
} from "shared/components";
import applyForce from "./applyForce";

const Workspace = game.GetService("Workspace");
const Players = game.GetService("Players");

const applyDamage = (world: World) => {
	for (const [id, { position, radius, affectsPlayers, damage, damageType }] of world.query(ApplyDamageSphere)) {
		const overlapParams = new OverlapParams();
		if (!affectsPlayers) {
			overlapParams.FilterType = Enum.RaycastFilterType.Exclude;
			overlapParams.FilterDescendantsInstances = Players.GetPlayers()
				.map((player) => player.Character)
				.filterUndefined();
		}
		const results = Workspace.GetPartBoundsInRadius(position, radius, overlapParams);
		if (results !== undefined) {
			for (const part of results) {
				if (part.Parent?.IsA("Model")) {
					const model = part.Parent as Model;
					const entityId = model?.GetAttribute("serverEntityId") as AnyEntity;
					if (entityId !== undefined && world.contains(entityId)) {
						const [targetHealth, client] = world.get(entityId, Health, Client);
						if (!affectsPlayers && client !== undefined) {
							continue;
						}
						if (targetHealth !== undefined && targetHealth.health > 0) {
							world.insert(entityId, TakeDamage({ amount: damage, damageType, inflictor: id }));
						}
					}
				}
			}
		}
		world.remove(id, ApplyDamageSphere);
	}
	for (const [id, { entities }, { damage, damageType, damageCooldown }] of world.query(
		Touched,
		AppliesDamageTrigger,
	)) {
		const lastDamaged = world.get(id, LastDamaged);
		const canDamageEntities = entities.filter((entityId) => {
			if (lastDamaged === undefined) {
				return true;
			}
			for (const [id, lastDamage] of lastDamaged.damaged) {
				if (id === entityId && lastDamage + damageCooldown >= Workspace.GetServerTimeNow()) {
					return false;
				}
			}
			return true;
		});
		const damagedEntities: AnyEntity[] = [];
		for (const entityId of canDamageEntities) {
			if (!world.contains(entityId)) {
				continue;
			}
			const targetHealth = world.get(entityId, Health);
			if (targetHealth !== undefined && targetHealth.health > 0) {
				world.insert(entityId, TakeDamage({ amount: damage, damageType, inflictor: id }));
				damagedEntities.push(entityId);
			}
		}
		if (lastDamaged !== undefined) {
			const damaged = lastDamaged.damaged.filter(([entityId]) => !damagedEntities.includes(entityId));
			for (const entityId of damagedEntities) {
				damaged.push([entityId, Workspace.GetServerTimeNow()]);
			}
			world.insert(id, LastDamaged({ damaged }));
		} else {
			world.insert(id, LastDamaged({ damaged: damagedEntities.map((id) => [id, Workspace.GetServerTimeNow()]) }));
		}
	}
};

export = {
	system: applyDamage,
	after: [applyForce],
};
