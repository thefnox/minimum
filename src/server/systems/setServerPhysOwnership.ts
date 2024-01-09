import { World } from "@rbxts/matter";
import { Renderable, ServerOwned } from "shared/components";

const setServerPhysOwnership = (world: World) => {
	for (const [id, owned] of world.queryChanged(ServerOwned)) {
		if (!world.contains(id)) continue;
		const renderable = world.get(id, Renderable);
		if (renderable !== undefined && owned.new !== undefined) {
			for (const part of renderable.model.GetDescendants()) {
				if (part.IsA("BasePart")) {
					if (part.Anchored) continue;
					part.SetNetworkOwner(undefined);
				}
			}
		}
	}
};

export = {
	system: setServerPhysOwnership,
};
