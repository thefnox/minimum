import { useSelector } from "@rbxts/react-reflex";
import Roact from "@rbxts/roact";

import { Frame } from "client/ui/components/frame";
import { StatSlider } from "client/ui/components/statSlider";
import { useRem } from "client/ui/hooks";
import { selectHealth } from "client/ui/store/player";

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
				<StatSlider
					key={"health"}
					size={new UDim2(0.5, -4, 0.75, 0)}
					color={Color3.fromRGB(219, 18, 18)}
					padding={3}
					icon="rbxassetid://14421919505"
					value={health}
					maxValue={100}
				/>
			</Frame>
		</Frame>
	);
};
