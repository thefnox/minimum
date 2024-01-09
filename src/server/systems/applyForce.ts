import { AnyEntity, World } from "@rbxts/matter";
import { ApplyForceSphere, Client, Health, ReceiveForce, Renderable } from "shared/components";

const Workspace = game.GetService("Workspace");
const Players = game.GetService("Players");

const applyForce = (world: World) => {
	for (const [id, { position, radius, affectsPlayers, force }] of world.query(ApplyForceSphere)) {
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
						const [targetHealth, client, renderable] = world.get(entityId, Health, Client, Renderable);
						if (!affectsPlayers && client !== undefined) {
							continue;
						}
						if (
							targetHealth !== undefined &&
							targetHealth.health > 0 &&
							renderable?.model?.PrimaryPart !== undefined
						) {
							let direction = renderable.model.PrimaryPart.Position.sub(position);
							if (direction.Magnitude > 0) {
								direction = direction.Unit;
							} else {
								direction = Vector3.yAxis;
							}
							world.insert(entityId, ReceiveForce({ force: direction.mul(force), inflictor: id }));
						}
					}
				}
			}
		}
		world.remove(id, ApplyForceSphere);
	}
};

export = {
	system: applyForce,
};
