import words from "./words.js";

export default class Game {
	
	constructor() {
		this.word = words[Math.floor(Math.random() * words.length)];
		this.guesses = [["_", "_", "_", "_", "_"],
						["_", "_", "_", "_", "_"],
						["_", "_", "_", "_", "_"],
						["_", "_", "_", "_", "_"],
						["_", "_", "_", "_", "_"],
						["_", "_", "_", "_", "_"]];
		
		this.colours = [["", "", "", "", ""],
						["", "", "", "", ""],
						["", "", "", "", ""],
						["", "", "", "", ""],
						["", "", "", "", ""],
						["", "", "", "", ""]];

		this.keyColours = {"a": "", "b": "", "c": "", "d": "", "e": "", "f": "",
		"g": "", "h": "", "i": "", "j": "", "k": "", "l": "", "m": "", "n": "",
		"o": "", "p": "", "q": "", "r": "", "s": "", "t": "", "u": "", "v": "", 
		"w": "", "x": "", "y": "", "z": ""}

		this.cl = 0;
		this.cg = 0;
		this.guessLetter = "";
	}

	assessGuess(guess) {
		let guessLetters = [...guess];
		let wordLetters = [...this.word];
		let result = ["", "", "", "", ""];
		for (let i = 0; i < 5; i++) {
			if (guess[i] === this.word[i]) {
				result.push("g");
				wordLetters.splice(wordLetters.findIndex(l => l === guess[i]), 1);
			} else if (wordLetters.includes(guessLetters[i])) {
				result.push('y');
				wordLetters.splice(wordLetters.findIndex(l => l === guess[i]), 1);
			} else {
				result.push('b');
			}
		}
		return result.join("");
		
	}

}