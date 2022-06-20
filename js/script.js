const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

//Fire off the game
getWord();

//Function to ADD and display placeholders for each letter of the word
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
       // console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

guessLetterButton.addEventListener ("click", function (e) {
    e.preventDefault();
    //Empty message element
    message.innerText = "";
    //Varibale to capute the value of the input
    const guess = letterInput.value;
    //console.log(guess);
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
        //calling the function so letters display when it hasn't been played before.
        updateGuessesRemaining(guess);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

//Function to update the page with the letters the player guesses
const showGuessedLetters = function () {
    //Empty HTML of ul
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

//Function to update the word in Progress
const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    //console.log(wordArray);

    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    //console.log(revealWord);
    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
};

//Count Guess Remaining
const updateGuessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `The word does not contain ${guess}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Well done! ${guess} is part of the word.`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Game Over. The word was <span class="highlight">${word}</span>.`;
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};


const checkIfWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("Win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};