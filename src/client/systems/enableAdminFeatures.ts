import { CmdrClient } from "@rbxts/cmdr";
import { World } from "@rbxts/matter";
import { LocalClient, PlayerAdmin } from "shared/components";
import setLocalPlayer from "./setLocalPlayer";

const TextChatService = game.GetService("TextChatService");

const enableAdminFeatures = (world: World) => {
	for (const [id, playerAdmin] of world.queryChanged(PlayerAdmin)) {
		if (!world.contains(id)) {
			continue;
		}
		const localClient = world.get(id, LocalClient);
		if (localClient === undefined) {
			continue;
		}
		CmdrClient.SetEnabled(localClient !== undefined);
		let cmdrOpenCmd = TextChatService?.FindFirstChild("TextChatCommands")?.FindFirstChild("CmdrOpenCmd") as
			| TextChatCommand
			| undefined;
		if (cmdrOpenCmd === undefined) {
			cmdrOpenCmd = new Instance("TextChatCommand");
			cmdrOpenCmd.Name = "CmdrOpenCmd";
			cmdrOpenCmd.PrimaryAlias = "/cmdr";
			cmdrOpenCmd.SecondaryAlias = "/cmd";
			cmdrOpenCmd.Triggered.Connect(() => {
				CmdrClient.Toggle();
			});
			cmdrOpenCmd.Parent = TextChatService?.FindFirstChild("TextChatCommands");
		}
		cmdrOpenCmd.Enabled = localClient !== undefined;
	}
};

export = {
	system: enableAdminFeatures,
	after: [setLocalPlayer],
};
