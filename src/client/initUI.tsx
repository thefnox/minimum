import "./ui/app/react-config";
import { Context, HotReloader } from "@rbxts/rewire";
import { createPortal, createRoot } from "@rbxts/react-roblox";
import React from "@rbxts/react";
import { RootProvider } from "client/ui/providers/rootProvider";

import { App } from "./ui/app";
import { $env } from "rbxts-transform-env";

const production = $env.string("ENV") === "production";
const ReplicatedStorage = game.GetService("ReplicatedStorage");
const Players = game.GetService("Players");
const root = createRoot(new Instance("Folder"));

const initUI = () => {
	const target = Players.LocalPlayer.WaitForChild("PlayerGui");

	root.render(
		createPortal(
			<RootProvider key="root-provider">
				<App key="app" />
			</RootProvider>,
			target,
		),
	);
};

initUI();

if (!production) {
	const hotReloader = new HotReloader();
	const uiFolders = ReplicatedStorage.Client.ui.GetChildren().filter((child) => child.IsA("Folder"));
}
