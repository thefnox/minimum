import Roact from "@rbxts/roact";
import { ErrorBoundary } from "./errorBoundary";
import { ErrorPage } from "./errorPage";

interface ErrorHandlerProps extends Roact.PropsWithChildren {}

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
