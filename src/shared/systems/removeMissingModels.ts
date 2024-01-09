import { AnyEntity, World, useEvent } from "@rbxts/matter";
import { Renderable } from "shared/components";

const RunService = game.GetService("RunService");

const removeMissingModels = (world: World) => {
	for (const [id, modelRecord] of world.queryChanged(Renderable)) {
		if (modelRecord.new === undefined) {
			if (modelRecord.old !== undefined && modelRecord.old.model) {
				modelRecord.old.model.Destroy();
			}
		} else if (modelRecord.new.model !== modelRecord.old?.model) {
			const { model } = modelRecord.new;
			model.Destroying.Connect(() => {
				//print("Model Destroyed", model);
				if (world.contains(id as AnyEntity)) {
					world.remove(id as AnyEntity, Renderable);
				}
			});
			model.AncestryChanged.Connect(() => {
				if (model.IsDescendantOf(game) === false && world.contains(id as AnyEntity)) {
					//print("Removing", model);
					world.remove(id as AnyEntity);
				}
			});
		}
	}
};

export = {
	event: RunService.IsClient() ? "fixed" : "default",
	system: removeMissingModels,
};
