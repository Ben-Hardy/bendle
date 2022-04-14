import Cookies from "js-cookie"

export default class Stats {
	constructor() {
		if (Cookies.get('highScore') == undefined) {
			Cookies.set('highScore', 0, {expires: 365});
		}

		this.curScore = 0;
		this.highScore = this.loadScore();
		this.prevWord = "";


	}

	saveScore() {
		Cookies.set('highScore', this.highScore, {expires: 365});
	}

	loadScore() {
		return Cookies.get('highScore');
	}
}