import { World } from "@rbxts/matter";
import { Gibs } from "shared/components";

const Workspace = game.GetService("Workspace");

const fadeAwayGibs = (world: World) => {
	for (const [id, gibs] of world.queryChanged(Gibs)) {
		if (!world.contains(id)) {
			continue;
		}
		if (gibs.new === undefined && gibs.old !== undefined) {
			for (const part of gibs.old.parts) {
				if (part !== undefined) {
					part.Destroy();
				}
			}
		} else if (gibs.new !== undefined) {
			for (const part of gibs.new.parts) {
				if (part !== undefined && part.IsA("BasePart")) {
					part.CollisionGroup = "Gibs";
				}
			}
		}
	}
	for (const [id, { parts, spawnTime, fadeTime, existTime }] of world.query(Gibs)) {
		const currentTime = Workspace.GetServerTimeNow();
		if (currentTime - spawnTime >= existTime) {
			const fadePercent = (currentTime - existTime) / fadeTime;
			if (fadePercent >= 1) {
				for (const part of parts) {
					part.Destroy();
				}
				world.remove(id, Gibs);
			} else {
				for (const part of parts) {
					part.Transparency = math.max(part.Transparency, fadePercent);
				}
			}
		}
	}
};

export = {
	system: fadeAwayGibs,
};
