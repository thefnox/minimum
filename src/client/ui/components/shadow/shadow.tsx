import { composeBindings } from "@rbxts/pretty-react-hooks";
import React from "@rbxts/react";
import { images } from "../../constants/images";

import { useRem } from "../../hooks";
import { Image } from "../image";

interface ShadowProps extends React.PropsWithChildren {
	shadowBlur?: number;
	shadowPosition?: number | React.Binding<number>;
	shadowSize?: number | UDim2 | React.Binding<number | UDim2>;
	shadowColor?: Color3 | React.Binding<Color3>;
	shadowTransparency?: number | React.Binding<number>;
	zIndex?: number;
}

const IMAGE_SIZE = new Vector2(512, 512);
const BLUR_RADIUS = 80;

export function Shadow({
	shadowBlur = 1,
	shadowPosition,
	shadowSize = 0,
	shadowColor = new Color3(),
	shadowTransparency = 0.5,
	zIndex = -1,
	children,
}: ShadowProps) {
	const rem = useRem();

	shadowPosition ??= rem(1);

	return (
		<Image
			image={images.ui.blur}
			imageTransparency={shadowTransparency}
			imageColor={shadowColor}
			anchorPoint={new Vector2(0.5, 0.5)}
			size={composeBindings(shadowSize, (size) => {
				const sizeOffsetScaled = rem(BLUR_RADIUS * shadowBlur, "pixel");

				if (typeIs(size, "UDim2")) {
					return new UDim2(1, sizeOffsetScaled, 1, sizeOffsetScaled).add(size);
				} else {
					return new UDim2(1, size + sizeOffsetScaled, 1, size + sizeOffsetScaled);
				}
			})}
			position={composeBindings(shadowPosition, (offset) => new UDim2(0.5, 0, 0.5, offset))}
			scaleType="Slice"
			sliceCenter={new Rect(IMAGE_SIZE.div(2), IMAGE_SIZE.div(2))}
			sliceScale={rem(shadowBlur, "pixel")}
			zIndex={zIndex}
		>
			{children}
		</Image>
	);
}
