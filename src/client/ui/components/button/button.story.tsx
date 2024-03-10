import "client/ui/app/react-config";

import React from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";
import { Button } from "./button";
import { RootProvider } from "client/ui/providers/rootProvider";
import { Text } from "../text";
import { hoarcekat } from "@rbxts/pretty-react-hooks";

const story = hoarcekat(() => (
	<RootProvider>
		<Button key="button" cornerRadius={new UDim(0, 4)} size={new UDim2(0, 100, 0, 100)}>
			<Text key="text" text={"Hello World"} />
		</Button>
	</RootProvider>
));

export = story;
