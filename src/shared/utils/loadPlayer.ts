import { AnyEntity, World } from "@rbxts/matter";
import { PlayerSave, PlayerSettings } from "../components";
import { migratePlayerSave } from "./migratePlayerSave";
import { CurrentPlayerSave, CurrentSaveVersion } from "../constants/playerSave";
import { GameAnalytics } from "@rbxts/gameanalytics";

const HttpService = game.GetService("HttpService");
const DataStore = game.GetService("DataStoreService");

export const loadPlayer = async (id: AnyEntity, player: Player, world: World) => {
	const PlayerDataStore = DataStore.GetDataStore("Player", `${player.UserId}`);
	const saveDefault: CurrentPlayerSave = {
		version: 1,
		lastLogin: 0,
		lastSave: 0,
		settings: {
			sfxVolume: 0.5,
			musicVolume: 0.5,
			musicEnabled: true,
		},
	};
	let saveJSON: CurrentPlayerSave = { ...saveDefault };
	try {
		const save = PlayerDataStore.GetAsync<string>("Save");
		if (save === undefined) {
			throw "Player save not found";
		}
		const json = HttpService.JSONDecode(save[0] ?? "{}") as CurrentPlayerSave;

		print("Loading Save", json, save);
		if ((json?.version ?? CurrentSaveVersion) === CurrentSaveVersion) {
			saveJSON = {
				...(json as CurrentPlayerSave),
				lastSave: json?.lastSave ?? 0,
				lastLogin: os.time(),
				version: CurrentSaveVersion,
			};
		} else if (json.version < CurrentSaveVersion) {
			// Run migrations
			saveJSON = migratePlayerSave(json);
		}
	} catch (err) {
		if (err !== "Player save not found") {
			warn(`Error retrieving ${player?.Name}'s store`, err);
			GameAnalytics.addErrorEvent(player.UserId, {
				severity: GameAnalytics.EGAErrorSeverity.error,
				message: `Error retrieving ${player?.Name}'s store: ${err}`,
			});
		}
	}
	const { settings } = saveJSON;

	world.insert(
		id,
		PlayerSettings({
			sfxVolume: settings?.sfxVolume ?? saveDefault.settings.sfxVolume,
			musicVolume: settings?.musicVolume ?? saveDefault.settings.musicVolume,
			musicEnabled: settings?.musicEnabled ?? saveDefault.settings.musicEnabled,
		}),
		PlayerSave({ playerId: player.UserId, save: saveJSON }),
	);
};
