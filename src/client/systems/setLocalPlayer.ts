import { World } from "@rbxts/matter";
import { store } from "client/ui/store";
import { Client, LocalClient } from "shared/components";
import { SystemPriority } from "shared/constants/systemPriority";

const players: Players = game.GetService("Players");
const workspace: Workspace = game.GetService("Workspace");
const LocalPlayer = players.LocalPlayer;

const setLocalPlayer = (world: World) => {
	for (const [id, client] of world.queryChanged(Client)) {
		if (client.new?.player.UserId === LocalPlayer.UserId) {
			world.insert(id, LocalClient({ player: client.new.player }));
			if (client.new.loaded) {
				store.setAppLoaded(true);
			}
		}
	}
};

export = {
	system: setLocalPlayer,
	priority: SystemPriority.CRITICAL,
};
