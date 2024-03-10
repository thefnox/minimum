import { Replication } from "./network";
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

	Replication.on((_entities: unknown) => {
		const entities = _entities as Map<string, Map<ComponentNames, { data: AnyComponent }>>;
		debugPrint("receiving replication", entities, HttpService.JSONEncode(entityIdMap));
		for (const [id, componentMap] of entities) {
			let clientEntityId = entityIdMap.get(id);

			if (clientEntityId !== undefined && next(componentMap)[0] === undefined) {
				if (world.contains(clientEntityId)) {
					world.despawn(clientEntityId);
				}
				entityIdMap.delete(id);
				continue;
			}

			debugPrint("id", id, "clientEntityId", clientEntityId, componentMap);

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

				entityIdMap.set(id, clientEntityId as AnyEntity);
				debugPrint("Spawned", clientEntityId, "(Server: ", id, ") with", insertNames.join(", "));
			} else {
				if (!world.contains(clientEntityId)) {
					world.spawnAt(clientEntityId);
				}

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
						id,
						insertNames.size() > 0 ? insertNames.join(", ") : "nothing",
						removeNames.size() > 0 ? removeNames.join(", ") : "nothing",
					),
				);
			}
		}
	});
};
