import { $env } from "rbxts-transform-env";
import { GameAnalytics } from "@rbxts/gameanalytics";
import { Cmdr, CommandContextWithWorld } from "@rbxts/cmdr";

Cmdr.RegisterDefaultCommands();
const gameKey = $env.string("GAME_ANALYTICS_GAME_KEY");
const secretKey = $env.string("GAME_ANALYTICS_SECRET_KEY");
const build = $env.string("BUILD_VERSION") ?? "0.0.1";
print("Build version", build);

if (gameKey !== undefined && secretKey !== undefined) {
	GameAnalytics.initialize({
		gameKey,
		secretKey,
		build,
		reportErrors: true,
		availableResourceItemTypes: ["continues", "coins", "lifes"],
	});
}

import { start } from "shared/start";
import { setupTags } from "shared/utils/setupTags";
import { ClientState } from "shared/constants/clientState";

const ReplicatedStorage = game.GetService("ReplicatedStorage");
const RunService = game.GetService("RunService");
declare const script: { systems: Folder };
const world = start([script.systems, ReplicatedStorage.TS.systems], {} as ClientState)(setupTags);

Cmdr.Registry.RegisterHook("BeforeRun", (context: CommandContextWithWorld) => {
	const groupId = $env.number("GROUP_ID");
	const studio = RunService.IsStudio();
	let isAdmin = false;
	if (groupId !== undefined) {
		const role = context.Executor.GetRoleInGroup(groupId);
		isAdmin = role === "Admin" || role === "Owner";
	}
	if (isAdmin || studio) {
		context.world = world;
	} else {
		return "Admin only";
	}
});

//Cmdr.RegisterTypesIn(ReplicatedStorage.TS.commands.types);
Cmdr.RegisterCommandsIn(ReplicatedStorage.TS.commands);
