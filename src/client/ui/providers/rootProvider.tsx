import { ReflexProvider } from "@rbxts/react-reflex";
import React from "@rbxts/react";
import { store } from "client/store";

import { RemProvider, RemProviderProps } from "./remProvider";

interface RootProviderProps extends RemProviderProps {}

export function RootProvider({ baseRem, remOverride, children }: RootProviderProps) {
	return (
		<ReflexProvider producer={store}>
			<RemProvider key="rem-provider" baseRem={baseRem} remOverride={remOverride}>
				{children}
			</RemProvider>
		</ReflexProvider>
	);
}
