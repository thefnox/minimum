const ContentProvider = game.GetService("ContentProvider");

const preloadedFonts: Font[] = [];

export const PreloadClientAssets = async () => {
	const tempLabels: TextLabel[] = [];
	return Promise.race([
		(async () => {
			await Promise.delay(5);
		})(),
		new Promise<void>((resolve) => {
			for (const font of preloadedFonts) {
				const tempLabel = new Instance("TextLabel");
				tempLabel.Text = "";
				tempLabel.Parent = game.Workspace;
				tempLabel.FontFace = font;
				tempLabels.push(tempLabel);
			}
			let count = preloadedFonts.size();
			ContentProvider.PreloadAsync([...tempLabels], (contentId, status) => {
				if (contentId !== undefined) {
					if (status === Enum.AssetFetchStatus.Success) {
						count--;
						print("Preloaded", contentId);
					} else if (status === Enum.AssetFetchStatus.TimedOut) {
						count--;
						print("Failed to preload", contentId);
					}
					if (count <= 0) {
						for (const label of tempLabels) {
							label.Destroy();
						}

						print("Client assets preloaded");
						resolve();
					}
				}
			});
		}),
	]);
};
