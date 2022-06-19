const guessedLettersElemnet = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

//Function to ADD and display placeholders for each letter of the word
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


guessLetterButton.addEventListener ("click", function(e){
    e.preventDefault();
    //Empty message element
    message.innerText = "";
    //Varibale to capute the value of the input
    const guess = letterInput.value;
    console.log(guess);
    //Check that it is a single letter
    const goodGuess = validateInput(guess);

    if (goodGuess) {
        //The input is a letter
        makeGuess(guess);
    }

    letterInput.value = "";
});

//Function to validate player's input - function (input)
const validateInput = function (input) {
    //Function that accepts letter sequence
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        //Check if the input is empty
        message.innerText = "Please enter a letter.";
     } else if (input.length > 1) {
            //Check if the input has more than 1 letter
            message.innerText = "Please enter a single letter at a time.";
        } else if (!input.match(acceptedLetter)) {
            //check if the input used a character that is not a letter.
            message.innerText = "Please use a letter from A to Z.";
        } else {
            //returns the letter entered as an input
            return input;
        }
};

//Function to capture Input
const makeGuess = function (guess) {
    //convert letter parameter to upper case.
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You have already tried this letter. Please select a different letter.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};