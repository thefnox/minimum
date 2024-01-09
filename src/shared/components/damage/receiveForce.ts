import { AnyEntity, component } from "@rbxts/matter";

export const ReceiveForce = component<{ force: Vector3; inflictor?: AnyEntity }>("ReceiveForce");
export type ReceiveForce = ReturnType<typeof ReceiveForce>;
