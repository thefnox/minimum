import { AnyEntity, World, log } from "@rbxts/matter";
import { BoundEntities } from "shared/components";

const isServer = game.GetService("RunService").IsServer();

const entityKey = isServer ? "id" : "clientEntityId";

const destroyBoundEntities = (world: World) => {
	for (const [id, boundEntities] of world.queryChanged(BoundEntities)) {
		if (!world.contains(id)) {
			continue;
		}
		if (boundEntities.new === undefined && boundEntities.old !== undefined) {
			for (const model of boundEntities.old.models) {
				if (model !== undefined) {
					model.Destroy();
				}
			}
			for (const entity of boundEntities.old.entities) {
				if (world.contains(entity)) {
					world.despawn(entity);
				}
			}
		}
	}
	for (const [id, boundEntities] of world.query(BoundEntities)) {
		if (boundEntities.models.size() > 0) {
			const toRemove: Model[] = [];
			const toAdd: AnyEntity[] = [];
			for (const model of boundEntities.models) {
				if (model.Parent === undefined) {
					toRemove.push(model);
				} else {
					const entityId = model?.GetAttribute(entityKey) as AnyEntity;
					if (entityId !== undefined && world.contains(entityId)) {
						toAdd.push(entityId);
						toRemove.push(model);
					}
				}
			}
			if (toRemove.size() > 0 || toAdd.size() > 0) {
				world.insert(
					id,
					boundEntities.patch({
						models: boundEntities.models.filter((model) => !toRemove.includes(model)),
						entities: [...boundEntities.entities, ...toAdd],
					}),
				);
			}
		}
	}
};

export = {
	system: destroyBoundEntities,
};
