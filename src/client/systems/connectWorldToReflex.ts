import { World } from "@rbxts/matter";
import { store } from "client/ui/store";
import { Health, LocalClient, PlayerAdmin, PlayerModel, PlayerState } from "shared/components";
import { ClientState } from "shared/constants/clientState";
import { SystemPriority } from "shared/constants/systemPriority";

const connectWorldToReflex = (world: World, client: ClientState) => {
	const currentState = store.getState();
	let localPlayerId = currentState.app.entityId;
	for (const [id, client] of world.query(LocalClient)) {
		const state = world.get(id, PlayerState);
		const admin = world.get(id, PlayerAdmin);
		const playerModel = world.get(id, PlayerModel);
		if (state !== undefined) {
			store.setPlayerState(state.state);
		}
		if (admin !== undefined) {
			store.setIsAdmin(true);
		}
		if (localPlayerId !== id) {
			store.setEntityId(id);
		}
		localPlayerId = id;
	}
	for (const [id, health] of world.queryChanged(Health)) {
		if (!world.contains(id)) continue;
		if (id === localPlayerId && health.new !== undefined) {
			store.setHealth(health.new.health);
		}
	}
};
export = {
	system: connectWorldToReflex,
	priority: SystemPriority.HIGH,
};
