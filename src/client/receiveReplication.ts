import { remotes } from "shared/remotes";
import * as Components from "shared/components";
import { ComponentNames, UnionComponentsMap } from "shared/components/serde";
import { AnyComponent, ComponentCtor } from "@rbxts/matter/lib/component";
import { ClientState } from "shared/constants/clientState";
import { t } from "@rbxts/t";
import { AnyEntity, World } from "@rbxts/matter";

const HttpService = game.GetService("HttpService");

export const receiveReplication = (world: World, state: ClientState) => {
	const { entityIdMap, debugEnabled } = state;

	const debugPrint = (...args: unknown[]) => {
		if (debugEnabled) {
			print("Replication>", ...args);
		}
	};

	remotes.replication.replicationEvent.connect((entities) => {
		debugPrint("receiving replication", entities, HttpService.JSONEncode(entityIdMap));
		for (const [serverEntityId, componentMap] of entities) {
			let clientEntityId = entityIdMap.get(serverEntityId);

			if (clientEntityId !== undefined && next(componentMap)[0] === undefined) {
				if (world.contains(clientEntityId)) {
					world.despawn(clientEntityId);
				}
				entityIdMap.delete(serverEntityId);
				continue;
			}

			debugPrint("serverEntityId", serverEntityId, "clientEntityId", clientEntityId, componentMap);

			const componentsToInsert = new Array<AnyComponent>();
			const componentsToRemove = new Array<ComponentCtor>();

			const insertNames = new Array<string>();
			const removeNames = new Array<string>();

			for (const [name, container] of componentMap) {
				if (container.data) {
					componentsToInsert.push(Components[name](container.data as UnionComponentsMap));
					insertNames.push(name);
				} else {
					componentsToRemove.push(Components[name]);
					removeNames.push(name);
				}
			}

			if (clientEntityId === undefined) {
				clientEntityId = world.spawn() as AnyEntity;
				if (componentsToInsert.size() > 0) {
					world.insert(clientEntityId, ...componentsToInsert);
				}

				entityIdMap.set(serverEntityId, clientEntityId as AnyEntity);
				debugPrint("Spawned", clientEntityId, "(Server: ", serverEntityId, ") with", insertNames.join(", "));
			} else {
				if (componentsToInsert.size() > 0) {
					world.insert(clientEntityId, ...componentsToInsert);
				}

				if (componentsToRemove.size() > 0) {
					world.remove(clientEntityId, ...componentsToRemove);
				}

				debugPrint(
					string.format(
						"Modify %ds%d adding %s, removing %s",
						clientEntityId,
						serverEntityId,
						insertNames.size() > 0 ? insertNames.join(", ") : "nothing",
						removeNames.size() > 0 ? removeNames.join(", ") : "nothing",
					),
				);
			}
		}
	});
};
