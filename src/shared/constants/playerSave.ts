export interface PlayerSaveV1 {
	version: 1;
	lastLogin: number;
	lastSave: number;
	settings: {
		sfxVolume: number;
		musicVolume: number;
		musicEnabled: boolean;
	};
}

export type AnySave = PlayerSaveV1;
export type CurrentPlayerSave = PlayerSaveV1;
export const CurrentSaveVersion = 1;
