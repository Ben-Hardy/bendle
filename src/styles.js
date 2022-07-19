export default class Styles {
	constructor() {
		// background/main container styles
		this.backgroundStyle = "h-screen bg-white";
		this.backgroundStyleDM = "h-screen bg-zinc-800";
		this.letterGridContainerStyle = "font-mono grid place-items-center";
		this.letterGridContainerStyleDM = "font-mono grid place-items-center bg-zinc-800 text-white";

		// Main UI component styles
		this.titleStyle = "text-center text-4xl py-4";
		this.gridStyle = "text-3xl  grid grid-cols-5 items-center w-72";
		this.notAWordBoxStyle = "bg-white text-red-600 z-40 text-4xl py-4 fixed w-full grid place-items-center";
		this.notAWordBoxStyleDM = "bg-zinc-800 text-red-600 z-40 text-4xl py-4 fixed w-full grid place-items-center";
		this.smallLabelsStyle = "pt-2";
		this.resetButtonStyle = "border-2 rounded-md px-2 mt-8 hover:bg-slate-100";
		this.resetButtonStyleDM = "border-2 rounded-md px-2 mt-8 hover:bg-zinc-400";
		this.checkBoxStyle = "px-2";

		// keyboard styles
		this.letterKeyStyleDM = "border-2 rounded-md px-1 md:mx-1 w-8 h-10 hover:bg-zinc-400 text-2xl text-white";
		this.letterKeyStyle = "border-2 rounded-md px-1 md:mx-1 w-8 h-10 hover:bg-slate-100 text-2xl";
		this.keyboardContainerStyle = "sm:text-lg text-2xl lg:text-6xl";
		this.keyboard2ndRowSpacerStyle = "border-2 border-white rounded-md px-1 w-4 h-10 text-white";
		this.keyboard2ndRowSpacerStyleDM = "border-2 border-zinc-800 rounded-md px-1 w-4 h-10 text-zinc-800";
		this.keyboardBotRowSpacerStyle = "border-2 text-2xl rounded-md px-1 h-10 w-10 hover:bg-slate-100";
		this.keyboardBotRowSpacerStyleDM = "border-2 text-2xl rounded-md px-1 h-10 w-10 hover:bg-zinc-400";
		this.backspaceKeyStyle = "border-2 text-2xl rounded-md px-1 h-10 w-10 hover:bg-slate-100";
		this.backspaceKeyStyleDM = "border-2 text-2xl rounded-md px-1 h-10 w-10 hover:bg-zinc-400";

		// colours
		this.green = "#27a11f";
		this.yellow = "#a39726";
		this.grey = "#858585";
	}
}