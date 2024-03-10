import { useSelector } from "@rbxts/react-reflex";
import React from "@rbxts/react";

import { Frame } from "client/ui/components/frame";
import { useRem } from "client/ui/hooks";
import { selectHealth } from "client/store/player";

export const PlayerStats = () => {
	const rem = useRem();
	const health = useSelector(selectHealth);
	return (
		<Frame
			key="player-stats"
			size={new UDim2(0.4, 0, 0.2, 0)}
			maxSize={new Vector2(rem(36), rem(6))}
			anchorPoint={new Vector2(0.5, 1)}
			position={new UDim2(0.5, 0, 1, -rem(6.5))}
			backgroundTransparency={1}
		>
			<uilistlayout
				key={"list"}
				FillDirection="Vertical"
				Padding={new UDim(0, rem(0.5))}
				SortOrder="LayoutOrder"
			/>
			<Frame key="container" backgroundTransparency={1} size={new UDim2(1, 0, 0.5, 0)} layoutOrder={2}>
				<uilistlayout key={"list"} FillDirection="Horizontal" SortOrder="Name" HorizontalAlignment={"Center"} />
			</Frame>
		</Frame>
	);
};
