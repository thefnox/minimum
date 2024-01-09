import { World } from "@rbxts/matter";
import { Renderable, SpawnAnimated } from "shared/components";

const loadSpawnedAnimators = (world: World) => {
	for (const [id, { model }, { animation, animationSpeed }] of world.query(Renderable, SpawnAnimated)) {
		if (model === undefined) {
			continue;
		}
		let animationInstance = model.FindFirstChildOfClass("Animation");
		if (animationInstance === undefined && animation !== undefined) {
			animationInstance = new Instance("Animation");
			animationInstance.Parent = model;
			animationInstance.AnimationId = animation;
			let animationController = model.FindFirstChildOfClass("AnimationController") as AnimationController;
			if (!animationController) {
				animationController = new Instance("AnimationController");
				animationController.Parent = model;
			}
			let animator: Animator = animationController.FindFirstChild("Animator") as Animator;
			if (!animator) {
				animator = new Instance("Animator");
				animator.Parent = animationController;
			}
			const track = animator.LoadAnimation(animationInstance);
			track.Play(undefined, undefined, animationSpeed);
		}
	}
};

export = {
	system: loadSpawnedAnimators,
};
