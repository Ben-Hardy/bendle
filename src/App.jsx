import { useState, useCallback, useEffect } from 'react'
import './App.css'
import GuessLetter from './components/GuessLetter';
import Game from './game';
import words from "./words.js";

let game = new Game();
function App() {
	
	const w = words;
	const [letters, setLetters] = useState(game.guesses);
	const [curLetter, setCurLetter] = useState(game.cl);
	const [curGuess, setCurGuess] = useState(game.cg);
	const [curColours, setCurColours] = useState(game.colours);
	const [winnerVisible, setWinnerVisible] = useState(false);
	const [loserVisible, setLoserVisible] = useState(false);

	function updateState() {
		game.cl = curLetter;
		game.cg = curGuess;
		let updatedGuess = [...letters];
		if (updatedGuess[game.cg][game.cl] === "_") {
			updatedGuess[game.cg][game.cl] = game.guessLetter;
		}

		if (game.cl < 4) {
			game.cl++;
		}

		setLetters(updatedGuess);
		game.guesses = updatedGuess;
		setCurLetter(game.cl);
		
	}

	/*const keyInputHandler = useCallback((event) => {
		const alphabet = "abcdefghijklmnopqrstuvwxyz";
		if (alphabet.includes(event.key)) {
			guessLetter = event.key;
			updateState();
			console.log(event.key);
		}

		if (event.key === "Backspace") {
			backSpacePressed();
		}

	})*/

	useEffect(() => {
		const keyInputHandler = (e) => {
			const alphabet = "abcdefghijklmnopqrstuvwxyz";
			if (alphabet.includes(e.key)) {
				game.guessLetter = e.key;
				updateState();
				console.log(e.key);
			}

			if (e.key === "Backspace") {
				backSpacePressed();
			}
			
			if (e.key === "Enter") {
				enterPressed();
			}
		};
		document.addEventListener("keydown", keyInputHandler, false);
		
		return () => window.removeEventListener('keydown', keyInputHandler);
	}, []);


	function backSpacePressed() {
		game.cl = curLetter;
		game.cg = curGuess;
		let updatedGuess = [...letters];
		updatedGuess[game.cg][game.cl] = "_";

		if (game.cl > 0) {
			game.cl--;
		}

		setLetters(updatedGuess);
		setCurLetter(game.cl)
	}
	
	function enterPressed() {
		
		game.cg = curGuess;
		console.log(game.cg)
		game.colours = [...curColours];
		game.guesses = letters;
		let guessWord = [...letters][game.cg].join('').toLowerCase();

		if (!guessWord.includes("_")) {
			if (w.indexOf(guessWord) > -1) {
				console.log(guessWord);
				console.log(game.guesses);
				let result = game.assessGuess(guessWord);
				console.log(result);
	
				let updatedColours = [];
				
				[...result].forEach((c) => {
					if (c == "g") {
						updatedColours.push("green");
					} else if (c == "y") {
						updatedColours.push("yellow")
					} else {
						updatedColours.push("");
					}
				})
				
				game.colours[game.cg] = updatedColours;
				setCurColours(game.colours);
				if (game.cg < 6) {
					game.cg++;
					setCurGuess(game.cg)
					setCurLetter(0);
				}
				if (result === "ggggg") {
					setWinnerVisible(true);
					game.cg = 6
				} else if (result != "ggggg" && game.cg == 6) {
					setLoserVisible(true);
				}
			}
		} else if (!words.includes(guessWord)) {
			console.log("not a word!");
		}
	}

	var guessLetters = []
	for (let i = 0; i < 6; i++) {
		for (let j = 0; j < 5; j++) {
			guessLetters.push(<GuessLetter letter={letters[i][j]} colour={curColours[i][j] }key={i.toString() + j.toString()}/>);
		}
	}

	return (
		
		<div className='font-mono grid place-items-center'>
			<div className='text-center text-6xl py-4'>Bendle</div>
			<div className="text-3xl font-bold grid grid-cols-5 items-center ">
				{guessLetters}
			</div>
			<div className='text-3xl'>
				<button onClick={() => {
					game.guessLetter = "Q";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}>Q </button>

				<button onClick={() => {
					game.guessLetter = "W";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}>W</button>

				<button onClick={() => {
					game.guessLetter = "E";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}>E</button>
				<button onClick={() => {
					game.guessLetter = "R";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}>R</button>
				<button onClick={() => {
					game.guessLetter = "T";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}>T</button>
				<button onClick={() => {
					game.guessLetter = "Y";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}>Y</button>
				<button onClick={() => {
					game.guessLetter = "U";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}>U</button>
				<button onClick={() => {
					game.guessLetter = "I";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}>I</button>
				<button onClick={() => {
					game.guessLetter = "O";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}>O</button>
				<button onClick={() => {
					game.guessLetter = "P";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}>P</button>
				<button onClick={backSpacePressed}
				className={"border-2 rounded-md px-1 h-10 hover:bg-slate-100"}>{"<--"}</button>
				<br/>
				<button onClick={() => {

}}
className={"border-2 border-white rounded-md px-1 w-4 h-10 text-white"}>A</button>
				<button onClick={() => {
					game.guessLetter = "A";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}>A</button>
				<button onClick={() => {
					game.guessLetter = "S";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}>S</button>
				<button onClick={() => {
					game.guessLetter = "D";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}>D</button>

				<button onClick={() => {
					game.guessLetter = "F";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}>F</button>

				<button onClick={() => {
					game.guessLetter = "G";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}>G</button>

				<button onClick={() => {
					game.guessLetter = "H";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}>H</button>

				<button onClick={() => {
					game.guessLetter = "J";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}>J</button>

				<button onClick={() => {
					game.guessLetter = "K";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}>K</button>

				<button onClick={() => {
					game.guessLetter = "L";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}>L</button>
				<button onClick={enterPressed}
				className={"border-2 rounded-md px-1 h-10 hover:bg-slate-100"}>enter</button>
				<br/>
				<button onClick={() => {

				}}
				className={"border-2 border-white rounded-md px-1 w-10 h-10 text-white"}>A</button>
				<button onClick={() => {
					game.guessLetter = "Z";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}>Z</button>
				<button onClick={() => {
					game.guessLetter = "X";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}>X</button>
				<button onClick={() => {
					game.guessLetter = "C";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}>C</button>
				<button onClick={() => {
					game.guessLetter = "V";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}>V</button>
				<button onClick={() => {
					game.guessLetter = "B";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}>B</button>
				<button onClick={() => {
					game.guessLetter = "N";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}>N</button>
				<button onClick={() => {
					game.guessLetter = "M";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}>M</button>
			</div>
			{winnerVisible ? <p className='text-4xl'>You won!</p>: null}
			{loserVisible ? <p className='text-4xl'>Better luck next time!</p>: null}

		</div>
	)
}

export default App
