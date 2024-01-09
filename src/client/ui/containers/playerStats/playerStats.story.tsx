import "client/ui/app/react-config";

import Roact from "@rbxts/roact";
import ReactRoblox from "@rbxts/react-roblox";
import { PlayerStats } from "./playerStats";
import { WithControls } from "@rbxts/ui-labs";
import { Slider } from "@rbxts/ui-labs/out/ControlsUtil";
import { RootProvider } from "client/ui/providers/rootProvider";
const controls = {
	sizeX: Slider(100, 100, 1000),
	sizeY: Slider(100, 100, 1000),
	title: "Hello World",
};

const story: WithControls<typeof controls> = {
	controls,
	react: Roact,
	reactRoblox: ReactRoblox,
	story: (props) => (
		<RootProvider>
			<PlayerStats key="player-stats" />
		</RootProvider>
	),
};

export = story;
