import Roact, { forwardRef, Ref } from "@rbxts/roact";

export interface FrameProps<T extends Instance = Frame> extends Roact.PropsWithChildren {
	ref?: Roact.Ref<T>;
	event?: Roact.JsxInstanceEvents<T>;
	change?: Roact.JsxInstanceChangeEvents<T>;
	size?: UDim2 | Roact.Binding<UDim2>;
	minSize?: Vector2 | Roact.Binding<Vector2>;
	maxSize?: Vector2 | Roact.Binding<Vector2>;
	position?: UDim2 | Roact.Binding<UDim2>;
	automaticSize?: Enum.AutomaticSize | Roact.Binding<Enum.AutomaticSize>;
	anchorPoint?: Vector2 | Roact.Binding<Vector2>;
	rotation?: number | Roact.Binding<number>;
	backgroundColor?: Color3 | Roact.Binding<Color3>;
	backgroundTransparency?: number | Roact.Binding<number>;
	clipsDescendants?: boolean | Roact.Binding<boolean>;
	visible?: boolean | Roact.Binding<boolean>;
	zIndex?: number | Roact.Binding<number>;
	layoutOrder?: number | Roact.Binding<number>;
	cornerRadius?: UDim | Roact.Binding<UDim>;
}

export const Frame = forwardRef((props: FrameProps, ref: Ref<Frame>) => {
	return (
		<frame
			ref={ref}
			AutomaticSize={props.automaticSize}
			Size={props.size}
			Position={props.position}
			AnchorPoint={props.anchorPoint}
			Rotation={props.rotation}
			BackgroundColor3={props.backgroundColor}
			BackgroundTransparency={props.backgroundTransparency}
			ClipsDescendants={props.clipsDescendants}
			Visible={props.visible}
			ZIndex={props.zIndex}
			LayoutOrder={props.layoutOrder}
			BorderSizePixel={0}
			Event={props.event || {}}
			Change={props.change || {}}
		>
			{props.cornerRadius && <uicorner key="corner" CornerRadius={props.cornerRadius} />}
			{(props.minSize !== undefined || props.maxSize !== undefined) && (
				<uisizeconstraint key="minsize" MinSize={props.minSize} MaxSize={props.maxSize} />
			)}
			{props.children}
		</frame>
	);
});
