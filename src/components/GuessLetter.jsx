export default function GuessLetter(props) {
	return (
		<div className="border-2 m-1 h-10 text-center w-12"
			style = {{backgroundColor: props.colour, color: props.letter == "_" ? "white": "black"}}
		>
			{props.letter}
		</div>
	)
}