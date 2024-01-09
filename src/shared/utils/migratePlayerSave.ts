import { AnySave, CurrentPlayerSave, CurrentSaveVersion, PlayerSaveV1 } from "../constants/playerSave";

export const migratePlayerSave = (playerSave: AnySave): CurrentPlayerSave => {
	const currentSave: AnySave = playerSave;
	playerSave.version = CurrentSaveVersion;
	return currentSave as CurrentPlayerSave;
};
