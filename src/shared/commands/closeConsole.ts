import { CmdrClient, CommandContext, CommandDefinition } from "@rbxts/cmdr";

const command: CommandDefinition = {
	Name: "close",
	Aliases: ["exit"],
	Description: "Closes the console",
	Args: [],
	ClientRun: (context: CommandContext) => {
		const clientCmdr = context.Cmdr as CmdrClient;
		clientCmdr.Toggle();
		return "Closing the console";
	},
};

export = command;
