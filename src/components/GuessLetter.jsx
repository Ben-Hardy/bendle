export default function GuessLetter(props) {
	return (
		<div className="border-2 m-1 h-10 text-center w-12"
			style = {{backgroundColor: props.colour}}
		>
			<a style={{opacity: props.letter == "_" ? 0 : 1}}>{props.letter}</a>
		</div>
	)
}