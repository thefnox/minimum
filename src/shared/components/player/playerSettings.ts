import { component } from "@rbxts/matter";
import { CurrentPlayerSave } from "shared/constants/playerSave";

export const PlayerSettings = component<CurrentPlayerSave["settings"]>("PlayerSettings", {
	sfxVolume: 0.5,
	musicVolume: 0.5,
	musicEnabled: true,
});
export type PlayerSettings = ReturnType<typeof PlayerSettings>;
