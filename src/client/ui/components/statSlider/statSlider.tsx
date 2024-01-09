import Roact, { useEffect } from "@rbxts/roact";
import { lerpBinding } from "@rbxts/pretty-react-hooks";

import { useMotion, useRem } from "client/ui/hooks";
import { padStart } from "client/ui/utils/string";
import { springs } from "client/ui/constants/springs";
import { Frame, FrameProps } from "../frame";
import { CanvasOrFrame } from "../canvasOrFrame";
import { Shadow } from "../shadow";
import { Outline } from "../outline";
import { Image } from "../image";
import { fonts, palette } from "client/ui/constants";
import { Text } from "../text";

export interface StatSliderProps extends FrameProps {
	readonly color: Color3;
	readonly icon: string;
	readonly value: number;
	readonly maxValue: number;
	readonly padding?: number;
}

export const StatSlider = ({ size, color, icon, position, value, maxValue, padding = 0 }: StatSliderProps) => {
	const rem = useRem();
	const [transition, transitionMotion] = useMotion(0);

	return (
		<Frame size={size} minSize={new Vector2(rem(2), rem(2))} position={position} backgroundTransparency={1}>
			<Frame
				key="background"
				backgroundColor={Color3.fromRGB(0, 0, 0)}
				backgroundTransparency={0.25}
				size={new UDim2(1, 0, 1, 0)}
				cornerRadius={new UDim(0, rem(1))}
			>
				<Frame
					key="fill"
					backgroundColor={color}
					backgroundTransparency={0}
					anchorPoint={new Vector2(0, 0)}
					position={new UDim2(0, rem(0.25), 0, rem(0.25))}
					cornerRadius={new UDim(0, rem(1))}
					size={new UDim2(value / math.max(maxValue, 1), -rem(0.5), 1, -rem(0.5))}
				>
					<Shadow
						key="glow"
						shadowBlur={0.3}
						shadowPosition={rem(0.5)}
						shadowSize={rem(4)}
						shadowColor={color}
						shadowTransparency={lerpBinding(transition, 1, 0.7)}
					/>
				</Frame>
				<Text
					key="label"
					size={new UDim2(1, 0, 1, 0)}
					text={padStart(`${math.round(value)}`, padding, "0")}
					textColor={palette.text}
					textScaled
					font={fonts.robotoMono.regular}
				></Text>
				<Outline
					key="outline"
					outlineTransparency={lerpBinding(transition, 1, 0.5)}
					innerThickness={rem(4, "pixel")}
					outerThickness={rem(2, "pixel")}
					innerColor={color}
					cornerRadius={new UDim(0, rem(1))}
				/>
			</Frame>

			<Image
				key="icon"
				aspectRatio={1}
				image={icon}
				imageColor={lerpBinding(transition, palette.text, color)}
				anchorPoint={new Vector2(0.5, 0.5)}
				size={new UDim2(1.2, 0, 1.2, 0)}
				position={new UDim2(0, 0, 0.5, 0)}
			/>
		</Frame>
	);
};
