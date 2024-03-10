import { initializeClient } from "@rbxts/gameanalytics";
initializeClient();
import { AnyEntity } from "@rbxts/matter";
import { CmdrClient } from "@rbxts/cmdr";
CmdrClient.SetActivationKeys([Enum.KeyCode.F2]);
CmdrClient.SetEnabled(false);
import { start } from "shared/start";
import { receiveReplication } from "./receiveReplication";
import { ClientState } from "shared/constants/clientState";
import { setupTags } from "shared/utils/setupTags";
import "./initUI";
import { PreloadClientAssets } from "client/ui/utils/preloadClientAssets";
import { ConfirmLoaded } from "./network";

const ReplicatedStorage = game.GetService("ReplicatedStorage");
const StarterGui = game.GetService("StarterGui");

StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.Health, false);
StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.Backpack, false);

(async () => {
	print("Preloading start");
	ConfirmLoaded.fire();
	await PreloadClientAssets();
	print("Preloading ended");
})();

const state: ClientState = {
	debugEnabled: false,
	entityIdMap: new Map<string, AnyEntity>(),
};

start([ReplicatedStorage.Client.systems, ReplicatedStorage.TS.systems], state)(receiveReplication, setupTags);
