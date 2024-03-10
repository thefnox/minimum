import { AnyEntity, World, log } from "@rbxts/matter";
import { PlayerModel } from "shared/components";

const isServer = game.GetService("RunService").IsServer();

const entityKey = isServer ? "id" : "clientEntityId";

const assignIdToCharacter = (world: World) => {
	for (const [id, changed] of world.queryChanged(PlayerModel)) {
		if (!world.contains(id) || changed.new?.character?.PrimaryPart === undefined) {
			continue;
		}
		const character = changed.new.character;
		character.SetAttribute(entityKey, id);
	}
};

export = {
	system: assignIdToCharacter,
};
