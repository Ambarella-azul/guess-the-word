const guessedLettersElemnet = document.querySelector(".guessed-letters");
const buttonGuess = document.querySelector(".guess");
const guessLetterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

//Function to ADD placeholders for each letter of the word
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("*");
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);


buttonGuess.addEventListener ("click", function(e){
    e.preventDefault();

    //Varibale to capute the value of the input
    const guess = guessLetterInput.value;
    console.log(guess);
    guessLetterInput.value = "";
});