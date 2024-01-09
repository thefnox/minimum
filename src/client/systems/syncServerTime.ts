import { AnyEntity, World, useEvent } from "@rbxts/matter";
import { ServerTime } from "shared/components";
import { SystemPriority } from "shared/constants/systemPriority";

const Workspace = game.GetService("Workspace");
const RunService = game.GetService("RunService");
let timeEntity: AnyEntity | undefined;

const syncServerTime = (world: World) => {
	let currentServerTime = 0;
	const curTime = tick();
	try {
		currentServerTime = Workspace.GetServerTimeNow();
	} catch (err) {
		// ignore
	}
	if (timeEntity === undefined || !world.contains(timeEntity)) {
		timeEntity = world.spawn(ServerTime({ serverTime: currentServerTime, lastSync: curTime })) as AnyEntity;
	} else {
		world.insert(timeEntity, ServerTime({ serverTime: currentServerTime, lastSync: curTime }));
	}
};

export = {
	system: syncServerTime,
	priority: SystemPriority.CRITICAL,
};
