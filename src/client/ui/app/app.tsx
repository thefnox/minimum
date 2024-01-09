import Roact from "@rbxts/roact";

import { ErrorHandler } from "../components/errorHandler";
import { Layer } from "../components/layer";
import { PlayerStats } from "../containers/playerStats";

export function App() {
	return (
		<ErrorHandler>
			<Layer key="hud-layer">
				<PlayerStats key="player-stats" />
			</Layer>
		</ErrorHandler>
	);
}
