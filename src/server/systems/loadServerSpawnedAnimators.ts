import { World } from "@rbxts/matter";
import { Renderable, SpawnAnimatedServerside, TrackSync } from "shared/components";

const Workspace = game.GetService("Workspace");

const loadServerSpawnedAnimators = (world: World) => {
	for (const [id, animated] of world.queryChanged(SpawnAnimatedServerside)) {
		if (!world.contains(id)) continue;
		const renderable = world.get(id, Renderable);
		if (renderable) {
			let animation = renderable.model.FindFirstChildOfClass("Animation");
			if (!animation && animated.new?.animation) {
				animation = new Instance("Animation");
				animation.Parent = renderable.model;
				animation.AnimationId = animated.new?.animation;
			}
			let animationController = renderable.model.FindFirstChildOfClass(
				"AnimationController",
			) as AnimationController;
			if (!animationController) {
				animationController = new Instance("AnimationController");
				animationController.Parent = renderable.model;
			}
			let animator: Animator = animationController.FindFirstChild("Animator") as Animator;
			if (!animator) {
				animator = new Instance("Animator");
				animator.Parent = animationController;
			}
			if (animation) {
				const track = animator.LoadAnimation(animation);
				track.Play(undefined, undefined, animated.new?.animationSpeed);
				track.KeyframeReached.Connect((keyframe: string) => {
					if (world.contains(id)) {
						world.insert(
							id,
							TrackSync({ serverTime: Workspace.GetServerTimeNow(), trackTime: track.TimePosition }),
						);
					}
				});
			}
		}
	}
};

export = {
	system: loadServerSpawnedAnimators,
};
