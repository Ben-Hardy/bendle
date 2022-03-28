export default class Game {
	
	constructor() {
		this.word = "HELLO";
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

		this.cl = 0;
		this.cg = 0;
		this.guessLetter = "";
	}

	assessGuess(guess) {
		let guessLetters = [...guess];
		let wordLetters = [...this.word];
		let result = [];
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