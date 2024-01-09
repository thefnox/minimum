export enum PlayerGameState {
	Connected,
	Playing,
	Dead,
	Spawning,
	Disconnected,
	Ready,
	Reviving,
	Revived,
}

export const translatePlayerState = (state: number | PlayerGameState) => {
	const names = ["Connected", "Playing", "Dead", "Spawning", "Disconnected", "Ready", "Reviving", "Revived"];

	return names[state];
};
