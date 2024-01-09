import { AnyEntity, component } from "@rbxts/matter";

/**
 * A way to track RbxScriptConnections and other signals for proper disposal
 */
export const ConnectedSignals = component<{ signals: RBXScriptConnection[] }>("ConnectedSignals", { signals: [] });
export type ConnectedSignals = ReturnType<typeof ConnectedSignals>;
