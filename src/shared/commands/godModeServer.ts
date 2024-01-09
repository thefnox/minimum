import { CommandContextWithWorld } from "@rbxts/cmdr";
import { Client, GodMode, PlayerAdmin } from "shared/components";

export = function (context: CommandContextWithWorld) {
	const { world, Executor } = context;
	if (world === undefined) return "World is undefined";
	let enabled = false;
	for (const [id, { player }] of world.query(Client, PlayerAdmin)) {
		if (player.UserId === Executor.UserId) {
			const godmode = world.get(id, GodMode);
			enabled = godmode === undefined;
			if (godmode === undefined) {
				world.insert(id, GodMode());
			} else {
				world.remove(id, GodMode);
			}
		}
	}
	return enabled ? `Godmode enabled for ${Executor.Name}` : `Godmode disabled for ${Executor.Name}`;
};
