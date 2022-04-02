import { useState, useEffect} from 'react'
import './App.css'
import GuessLetter from './components/GuessLetter';
import Game from './game';
import words from "./words.js";

import { useKey } from "rooks";

let game = new Game();
function App() {
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

	const letterKeyStyle = "border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100";

	const LetterKey = (props) => {
		return (
			<button onClick={() => {
				game.guessLetter = props.cap;
				updateState();
			}}
			className={letterKeyStyle}
			style={{background: keyColours[props.small]}}
			>{props.cap} </button>
		)
	}

	return (
		<div className='font-mono grid place-items-center dark:bg-slate-800 dark:text-white'>
			<div className='text-center text-6xl py-4'>Bendle</div>
			<div className="lg:text-3xl font-bold grid grid-cols-5 items-center ">
				{guessLetters}
			</div>
			<div className='sm:text-md text-3xl lg:text-6xl'>
				<LetterKey cap={"Q"} small={"q"}/>
				<LetterKey cap={"W"} small={"w"}/>
				<LetterKey cap={"E"} small={"e"}/>
				<LetterKey cap={"R"} small={"r"}/>
				<LetterKey cap={"T"} small={"t"}/>
				<LetterKey cap={"Y"} small={"y"}/>
				<LetterKey cap={"U"} small={"u"}/>
				<LetterKey cap={"I "} small={"i"}/>
				<LetterKey cap={"O"} small={"o"}/>
				<LetterKey cap={"P"} small={"p"}/>
				<button onClick={backSpacePressed}
				className={"border-2 rounded-md px-1 h-10 hover:bg-slate-100"}>{"<--"}</button>
				<br/>
				<button onClick={() => {

				}}
				className={"border-2 border-white rounded-md px-1 w-4 h-10 text-white dark:text-slate-800 dark:border-slate-800"}
				>A</button>

				<LetterKey cap={"A"} small={"a"}/>
				<LetterKey cap={"S"} small={"s"}/>
				<LetterKey cap={"D"} small={"d"}/>
				<LetterKey cap={"F"} small={"f"}/>
				<LetterKey cap={"G"} small={"g"}/>
				<LetterKey cap={"H"} small={"h"}/>
				<LetterKey cap={"J"} small={"j"}/>
				<LetterKey cap={"K"} small={"k"}/>
				<LetterKey cap={"L"} small={"l"}/>

				<button onClick={enterPressed}
				className={"border-2 rounded-md px-1 h-10 hover:bg-slate-100"}>enter</button>
				<br/>
				<button onClick={() => {

				}}
				className={"border-2 border-white rounded-md px-1 w-10 h-10 text-white dark:text-slate-800 dark:border-slate-800"}>A</button>
				
				<LetterKey cap={"Z"} small={"z"}/>
				<LetterKey cap={"X"} small={"x"}/>
				<LetterKey cap={"C"} small={"c"}/>
				<LetterKey cap={"V"} small={"v"}/>
				<LetterKey cap={"B"} small={"b"}/>
				<LetterKey cap={"N"} small={"n"}/>
				<LetterKey cap={"M"} small={"m"}/>

			</div>
			{notWordVisible ? <p className='text-4xl py-4'>Not a word!</p>: null}
			{winnerVisible ? <p className='text-4xl'>You won!</p>: null}
			{loserVisible ? <p className='text-4xl'>The word was {game.word}. Better luck next time!</p>: null}
			{winnerVisible || loserVisible ? 
			<button className={"border-2 rounded-md px-1 my-8 hover:bg-slate-100"}
			onClick={reset}
			>
				Play again?</button>
			: null}
			

		</div>
	)
}

export default App
