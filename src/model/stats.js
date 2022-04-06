import Cookies from "js-cookie"

export default class Stats {
	constructor() {
		this.curScore = 0;
		this.highScore = this.loadScore();
		this.prevWord = "";

		if (Cookies.get('highScore') == undefined) {
			Cookies.set('highScore', 0);
		}
	}

	saveScore() {
		Cookies.set('highScore', this.highScore);
	}

	loadScore() {
		return Cookies.get('highScore');
	}
}