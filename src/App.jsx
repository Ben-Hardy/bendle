import { useState, useEffect} from 'react'
import './App.css'
import GuessLetter from './components/GuessLetter';
import Game from './model/game';
import Words from "./model/words";

import { useKey } from "rooks";
import Stats from './model/stats';

let game = new Game();
let stats = new Stats();
const words = new Words();

function App() {
	/*
		The state hooks for the game:
		letters: the letters shown in the 6 guess slots
		curColours: the background colours for each letter in the guess slots
		notAWordVisible: a flag to show if a guess was not in the dictionary of words
		keyColours: the set of colours for each keyboard key's background
		timeLeft: the time remaining on the timer for each round of the game
		curScore: the current score of the game. goes up by 1 each time you guess a word correctly
		highScore: the best score you've managed in a session. updates whenever the player loses or resets
		prevWord: the previous round's word. this displays at the top of the game after a round has been finished
	*/

	const [letters, setLetters] = useState(game.guesses);
	const [curColours, setCurColours] = useState(game.colours);
	const [notAWordVisible, setNotAWordVisible] = useState(false);
	const [keyColours, setKeyColours] = useState(game.keyColours);
	const [timeLeft, setTimeLeft] = useState(game.GAMELENGTH);
	const [curScore, setCurScore] = useState(stats.curScore);
	const [highScore, setHighScore] = useState(stats.highScore);
	const [prevWord, setPrevWord] = useState(stats.prevWord);

	/*
		updateState does as its name implies; it updates the model's state whenever a change
		to the gamestate happens either by a button being pressed or a key being hit. It 
		generally handles the changes that occur within a single guess since enterPressed
		handles the logic for processing inputted guesses
	*/
	function updateState() {
		let updatedGuess = [...letters];
		
		if (updatedGuess[game.cg][game.cl] === "_") {
			updatedGuess[game.cg][game.cl] = game.guessLetter;
		} else if (game.cl === 4) {
			return;
		} else {
			game.cl++;
			updatedGuess[game.cg][game.cl] = game.guessLetter;
		}

		setLetters(updatedGuess);
		game.guesses = updatedGuess;
	}

	/*
		resets the state of the game by simply creating a new game then updating the relevant state
		hooks to be default values
	*/
	function reset() {
		game = new Game();
		setLetters(game.guesses);
		setCurColours(game.colours) 
		setKeyColours(game.keyColours);
		setTimeLeft(game.GAMELENGTH);
	}

	// handles the logic for when the reset button is hit. it computes the high score then calls reset
	function giveUp() {
		stats.prevWord = game.word
		setPrevWord(stats.prevWord);
		if (stats.curScore > stats.highScore) {
			stats.highScore = stats.curScore;
			setHighScore(stats.curScore);
		}
		stats.curScore = 0
		setCurScore(stats.curScore);
		reset();
	}


	/*
		processes when the backspace key is hit. it clears the current letter's input then moves 
		the current guess's current letter back one if several conditions are met to prevent it
		from going out of bounds
	*/
	function backSpacePressed() {
		if (game.cl === 0 && letters[game.cg][game.cl] === "_") {
			return;
		}
		let updatedGuess = [...letters];
		updatedGuess[game.cg][game.cl] = "_";

		if (game.cl > 0) {
			game.cl--;
		}

		setLetters(updatedGuess);
	}
	
	/*
		Handles the enter key being hit. As such it also deals with the logic
		required to input a complete guess. It checks if all 5 letters are used
		then makes sure that the word included is valid. If the guess is not a word,
		the function triggers the view to show the "not a word" warning.
		
		if a guess is valid, then the function passes the word to the game model's word 
		assessment function. After that, the output of the assessment is handled either 
		by updating the model and view or by ending the game if the guess is correct.
	*/
	function enterPressed() {
		game.colours = [...curColours];
		game.guesses = letters;
		let guessWord = [...letters][game.cg].join('').toLowerCase();

		if (!guessWord.includes("_")) {
			if (words.dictWords.includes(guessWord)) {

				let result = game.assessGuess(guessWord);
	
				let updatedColours = [];
				
				[...result].forEach((c) => {
					if (c == "g") {
						updatedColours.push("#42fc35");
					} else if (c == "y") {
						updatedColours.push("#ffec40")
					} else {
						updatedColours.push("");
					}
				})
				
				for (let i = 0; i < 5; i++) {
					if (result[i] == "g") {
						game.keyColours[guessWord[i]] = "#42fc35";
					} else if (result[i] == "y") {
						game.keyColours[guessWord[i]] = "#ffec40";
					} else {
						if (game.keyColours[guessWord[i]] === "") {
							game.keyColours[guessWord[i]] = "#c2c2c2";
						}
						
					}
				}
				setKeyColours(game.keyColours);
				
				game.colours[game.cg] = updatedColours;
				setCurColours(game.colours);
				if (game.cg < 6) {
					game.cg++;
					game.cl = 0
				}
				if (result === "ggggg") {
					stats.prevWord = game.word
					setPrevWord(stats.prevWord);
					stats.curScore++;
					setCurScore(stats.curScore);
					reset();
				} else if (result != "ggggg" && game.cg == 6) {
					stats.prevWord = game.word
					setPrevWord(stats.prevWord);
					if (stats.curScore > stats.highScore) {
						setHighScore(stats.curScore);
					}
					stats.curScore = 0
					setCurScore(stats.curScore);
					reset();
				}
			} else {
				setNotAWordVisible(true);
			}
		} 
		
	}

	/*
		An effect hook that handles the countdown timer for the game.
		after game.GAMELENGTH amount of time has passed, it resets the game.
		*/
	useEffect(() => {
		let intervalID;
		if (timeLeft === -1) {
			stats.prevWord = game.word;
			setPrevWord(stats.prevWord);
			if (stats.curScore > stats.highScore) {
				setHighScore(stats.curScore);
			}
			stats.curScore = 0
			setCurScore(stats.curScore);
			reset();
		} else {
			intervalID = setInterval(() => {
				setTimeLeft(timeLeft => timeLeft - 1);
			}, 1000);
	}

		return () => clearInterval(intervalID);
	})

	/*
		a timer effect to show the "Not a word!" warning for 1.5 seconds
	*/
	useEffect(() => {
		let intervalID;
		if (notAWordVisible) {
			intervalID = setInterval(() => { setNotAWordVisible(false) }, 1500);

		}
		return () => clearInterval(intervalID);
	}, [notAWordVisible])

	// keyboard stuff
	// I tried doing this myself but react hooks make this process a huge pain compared
	// to anything else I've used so I resorted to using a library for now.
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

	const letterKeyStyle = "border-2 rounded-md px-1 w-8 h-10 hover:bg-slate-100 text-2xl";

	// a small inner component to handle creating an onscreen keyboard key
	// a couple keys had to be done separately not using this since they used
	// custom logic
	const LetterKey = (props) => {
		return (
			<button onClick={() => {
				game.guessLetter = props.cap;
				updateState();
			}}
			className={letterKeyStyle}
			style={{background: keyColours[props.small]}}

			onTouchEnd={() => {
				game.guessLetter = props.cap;
				updateState();
			}}
			>{props.cap} </button>
		)
	}

	let keyboard = <div className='sm:text-lg text-2xl lg:text-6xl'>
		<LetterKey cap={"Q"} small={"q"}/>
		<LetterKey cap={"W"} small={"w"}/>
		<LetterKey cap={"E"} small={"e"}/>
		<LetterKey cap={"R"} small={"r"}/>
		<LetterKey cap={"T"} small={"t"}/>
		<LetterKey cap={"Y"} small={"y"}/>
		<LetterKey cap={"U"} small={"u"}/>
		<LetterKey cap={"I"} small={"i"}/>
		<LetterKey cap={"O"} small={"o"}/>
		<LetterKey cap={"P"} small={"p"}/>
		
		<br/>
		<button 
		className={"border-2 border-white rounded-md px-1 w-4 h-10 text-white"}
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

		<br/>
		<button onClick={enterPressed} onTouchEnd={enterPressed}
		className={"border-2 text-2xl rounded-md px-1 h-10 w-10 hover:bg-slate-100"}>⏎</button>
		<LetterKey cap={"Z"} small={"z"}/>
		<LetterKey cap={"X"} small={"x"}/>
		<LetterKey cap={"C"} small={"c"}/>
		<LetterKey cap={"V"} small={"v"}/>
		<LetterKey cap={"B"} small={"b"}/>
		<LetterKey cap={"N"} small={"n"}/>
		<LetterKey cap={"M"} small={"m"}/>
		<button onClick={backSpacePressed} onTouchEnd={backSpacePressed}
		className={"border-2 text-2xl rounded-md px-1 h-10 w-10 hover:bg-slate-100"}>⌫</button>
	</div>

	return (
		<div className='font-mono grid place-items-center'>
			<div className='text-center text-4xl py-4'>{prevWord === ""? "Bendle" : "Last word: " + prevWord}</div>
			<div className="text-3xl  grid grid-cols-5 items-center w-72">
				{guessLetters}
			</div>
			<p className="pt-2">Time Left: {timeLeft}</p>
			{notAWordVisible ? <p className='bg-white text-red-600 z-40 text-4xl py-4 fixed w-full grid place-items-center'>Not a word!</p>: null}
			<p className="pt-2">Current Streak: {curScore}</p>
			<p className="pt-2">Highest Streak: {highScore}</p>
			{keyboard}
			<button onClick={giveUp} onTouchEnd={giveUp} className={"border-2 rounded-md px-2 mt-8 hover:bg-slate-100"}>RESET</button>
		</div>
	)
}

export default App
