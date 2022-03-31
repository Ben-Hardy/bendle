import { useState, useEffect, useRef } from 'react'
import './App.css'
import GuessLetter from './components/GuessLetter';
import Game from './game';
import words from "./words.js";

import { useKey } from "rooks";

let game = new Game();
function App() {
	const inputRef = useRef();

	const [letters, setLetters] = useState(game.guesses);
	const [curLetter, setCurLetter] = useState(game.cl);
	const [curGuess, setCurGuess] = useState(game.cg);
	const [curColours, setCurColours] = useState(game.colours);
	const [winnerVisible, setWinnerVisible] = useState(false);
	const [loserVisible, setLoserVisible] = useState(false);
	const [notWordVisible, setNotWordVisible] = useState(false);
	const [keyColours, setKeyColours] = useState(game.keyColours);

	function updateState() {
		if (!winnerVisible) {
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
	}

	function reset() {
		game = new Game();
		setLetters(game.guesses);
		setCurLetter(game.cl);
		setCurGuess(game.cg);
		setCurColours(game.colours)
		setWinnerVisible(false);
		setLoserVisible(false);
		setKeyColours(game.keyColours);
	}

	function backSpacePressed() {
		if (!winnerVisible) {
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
	}
	
	function enterPressed() {
		if (!winnerVisible) {
			game.cg = curGuess;
			game.colours = [...curColours];
			game.guesses = letters;
			let guessWord = [...letters][game.cg].join('').toLowerCase();

			if (!guessWord.includes("_")) {
				if (words.includes(guessWord)) {

					let result = game.assessGuess(guessWord);
		
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
					
					for (let i = 0; i < 5; i++) {
						if (result[i] == "g") {
							game.keyColours[guessWord[i]] = "green";
						} else if (result[i] == "y") {
							game.keyColours[guessWord[i]] = "yellow";
						} else {
							if (game.keyColours[guessWord[i]] === "") {
								game.keyColours[guessWord[i]] = "grey";
							}
							
						}
					}
					setKeyColours(game.keyColours);
					
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
						setCurGuess(game.cg);
					} else if (result != "ggggg" && game.cg == 6) {
						setLoserVisible(true);
					}
				} else {
					setNotWordVisible(true);
				}
			} 
		}
	}

	// a timer to show the "Not a word!" warning for 1 second
	useEffect(() => {
		let intervalID;
		if (notWordVisible) {
			intervalID = setInterval(() => { setNotWordVisible(false) }, 1500);

		}
		return () => clearInterval(intervalID);
	}, [notWordVisible])
	
	// keyboard stuff
	// I tried doing this myself but react makes this process a huge pain compared
	// to anything else I've used so I resorted to using a library.
	useKey(["Enter"], enterPressed);
	useKey(["Backspace"], backSpacePressed);
	useKey(["a", "A"], () => {
		game.guessLetter = "A";
		updateState();
	})
	useKey(["b", "B"], () => {
		game.guessLetter = "B";
		updateState();
	})
	useKey(["c", "C"], () => {
		game.guessLetter = "C";
		updateState();
	})
	useKey(["d", "D"], () => {
		game.guessLetter = "D";
		updateState();
	})
	useKey(["e", "E"], () => {
		game.guessLetter = "E";
		updateState();
	})
	useKey(["f", "F"], () => {
		game.guessLetter = "F";
		updateState();
	})
	useKey(["g", "G"], () => {
		game.guessLetter = "G";
		updateState();
	})
	useKey(["h", "H"], () => {
		game.guessLetter = "H";
		updateState();
	})
	useKey(["i", "I"], () => {
		game.guessLetter = "I";
		updateState();
	})
	useKey(["j", "J"], () => {
		game.guessLetter = "J";
		updateState();
	})
	useKey(["k", "K"], () => {
		game.guessLetter = "K";
		updateState();
	})
	useKey(["l", "L"], () => {
		game.guessLetter = "L";
		updateState();
	})
	useKey(["m", "M"], () => {
		game.guessLetter = "M";
		updateState();
	})
	useKey(["n", "N"], () => {
		game.guessLetter = "N";
		updateState();
	})
	useKey(["o", "O"], () => {
		game.guessLetter = "O";
		updateState();
	})
	useKey(["p", "P"], () => {
		game.guessLetter = "P";
		updateState();
	})
	useKey(["q", "Q"], () => {
		game.guessLetter = "Q";
		updateState();
	})
	useKey(["r", "R"], () => {
		game.guessLetter = "R";
		updateState();
	})
	useKey(["s", "S"], () => {
		game.guessLetter = "S";
		updateState();
	})
	useKey(["t", "T"], () => {
		game.guessLetter = "T";
		updateState();
	})
	useKey(["u", "U"], () => {
		game.guessLetter = "U";
		updateState();
	})
	useKey(["v", "V"], () => {
		game.guessLetter = "V";
		updateState();
	})
	useKey(["w", "W"], () => {
		game.guessLetter = "W";
		updateState();
	})
	useKey(["x", "X"], () => {
		game.guessLetter = "X";
		updateState();
	})
	useKey(["y", "Y"], () => {
		game.guessLetter = "Y";
		updateState();
	})
	useKey(["z", "Z"], () => {
		game.guessLetter = "Z";
		updateState();
	})
	

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
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}
				style={{background: keyColours["q"]}}
				>Q </button>

				<button onClick={() => {
					game.guessLetter = "W";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}
				style={{background: keyColours["w"]}}>W</button>

				<button onClick={() => {
					game.guessLetter = "E";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}
				style={{background: keyColours["e"]}}
				>E</button>
				<button onClick={() => {
					game.guessLetter = "R";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}
				style={{background: keyColours["r"]}}
				>R</button>
				<button onClick={() => {
					game.guessLetter = "T";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}
				style={{background: keyColours["t"]}}
				>T</button>
				<button onClick={() => {
					game.guessLetter = "Y";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}
				style={{background: keyColours["y"]}}
				>Y</button>
				<button onClick={() => {
					game.guessLetter = "U";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}
				style={{background: keyColours["u"]}}
				>U</button>
				<button onClick={() => {
					game.guessLetter = "I";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}
				style={{background: keyColours["i"]}}
				>I</button>
				<button onClick={() => {
					game.guessLetter = "O";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}
				style={{background: keyColours["o"]}}
				>O</button>
				<button onClick={() => {
					game.guessLetter = "P";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}
				style={{background: keyColours["p"]}}
				>P</button>
				<button onClick={backSpacePressed}
				className={"border-2 rounded-md px-1 h-10 hover:bg-slate-100"}>{"<--"}</button>
				<br/>
				<button onClick={() => {

				}}
				className={"border-2 border-white rounded-md px-1 w-4 h-10 text-white"}
				>A</button>
				<button onClick={() => {
					game.guessLetter = "A";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}
				style={{background: keyColours["a"]}}
				>A</button>
				<button onClick={() => {
					game.guessLetter = "S";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}
				style={{background: keyColours["s"]}}>S</button>
				<button onClick={() => {
					game.guessLetter = "D";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}
				style={{background: keyColours["d"]}}
				>D</button>

				<button onClick={() => {
					game.guessLetter = "F";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}
				style={{background: keyColours["f"]}}
				>F</button>

				<button onClick={() => {
					game.guessLetter = "G";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}
				style={{background: keyColours["g"]}}
				>G</button>

				<button onClick={() => {
					game.guessLetter = "H";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}
				style={{background: keyColours["h"]}}
				>H</button>

				<button onClick={() => {
					game.guessLetter = "J";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}
				style={{background: keyColours["j"]}}
				>J</button>

				<button onClick={() => {
					game.guessLetter = "K";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}
				style={{background: keyColours["k"]}}
				>K</button>

				<button onClick={() => {
					game.guessLetter = "L";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}
				style={{background: keyColours["l"]}}
				>L</button>
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
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}
				style={{background: keyColours["z"]}}
				>Z</button>
				<button onClick={() => {
					game.guessLetter = "X";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}
				style={{background: keyColours["x"]}}
				>X</button>
				<button onClick={() => {
					game.guessLetter = "C";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}
				style={{background: keyColours["c"]}}
				>C</button>
				<button onClick={() => {
					game.guessLetter = "V";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}
				style={{background: keyColours["v"]}}
				>V</button>
				<button onClick={() => {
					game.guessLetter = "B";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}
				style={{background: keyColours["b"]}}
				>B</button>
				<button onClick={() => {
					game.guessLetter = "N";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}
				style={{background: keyColours["n"]}}
				>N</button>
				<button onClick={() => {
					game.guessLetter = "M";
					updateState();
				}}
				className={"border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100"}
				style={{background: keyColours["m"]}}
				>M</button>
			</div>
			{notWordVisible ? <p className='text-4xl'>Not a word!</p>: null}
			{winnerVisible ? <p className='text-4xl'>You won!</p>: null}
			{loserVisible ? <p className='text-4xl'>The word was {game.word}. Better luck next time!</p>: null}
			{winnerVisible || loserVisible ? 
			<button className={"border-2 rounded-md px-1 my-8 hover:bg-slate-100"}
			onClick={reset}
			>
				Play again?</button>
			: null}
			<input ref={inputRef} />

		</div>
	)
}

export default App
