import "client/ui/app/react-config";

import Roact from "@rbxts/roact";
import ReactRoblox from "@rbxts/react-roblox";
import { Button } from "./button";
import { WithControls } from "@rbxts/ui-labs";
import { Slider } from "@rbxts/ui-labs/out/ControlsUtil";
import { RootProvider } from "client/ui/providers/rootProvider";
import { Text } from "../text";

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
			<Button
				key="button"
				cornerRadius={new UDim(0, 4)}
				size={new UDim2(0, props.controls.sizeX, 0, props.controls.sizeY)}
			>
				<Text key="text" text={props.controls.title} />
			</Button>
		</RootProvider>
	),
};

export = story;
