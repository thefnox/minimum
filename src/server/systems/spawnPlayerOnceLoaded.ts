import { AnyEntity, World, useEvent } from "@rbxts/matter";
import { Client, PlayerState, PlayerSave } from "shared/components";
import { PlayerGameState } from "shared/constants/playerState";
import { SystemPriority } from "shared/constants/systemPriority";
import { ConfirmLoaded } from "server/network";
import { ResetTransparency, SetTransparency } from "shared/utils/transparency";
import { useChange } from "@rbxts/matter-hooks";

const spawnPlayerOnceLoaded = (world: World) => {
	if (useChange([])) {
		ConfirmLoaded.on((player) => {
			for (const [id, client] of world.query(Client)) {
				if (player.GetAttribute("id") === id && !client.loaded) {
					world.insert(id as AnyEntity, client.patch({ loaded: true }));
				}
			}
		});
	}
	for (const [id, playerState, { loaded, player }] of world.query(PlayerState, Client, PlayerSave)) {
		if (playerState.state === PlayerGameState.Connected) {
			if (loaded) {
				if (player.Character) {
					SetTransparency(player.Character, 0);
				}
			} else if (player.Character) {
				ResetTransparency(player.Character);
			}
		}
	}
};

export = {
	system: spawnPlayerOnceLoaded,
	priority: SystemPriority.CRITICAL,
};
