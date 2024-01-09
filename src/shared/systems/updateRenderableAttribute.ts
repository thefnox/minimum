import { World } from "@rbxts/matter";
import { Renderable } from "shared/components";

const RunService = game.GetService("RunService");
const name = RunService.IsServer() ? "serverEntityId" : "clientEntityId";

const updateRenderableAttribute = (world: World) => {
	for (const [id, record] of world.queryChanged(Renderable)) {
		if (record.new !== undefined) {
			record.new.model?.SetAttribute(name, id);
		}
	}
};

export = {
	system: updateRenderableAttribute,
};
