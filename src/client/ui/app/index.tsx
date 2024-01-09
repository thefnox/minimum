import "./react-config";

import { createPortal, createRoot } from "@rbxts/react-roblox";
import Roact from "@rbxts/roact";
import { RootProvider } from "client/ui/providers/rootProvider";

import { App } from "./app";

const Players = game.GetService("Players");
const root = createRoot(new Instance("Folder"));
const target = Players.LocalPlayer.WaitForChild("PlayerGui");

root.render(
	createPortal(
		<RootProvider key="root-provider">
			<App key="app" />
		</RootProvider>,
		target,
	),
);
