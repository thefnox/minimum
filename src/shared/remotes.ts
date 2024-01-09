import { Client, createRemotes, namespace, remote, Server, throttleMiddleware } from "@rbxts/remo";
import { AnyComponent } from "@rbxts/matter";
import { ComponentNames } from "shared/components/serde";

export const remotes = createRemotes({
	input: namespace({
		confirmLoaded: remote<Server, []>().middleware(throttleMiddleware({ throttle: 1 })),
	}),

	replication: namespace({
		replicationEvent: remote<Client, [entities: Map<string, Map<ComponentNames, { data: AnyComponent }>>]>(),
	}),
});
