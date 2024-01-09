const Players = game.GetService("Players");
const ReplicatedFirst = game.GetService("ReplicatedFirst");
const LocalPlayer = Players.LocalPlayer;
const gui = LocalPlayer.WaitForChild("PlayerGui");

const screenGui = new Instance("ScreenGui");
screenGui.IgnoreGuiInset = true;
screenGui.Parent = gui;

const textLabel = new Instance("TextLabel");
textLabel.Size = new UDim2(1, 0, 1, 0);
textLabel.BackgroundTransparency = 0;
textLabel.BackgroundColor3 = new Color3(0, 0, 0);
textLabel.Text = "";
textLabel.TextColor3 = new Color3(1, 1, 1);
textLabel.FontFace = Font.fromId(11702779409, Enum.FontWeight.Heavy);
textLabel.TextSize = 50;
textLabel.Parent = screenGui;

ReplicatedFirst.RemoveDefaultLoadingScreen();
task.wait(2);
if (!game.IsLoaded()) {
	game.Loaded.Wait();
}
screenGui.Destroy();
