import { World } from "@rbxts/matter";
import { LocalClient, PlayerModel, ReceiveForce } from "shared/components";

const pushPlayer = (world: World) => {
	for (const [id, { force }, { character }] of world.query(ReceiveForce, PlayerModel, LocalClient)) {
		const primaryPart = character?.PrimaryPart;
		if (primaryPart === undefined) {
			continue;
		}
		primaryPart.ApplyImpulse(force);
		world.remove(id, ReceiveForce);
	}
};

export = {
	system: pushPlayer,
};
