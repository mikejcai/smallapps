;(function() {
	// Pure javascript score board app

	// Variablize player number in case of any future change 
	var players = 2; 

	// Initialize selectors
	var buttons = document.querySelectorAll("button");
	var setRound = document.querySelector("#winningScore");
	var playtoHTML = document.querySelector("p span");
	var scoresHTML = document.querySelectorAll("span");
	var resetButton = document.querySelector("#reset");

	// Initialize default scores and winning score
	var scores = [0, 0];
	var defaultWinningScore = 3;
	var winningScore = defaultWinningScore; // play up to this number of winning score

	// Checking if this player has won by reaching the winning score
	function checkWon(player) {
		return (scores[player] >= winningScore);
	}

	// checking if any player has won
	function checkAny() {
		return (checkWon(0) || checkWon(1));
	}

	// resetting scores to 0 and winning score to default value; 
	// also restoring HTML elements to default states
	function reset() {
		scores = [0, 0];
		winningScore = defaultWinningScore;

		for (var i = 0; i <= players - 1; i++) {
			scoresHTML[i].textContent = scores[i];
			scoresHTML[i].classList.remove("winner");
		}

	}

	// Initialize score board HTML
	for (var i = scoresHTML.length - 2; i >= 0; i--) {
		scoresHTML[i].textContent = scores[i];
	}

	playtoHTML.textContent = winningScore;
	setRound.value = winningScore;

	// =====================================================================
	// Event Handlers Start
	// 
	// get winningScore value when input changes
	setRound.addEventListener("change", function() {

		reset();
		winningScore = Number(setRound.value); 
		playtoHTML.textContent = winningScore;
		

	});

	// Add Event Listeners for the two buttons of the players
	for (var i = 0; i <= players - 1; i++) {

		// use IIFE to fix closure problem
		(function(j) {buttons[j].addEventListener("click", function() {

			// check if any player has won already; if so, do not make any change		
			if (checkAny()) {
				return null;
			} else {
				scores[j]++;
				scoresHTML[j].textContent = scores[j];

				// check if after this round this player has won
				if (checkWon(j)) {
					// if so, change winner score color by adding winner class
					scoresHTML[j].classList.add("winner");
				}
			}

		})}(i));

	}

	// Add event listener to the reset button
	resetButton.addEventListener("click", function() { 

		reset();
		winningScore = defaultWinningScore; 
		playtoHTML.textContent = winningScore;
		setRound.value = winningScore;
		

	});

	// -- End of Event Handlers Setting

}());