import React from "@rbxts/react";
import { ErrorBoundary } from "./errorBoundary";
import { ErrorPage } from "./errorPage";

interface ErrorHandlerProps extends React.PropsWithChildren {}

export function ErrorHandler({ children }: ErrorHandlerProps) {
	return (
		<ErrorBoundary
			fallback={(message) => {
				return <ErrorPage message={message} />;
			}}
		>
			{children}
		</ErrorBoundary>
	);
}
