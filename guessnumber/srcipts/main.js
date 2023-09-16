let target = Math.floor(Math.random()*100) + 1;

const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");

const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");

let guessCount = 1;
let resetButton;

function checkGuess(){
    var userGuess = Number(guessField.value);

    if (guessCount === 1) {
        guesses.textContent = "Previous guesses: ";
      }
    guesses.textContent += userGuess + " ";

    if(userGuess === target){
        lastResult.textContent = "Congratulations! You got it right!";
        lastResult.style.backgroundColor = "green";
        lowOrHi.textContent = "";
        setGameOver();
    }
    else if(guessCount === 5){
        lastResult.textContent = "!!!GAME OVER!!!";
        setGameOver();
    }
    else {
        //guesses.textContent += userGuess + " ";
        lastResult.textContent = "Wrong!";
        lastResult.style.backgroundColor = "red";
        if (userGuess < target) {
            lowOrHi.textContent = "Last guess was too low!";
        } 
        else {
            lowOrHi.textContent = "Last guess was too high!";
        }
    }
    guessCount++;
    guessField.value = "";
    guessField.focus();
}

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement("button");
    resetButton.textContent = "Start new game";
    document.body.appendChild(resetButton);
    resetButton.addEventListener("click", resetGame);
}

function resetGame(){
    
    guessCount = 1;
    guessField.disabled = false;
    guessSubmit.disabled = false;

    const resetParas = document.querySelectorAll(".resultParas p");
    for (const resetPara of resetParas) 
        resetPara.textContent = "";

    resetButton.parentNode.removeChild(resetButton);

    lastResult.style.backgroundColor = "white";

    guessField.value = "";
    guessField.focus();

    target = Math.floor(Math.random() * 100) + 1;
}

guessSubmit.addEventListener("click", checkGuess);