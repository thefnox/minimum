import { component } from "@rbxts/matter";

/**
 * Makes an entity be owned network-wise by the server
 */
export const ServerOwned = component<{}>("ServerOwned");
export type ServerOwned = ReturnType<typeof ServerOwned>;
