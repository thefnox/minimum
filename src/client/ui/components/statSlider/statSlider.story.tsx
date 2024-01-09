import "client/ui/app/react-config";

import Roact from "@rbxts/roact";
import ReactRoblox from "@rbxts/react-roblox";
import { StatSlider } from "./statSlider";
import { WithControls } from "@rbxts/ui-labs";
import { RGBA, Slider } from "@rbxts/ui-labs/out/ControlsUtil";
import { RootProvider } from "client/ui/providers/rootProvider";
import { Text } from "../text";

const controls = {
	value: Slider(50, 0, 100),
	maxValue: 100,
	color: RGBA(Color3.fromRGB(255, 0, 0), 0),
	title: "Hello World",
};

const story: WithControls<typeof controls> = {
	controls,
	react: Roact,
	reactRoblox: ReactRoblox,
	story: (props) => (
		<RootProvider>
			<StatSlider
				position={new UDim2(0, 200, 0, 200)}
				key="stat-slider"
				size={new UDim2(0, 250, 0, 50)}
				cornerRadius={new UDim(0, 4)}
				value={props.controls.value}
				maxValue={props.controls.maxValue}
				color={props.controls.color.Color}
				icon={"rbxassetid://14421919505"}
			/>
		</RootProvider>
	),
};

export = story;
