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
		let wordLetters = [...this.word];
		let result = ["", "", "", "", ""];
		for (let i = 0; i < 5; i++) {
			if (this.word[i] == guess[i]) {
				result[i] = "g";
				wordLetters.splice(wordLetters.indexOf(this.word[i]), 1);
			}
		}
		for (let i = 0; i < 5; i++) {
			if (result[i] == "") {
				if (wordLetters.includes(guess[i])) {
					result[i] = "y";
					wordLetters.splice(wordLetters.indexOf(guess[i]), 1);
				}
			}
		}

		for (let i = 0; i < 5; i++) {
			if (result[i] == "") {
				result[i] = "b";
			}
		}

		return result.join("");
	}

}