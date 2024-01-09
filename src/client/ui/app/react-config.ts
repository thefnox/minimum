const RunService = game.GetService("RunService");
declare const _G: { __DEV__: boolean };

if (RunService.IsStudio()) {
	_G.__DEV__ = true;
}
