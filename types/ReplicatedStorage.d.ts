interface ReplicatedStorage extends Instance {
	Client: Folder & {
		ui: Folder;
		game: LocalScript;
		receiveReplication: ModuleScript;
		systems: Folder;
	};
	TS: Folder & {
		utils: Folder;
		systems: Folder;
		commands: Folder & {
			types: Folder;
		};
		setupTags: ModuleScript;
		start: ModuleScript;
	};
	rbxts_include: Folder & {
		RuntimeLib: ModuleScript;
		Promise: ModuleScript;
		node_modules: Folder;
	};
}
