import Roact from "@rbxts/roact";

import { Group } from "../group";

const RunService = game.GetService("RunService");

interface LayerProps extends Roact.PropsWithChildren {
	displayOrder?: number;
}

export function Layer({ displayOrder, children }: LayerProps) {
	return RunService.IsStudio() && !RunService.IsRunning() ? (
		<Group zIndex={displayOrder}>{children}</Group>
	) : (
		<screengui ResetOnSpawn={false} DisplayOrder={displayOrder} IgnoreGuiInset ZIndexBehavior="Sibling">
			{children}
		</screengui>
	);
}
