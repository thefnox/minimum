import { World } from "@rbxts/matter";
import { CommandContext } from "@rbxts/cmdr";

declare module "@rbxts/cmdr" {
	interface CommandContextWithWorld extends CommandContext {
		world?: World;
	}
}
