;(function(){
	// Pure JavaScript app for RGB Color Guessing Game

	// Initialize and default settings:
	var difficulty; 	// storing difficulty levels, could be easy or hard
	var easy =
		3;	// guessing from 3 divs
	var hard = 
		6;	// guessing from 6 divs
	var colorSet = 
		// an array storing the color codes for all divs
		[]; 
	var answer 
		// the index of the correct answer, so the color code for the correct answer will be colorSet[answer]
		;
	var gameover = 
		// marking gameover (guessed correctly)
		false; 
		
	// Selectors initialization
	var newGameTrigger = document.querySelector("#generate");
	var displayGround = document.querySelector("main");
	var questionHTML = document.querySelector("h2");
	var divHTML = "<div class='color-display'></div>";
	var easyHTML = document.querySelector("#easy");
	var hardHTML = document.querySelector("#hard");


	// get randomized RGB combination
	function randomizeRGB() {
		
		var colorCodes = [0, 0, 0];

		// get 3 random numbers from 0 to 255 and save to the array colorCodes
		for (var i = colorCodes.length - 1; i >= 0; i--) {
			colorCodes[i] = Math.floor(Math.random() * 256);
		}

		return colorCodes;

	}

	// select one of the produced color as the answer
	function setAnswer(difficulty) {
		return Math.floor(Math.random() * difficulty);
	}

	// Initialize the colors
	function init() {

		// reset colorSet
		colorSet = [];

		// initilize colorSet
		for (var i = 0; i < difficulty; i++) {
			colorSet.push(randomizeRGB());
		}
		
		// select one from the generated random colors to be the answer
		answer = setAnswer(difficulty); // the correct color code will be colorSet[answer]

		// Print out the RGB code to be guessed
		questionHTML.textContent = "RGB(" + colorSet[answer][0] + ', ' + colorSet[answer][1] + ', ' + colorSet[answer][2] + ")";

		document.querySelector("#answer").textContent = "Click the one you think is correct!";

		gameover = false;

	}

	// set div colors
	function setColor() {

		// reset color plates
		displayGround.innerHTML = '';

		// constructing color plates
		for (var i = 0; i < difficulty; i++) {
			displayGround.insertAdjacentHTML("beforeend", divHTML);
			document.querySelectorAll(".color-display")[i].style.background = "rgba(" + colorSet[i][0] + ', ' + colorSet[i][1] + ', ' + colorSet[i][2] + ", 1)";
			// document.querySelectorAll(".color-display")[i].insertAdjacentHTML("beforeend", "(" + colorSet[i][0] + ', ' + colorSet[i][1] + ', ' + colorSet[i][2] + ")");
		}
		
	}

	// Deal with clicking event on the color divs
	function setClickEvent() {

		for (var i = 0; i < difficulty; i++) {

			// use IIFE to fix closure
			(function(j) {document.querySelectorAll(".color-display")[j].addEventListener("click", function() {

					// if already guessed correct answer, clicking won't have any effect
					if (gameover) {
						return null;
					}

					if (j === answer) {
						// if guessed right
						for (var k = 0; k < difficulty; k++) {
							document.querySelectorAll(".color-display")[k].style.background = "rgba(" + colorSet[answer][0] + ', ' + colorSet[answer][1] + ', ' + colorSet[answer][2] + ", 1)";
						}

						// update answer message
						document.querySelector("#answer").textContent = "Correct!";

						// mark game over so that clicking won't have any effect
						gameover = true;

					} else {
						// if guessed wrong
						// use fading out effect
						var s = document.querySelectorAll(".color-display")[j].style;
						s.opacity = 1;
						(function fade(){(s.opacity-=.1)<0?s.display="none":setTimeout(fade,40)})();

						// update answer message
						document.querySelector("#answer").textContent = "Try again!";
					}
					

				});
			}(i));

		}

	}

	// packing necessary functions for new game initialization
	function constructColorGame(setDifficulty) {
		// set difficulty
		difficulty = setDifficulty;
		// initialize variables and create color divs
		init();
		setColor();
		setClickEvent();
	}


	// Initialize (for real)
	difficulty = easy; // default is easy
	constructColorGame(difficulty); 

	// ============================================================
	// Event Handlers

	// When clicking "New Game" in nav bar
	newGameTrigger.addEventListener("click", function() {
		constructColorGame(difficulty);
	});

	// when clicking "hard" or "easy" in nav bar
	easyHTML.addEventListener("click", function() {
		constructColorGame(easy);
	});

	hardHTML.addEventListener("click", function() {
		constructColorGame(hard);
	});


}());