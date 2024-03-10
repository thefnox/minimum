import { Debugger, Loop, World, AnySystem } from "@rbxts/matter";
import { $env } from "rbxts-transform-env";
import { Context, HotReloader } from "@rbxts/rewire";
import Plasma from "@rbxts/plasma";
import { Renderable } from "shared/components";
import { ClientState } from "shared/constants/clientState";

const RunService = game.GetService("RunService");
const UserInputService = game.GetService("UserInputService");
const TextChatService = game.GetService("TextChatService");

export function start<S extends object>(
	containers: Array<Instance>,
	state: S,
): (...plugins: Array<(world: World, state: S) => void>) => World {
	const world = new World();
	const production = $env.string("ENV") === "production";

	// Set up debugging
	const myDebugger = new Debugger(Plasma);
	myDebugger.findInstanceFromEntity = (id): Model | undefined => {
		if (!world.contains(id)) return;

		const model = world.get(id, Renderable);

		return model ? model.model : undefined;
	};

	myDebugger.authorize = (player: Player): boolean => {
		const groupId = $env.number("GROUP_ID");
		const studio = RunService.IsStudio();
		if (groupId === undefined) {
			return studio;
		}
		const role = player.GetRoleInGroup(groupId);
		return studio || role === "Admin" || role === "Owner";
	};

	// Create game loop

	const loop = new Loop(world, state, myDebugger.getWidgets());

	// Set up hot reloading
	const hotReloader = new HotReloader();
	let firstRunSystems = new Array<AnySystem>();
	const systemsByModule = new Map<ModuleScript, AnySystem>();

	function loadModule(mod: ModuleScript, ctx: Context): void {
		const originalModule = ctx.originalModule;

		const [ok, system] = pcall(require, mod) as LuaTuple<[boolean, AnySystem]>;

		if (!ok) {
			warn("Error when hot-reloading system", mod.Name, system);
			return;
		}

		if (firstRunSystems) {
			firstRunSystems.push(system as AnySystem);
		} else if (systemsByModule.has(originalModule)) {
			loop.replaceSystem(systemsByModule.get(originalModule)!, system);
			myDebugger?.replaceSystem(systemsByModule.get(originalModule)!, system);
		} else {
			loop.scheduleSystem(system);
		}

		systemsByModule.set(originalModule, system);
	}

	function unloadModule(_: ModuleScript, ctx: Context): void {
		if (ctx.isReloading) return;

		const originalModule = ctx.originalModule;
		if (systemsByModule.has(originalModule)) {
			loop.evictSystem(systemsByModule.get(originalModule)!);
			systemsByModule.delete(originalModule);
		}
	}

	if (!production) {
		for (const container of containers) {
			hotReloader.scan(container, loadModule, unloadModule);
		}
	}

	loop.scheduleSystems(firstRunSystems);
	firstRunSystems = undefined!;

	if (myDebugger !== undefined) {
		myDebugger.autoInitialize(loop);
	}

	const events: {
		default: RBXScriptSignal;
		fixed?: RBXScriptSignal;
	} = RunService.IsClient()
		? {
				default: RunService.RenderStepped,
				fixed: RunService.Heartbeat,
			}
		: { default: RunService.Heartbeat };

	loop.begin(events);

	if (RunService.IsClient()) {
		UserInputService.InputBegan.Connect((input) => {
			if (input.KeyCode === Enum.KeyCode.F4) {
				if (RunService.IsStudio()) {
					myDebugger?.toggle();
					(state as ClientState).debugEnabled = !!(RunService.IsStudio() && myDebugger?.enabled);
				}
			}
		});
		let matterOpenCmd = TextChatService?.FindFirstChild("TextChatCommands")?.FindFirstChild("MatterOpenCmd") as
			| TextChatCommand
			| undefined;
		if (matterOpenCmd === undefined) {
			matterOpenCmd = new Instance("TextChatCommand");
			matterOpenCmd.Name = "MatterOpenCmd";
			matterOpenCmd.PrimaryAlias = "/matter";
			matterOpenCmd.SecondaryAlias = "/matterdebug";
			matterOpenCmd.Triggered.Connect(() => {
				myDebugger?.toggle();
			});
			matterOpenCmd.Parent = TextChatService?.FindFirstChild("TextChatCommands");
		}
	}

	return function (...plugins: Array<(world: World, state: S) => void>): World {
		for (const plugin of plugins) {
			plugin(world, state);
		}

		return world;
	};
}
