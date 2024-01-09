import { AnyEntity, World, useEvent } from "@rbxts/matter";
import { Client, PlayerState, PlayerSave } from "shared/components";
import { PlayerGameState } from "shared/constants/playerState";
import { SystemPriority } from "shared/constants/systemPriority";
import { remotes } from "shared/remotes";
import { ResetTransparency, SetTransparency } from "shared/utils/transparency";

const spawnPlayerOnceLoaded = (world: World) => {
	for (const [, player] of useEvent("ConfirmLoaded", remotes.input.confirmLoaded)) {
		for (const [id, client] of world.query(Client)) {
			if (player.GetAttribute("serverEntityId") === id && !client.loaded) {
				world.insert(id as AnyEntity, client.patch({ loaded: true }));
			}
		}
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
