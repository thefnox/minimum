import { AnyEntity, useEvent, World } from "@rbxts/matter";
import promiseR15 from "@rbxts/promise-character";
import { Client, PlayerState, PlayerModel } from "shared/components";
import { PlayerGameState } from "shared/constants/playerState";
import addPlayers from "./addPlayers";
import { GameAnalytics } from "@rbxts/gameanalytics";

const Players = game.GetService("Players");

const respawnPlayers = (world: World) => {
	for (const [id, playerState] of world.queryChanged(PlayerState)) {
		if (!playerState.new) {
			continue;
		}
		if (!world.contains(id as AnyEntity)) continue;
		const client = world.get(id, Client);
		const model = world.get(id, PlayerModel);
		if (client) {
			switch (playerState.new.state) {
				case PlayerGameState.Connected:
				case PlayerGameState.Spawning:
				case PlayerGameState.Reviving: {
					// Prevents respawn from running twice.
					if (playerState?.old?.state === PlayerGameState.Connected) {
						continue;
					}
					if (playerState?.old?.state !== playerState.new.state) {
						world.remove(id as AnyEntity, PlayerModel);
						(async () => {
							if (client.player !== undefined) {
								let loaded = false;
								while (!loaded) {
									try {
										if (client.player.Character !== undefined) {
											client.player.Character.Destroy();
											client.player.Character = undefined;
										}
										await client.player.LoadCharacter();
										print("Spawning character", client.player.Name);
										loaded = true;
									} catch (err) {
										warn("Error loading character", err);
										GameAnalytics.addErrorEvent(client.player.UserId, {
											severity: GameAnalytics.EGAErrorSeverity.error,
											message: `Error loading character ${err}`,
										});
										if (
											client.player === undefined ||
											!Players.GetPlayers().find((player) => player === client.player)
										) {
											// Player has disconnected, don't try to respawn
											break;
										}
									}
								}
							}
						})();
					}
					break;
				}
				default:
					break;
			}
		}
	}

	for (const [id, { player }, playerState] of world.query(Client, PlayerState)) {
		// Add PlayerModel component to connect players to their character
		for (const [, character] of useEvent(player, "CharacterAppearanceLoaded")) {
			if (character) {
				(async () => {
					let model;
					try {
						model = await Promise.race([
							promiseR15(character),
							(async () => {
								await Promise.delay(1);
								throw "Character load timed out!";
							})(),
						]);
					} catch (err) {
						warn("Error loading character, reloading!", err);
						GameAnalytics.addErrorEvent(player.UserId, {
							severity: GameAnalytics.EGAErrorSeverity.error,
							message: `Error loading character, reloading!: ${err}`,
						});
						player.LoadCharacter();
						return;
					}
					model.Humanoid.BreakJointsOnDeath = true;
					world.insert(
						id as AnyEntity,
						playerState.patch({
							state:
								playerState.state === PlayerGameState.Reviving
									? PlayerGameState.Revived
									: PlayerGameState.Playing,
						}),
					);
					world.insert(
						id as AnyEntity,
						PlayerModel({
							character: model,
							humanoid: model.Humanoid,
						}),
					);
					print("Character added", player.Name);
				})();
			}
		}
	}

	for (const [id, { humanoid, character }] of world.query(PlayerModel)) {
		// Make the PlayerModel component despawn on death to notify other systems
		for (const [, deathCount] of useEvent(humanoid, "Died")) {
			print("Character died", humanoid.DisplayName, deathCount);
			world.remove(id as AnyEntity, PlayerModel);
		}
		for (const [, health] of useEvent(humanoid, "HealthChanged")) {
			if (health <= 0) {
				for (const part of character.GetChildren()) {
					if (part.Name !== "Humanoid") {
						part.Destroy();
					}
				}
			}
		}
	}
};

export = {
	system: respawnPlayers,
	after: [addPlayers],
};
