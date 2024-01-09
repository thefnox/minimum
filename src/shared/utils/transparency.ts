export const SetTransparency = (model: Model, transparency: number) => {
	const part = model.PrimaryPart;
	if (!part) return;
	if (part.Name !== "HumanoidRootPart") {
		if (part.GetAttribute("_originalTransparency") === undefined) {
			part.SetAttribute("_originalTransparency", (part as BasePart).Transparency);
		}
		part.Transparency = transparency;
	}
	for (const child of model.GetDescendants()) {
		if ((child.IsA("BasePart") || child.IsA("Decal")) && child.Name !== "HumanoidRootPart") {
			if (child.GetAttribute("_originalTransparency") === undefined) {
				child.SetAttribute("_originalTransparency", (child as BasePart).Transparency);
			}
			(child as BasePart).Transparency = transparency;
		}
	}
};

export const ResetTransparency = (model: Model) => {
	const part = model.PrimaryPart;
	if (!part) return;
	if (part.Name !== "HumanoidRootPart" && part.GetAttribute("_originalTransparency") !== undefined) {
		part.Transparency = part.GetAttribute("_originalTransparency") as number;
	}
	for (const child of model.GetDescendants()) {
		if (
			(child.IsA("BasePart") || child.IsA("Decal")) &&
			child.Name !== "HumanoidRootPart" &&
			child.GetAttribute("_originalTransparency") !== undefined
		) {
			(child as BasePart).Transparency = child.GetAttribute("_originalTransparency") as number;
		}
	}
};
