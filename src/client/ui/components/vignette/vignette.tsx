import { lerpBinding } from "@rbxts/pretty-react-hooks";
import React, { useEffect } from "@rbxts/react";
import { palette, images } from "client/ui/constants";
import { Image } from "../image";
import { springs } from "client/ui/constants/springs";
import { useMotion } from "client/ui/hooks";

export const Vignette = ({ open }: { open: boolean }) => {
	const [transition, transitionMotion] = useMotion(0);

	useEffect(() => {
		if (open !== undefined) {
			transitionMotion.spring(1, springs.molasses);
		} else {
			transitionMotion.spring(0, springs.molasses);
		}
	}, [open]);

	return (
		<Image
			image={images.ui.vignette}
			imageColor={palette.crust}
			imageTransparency={lerpBinding(transition, 1, 0)}
			backgroundColor={palette.crust}
			backgroundTransparency={lerpBinding(transition, 1, 0.8)}
			scaleType="Crop"
			size={new UDim2(1, 0, 1, 0)}
		/>
	);
};
