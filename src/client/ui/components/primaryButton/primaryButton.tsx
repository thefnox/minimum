import { blend, lerpBinding } from "@rbxts/pretty-react-hooks";
import { composeBindings } from "@rbxts/pretty-react-hooks";
import React from "@rbxts/react";
import { images } from "../../constants/images";
import { palette } from "../../constants/palette";

import { useMotion, useRem } from "../../hooks";
import { Frame } from "../frame";
import { Image } from "../image";
import { Outline } from "../outline";
import { ReactiveButton } from "../reactiveButton";
import { Shadow } from "../shadow";

interface PrimaryButtonProps extends React.PropsWithChildren {
	readonly onClick?: () => void;
	readonly onHover?: (hovered: boolean) => void;
	readonly size?: UDim2 | React.Binding<UDim2>;
	readonly position?: UDim2 | React.Binding<UDim2>;
	readonly anchorPoint?: Vector2 | React.Binding<Vector2>;
	readonly overlayGradient?: ColorSequence | React.Binding<ColorSequence>;
	readonly overlayTransparency?: number | React.Binding<number>;
	readonly overlayRotation?: number | React.Binding<number>;
	readonly layoutOrder?: number | React.Binding<number>;
	readonly disabled?: boolean | React.Binding<boolean>;
	readonly clipsDescendants?: boolean;
}

export function PrimaryButton({
	onClick,
	onHover,
	size,
	position,
	anchorPoint,
	overlayGradient,
	overlayTransparency = 0,
	overlayRotation,
	clipsDescendants,
	layoutOrder,
	disabled,
	children,
}: PrimaryButtonProps) {
	const rem = useRem();
	const [hover, hoverMotion] = useMotion(0);

	return (
		<ReactiveButton
			onClick={() => !disabled && onClick?.()}
			onHover={(hovered) => {
				hoverMotion.spring(hovered ? 1 : 0);
				onHover?.(hovered);
			}}
			backgroundTransparency={1}
			anchorPoint={anchorPoint}
			size={size}
			position={position}
			layoutOrder={layoutOrder}
			clipsDescendants={clipsDescendants}
		>
			<Shadow
				key="drop-shadow"
				shadowSize={rem(2.5)}
				shadowBlur={0.2}
				shadowTransparency={lerpBinding(hover, 0.7, 0.4)}
				shadowPosition={rem(0.5)}
			/>

			<Frame
				key="background"
				backgroundTransparency={disabled ? 0.5 : 0}
				backgroundColor={disabled ? palette.subtext1 : palette.white}
				cornerRadius={new UDim(0, rem(1))}
				size={new UDim2(1, 0, 1, 0)}
			>
				<uigradient
					key="background-gradient"
					Offset={lerpBinding(hover, new Vector2(), new Vector2(0, 1))}
					Rotation={90}
					Transparency={new NumberSequence(0, 0.1)}
				/>
			</Frame>

			<Outline
				key="button-outline"
				cornerRadius={new UDim(0, rem(1))}
				innerTransparency={0}
				innerColor={disabled ? palette.black : palette.white}
			/>
			{!disabled && (
				<Image
					key="glow-overlay"
					image={images.ui.button_glow_top}
					imageTransparency={composeBindings(overlayTransparency, lerpBinding(hover, 0.3, 0), blend)}
					cornerRadius={new UDim(0, rem(1))}
					size={new UDim2(1, 0, 1, 0)}
				>
					<uigradient key="gradient" Color={overlayGradient} Rotation={overlayRotation} />
				</Image>
			)}

			{children}
		</ReactiveButton>
	);
}
