import { AnyEntity, useEvent, World } from "@rbxts/matter";
import { $env } from "rbxts-transform-env";
import { Client, PlayerState, PlayerAdmin } from "shared/components";
import { PlayerGameState } from "shared/constants/playerState";
import { SystemPriority } from "shared/constants/systemPriority";
import { loadPlayer } from "shared/utils/loadPlayer";

const RunService = game.GetService("RunService");
const Players = game.GetService("Players");

const addPlayers = (world: World) => {
	for (const player of Players.GetPlayers()) {
		if (player.GetAttribute("serverEntityId") === undefined) {
			const playerId = world.spawn(
				Client({
					player,
				}),
				PlayerState({
					state: PlayerGameState.Connected,
				}),
			);
			(async () => {
				loadPlayer(playerId as AnyEntity, player, world);
				const groupId = $env.number("GROUP_ID");
				const studio = RunService.IsStudio();
				if (studio) {
					world.insert(playerId as AnyEntity, PlayerAdmin());
					return;
				}
				if (groupId !== undefined) {
					const role = player.GetRoleInGroup(groupId);
					if (role === "Admin" || role === "Owner") {
						world.insert(playerId as AnyEntity, PlayerAdmin());
					}
				}
			})();
			print("Spawning player", player.Name, "with entity", playerId);
			player.SetAttribute("serverEntityId", playerId);
		}
	}

	for (const [, player] of useEvent(Players, "PlayerRemoving")) {
		// Upon player disconnection, first set the player state to disconnected
		const playerId = player.GetAttribute("serverEntityId") as AnyEntity;
		if (playerId !== undefined && world.contains(playerId)) {
			print("Disconnecting player", player.Name);
			world.insert(playerId, PlayerState({ state: PlayerGameState.Disconnected }));
		} else if (world.contains(playerId)) {
			// If the player has not been assigned an entity, then they have not
			// been fully initialized and we can just despawn them
			print("Despawning player", player.Name);
			world.despawn(playerId);
		}
	}
};

export = {
	system: addPlayers,
	priority: SystemPriority.CRITICAL,
};
