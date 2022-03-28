import { useState } from "react"
export default function GuessLetter(props) {
	return (
		<div className="border-2 py-2 m-1  text-center underline w-8"
			style = {{backgroundColor: props.colour}}
		>
			{props.letter}
		</div>
	)
}