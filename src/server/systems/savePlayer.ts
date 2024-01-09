import { World, useDeltaTime } from "@rbxts/matter";
import { Client, PlayerSave, PlayerSettings, PlayerState, SaveThrottle } from "shared/components";
import { PlayerGameState } from "shared/constants/playerState";
import { savePlayer as savePlayerUtil } from "shared/utils/savePlayer";

const savePlayer = (world: World) => {
	const deltaTime = useDeltaTime();
	for (const [id, settings] of world.queryChanged(PlayerSettings)) {
		if (settings.new !== undefined && settings.old !== undefined) {
			const playerSave = world.get(id, PlayerSave);
			if (playerSave !== undefined) {
				world.insert(
					id,
					playerSave.patch({
						save: {
							...playerSave.save,
							settings: { ...settings.new },
						},
					}),
				);
			}
		}
	}
	for (const [id, playerSave] of world.queryChanged(PlayerSave)) {
		if (playerSave.new !== undefined && world.contains(id)) {
			world.insert(id, SaveThrottle());
		}
	}

	for (const [id, saveThrottle, { save, playerId }] of world.query(SaveThrottle, PlayerSave)) {
		if (!world.contains(id)) continue;
		if (saveThrottle.time > 0) {
			world.insert(id, saveThrottle.patch({ time: math.max(0, saveThrottle.time - deltaTime) }));
		} else {
			world.remove(id, SaveThrottle);
			(async () => {
				await savePlayerUtil(playerId, save);
			})();
		}
	}
	// Despawn on disconnect
	for (const [id, playerState] of world.queryChanged(PlayerState)) {
		if (!world.contains(id) || playerState.new === undefined) continue;
		if (playerState.new.state === PlayerGameState.Disconnected) {
			const playerSave = world.get(id, PlayerSave);
			const lastSave = world.get(id, PlayerSave);
			if (lastSave !== undefined) {
				(async () => {
					await savePlayerUtil(lastSave.playerId, lastSave.save);
				})();
			}
			world.despawn(id);
		}
	}
};

export = {
	system: savePlayer,
};
