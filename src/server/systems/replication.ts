import { AnyComponent, useEvent, World, log, AnyEntity } from "@rbxts/matter";
import { Replication } from "server/network";
import { REPLICATED_COMPONENTS, REPLICATED_PLAYER_ONLY } from "shared/components/replicated";
import type { ComponentNames } from "shared/components/serde";
import { Client } from "shared/components";

const Players = game.GetService("Players");
type Changelog = Map<string, Map<ComponentNames, { data: AnyComponent }>>;
const changes = new Map<string, Changelog>();

const replication = (world: World) => {
	for (const [playerId, client] of world.queryChanged(Client)) {
		if (!world.contains(playerId) || client.new === undefined) {
			continue;
		}
		const { player, loaded } = client.new;
		if (!loaded) {
			continue;
		}
		const playerPayload: Changelog = new Map<string, Map<ComponentNames, { data: AnyComponent }>>();
		for (const [entityId, entityData] of world) {
			const key = tostring(entityId);
			const entityPayload = new Map<ComponentNames, { data: AnyComponent }>();

			for (const [component, componentInstance] of entityData) {
				if (
					REPLICATED_COMPONENTS.has(component) ||
					(playerId === entityId && REPLICATED_PLAYER_ONLY.has(component))
				) {
					entityPayload.set(tostring(component) as ComponentNames, { data: componentInstance });
				}
			}

			if (next(entityPayload)[0] !== undefined) {
				playerPayload.set(key, entityPayload);
			}
		}
		log("Setting initial replication", playerId, player.Name, playerPayload);
		changes.set(tostring(player.UserId), playerPayload);
	}

	for (const component of REPLICATED_COMPONENTS) {
		for (const [entityId, record] of world.queryChanged(component)) {
			const key = tostring(entityId);
			const name = tostring(component) as ComponentNames;
			log("Replicated component changed", key, name, record.new);
			for (const player of Players.GetPlayers()) {
				const playerId = tostring(player.UserId);
				if (!changes.has(playerId)) {
					changes.set(playerId, new Map());
				}
				const playerChanges = changes.get(playerId);
				if (playerChanges !== undefined) {
					if (world.contains(entityId as AnyEntity)) {
						if (!playerChanges.has(key)) {
							playerChanges.set(key, new Map());
						}
						playerChanges.get(key)?.set(name, { data: record.new! });
					}
				}
			}
		}
	}

	for (const component of REPLICATED_PLAYER_ONLY) {
		for (const [entityId, record] of world.queryChanged(component)) {
			const key = tostring(entityId);
			const name = tostring(component) as ComponentNames;
			if (!world.contains(entityId as AnyEntity)) {
				continue;
			}
			const client = world.get(entityId, Client);
			if (client !== undefined) {
				const { player } = client;
				const playerId = tostring(player.UserId);
				if (!changes.has(playerId)) {
					changes.set(playerId, new Map());
				}
				const playerChanges = changes.get(playerId);
				if (playerChanges !== undefined) {
					if (world.contains(entityId as AnyEntity)) {
						if (!playerChanges.has(key)) {
							playerChanges.set(key, new Map());
						}
						playerChanges.get(key)?.set(name, { data: record.new! });
					}
				}
				log("Player only component changed", key, name, entityId);
			}
		}
	}

	for (const [, { player, loaded }] of world.query(Client)) {
		if (!loaded) {
			continue;
		}
		const currentChangelog = changes.get(tostring(player.UserId));
		if (currentChangelog !== undefined) {
			log("Sending replication changes to player", player.Name, currentChangelog);
			Replication.fire(player, currentChangelog);
			changes.delete(tostring(player.UserId));
		}
	}
};

export = {
	system: replication,
	priority: math.huge,
};
