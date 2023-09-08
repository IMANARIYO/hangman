const letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArray = Array.from(letters);
let lettersContainer = document.querySelector(".letters");
const words = {
    programming: ["php", "javascript", "java", "visual basic", "jango", "ruby", "mysql", "python"],
    districts: ["nyamagabe", "huye", "nyarugenge", "musanze", "rubavu", "nyamasheke", "gasabo", "gakenke"],
    people: ["paul kagame", "museveni", "Mahatma Ghandi", "albert einstein"],
    countries: ["rwanda", "burundi", "tanzania", "congo", "kenya", "uganda"]
}

let allKeys = Object.keys(words);
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNumber];
console.log("Selected word:", randomValueValue);

document.querySelector(".game-info .category span").innerHTML = randomPropName;
let lettersGuessContainer = document.querySelector(".letters-guess");
let lettersAndSpace = Array.from(randomValueValue);

lettersArray.forEach(letter => {
    let span = document.createElement("span");
    let theLetter = document.createTextNode(letter);
    span.appendChild(theLetter);
    span.className = 'letter-box';
    lettersContainer.appendChild(span);
});

lettersAndSpace.forEach(letter => {
    let emptySpan = document.createElement("span");
    if (letter === ' ') {
        emptySpan.className = 'with-space';
    } else {
        emptySpan.innerHTML = '_'; // Placeholder for letters to be guessed
    }
    lettersGuessContainer.appendChild(emptySpan);
});

let guessSpans = document.querySelectorAll(".letters-guess span");
let wrongAttempts = 0;
let theDraw = document.querySelector(".hangman-draw");

document.addEventListener("click", (e) => {
    let theStatus = false;
    if (e.target.className === 'letter-box') {
        e.target.classList.add("clicked");
        let theClickedLetter = e.target.innerHTML.toLowerCase();
        let theChosenWord = Array.from(randomValueValue.toLowerCase());
        theChosenWord.forEach((wordLetter, WordIndex) => {
            if (theClickedLetter === wordLetter) {
                theStatus = true;
                guessSpans.forEach((span, spanIndex) => {
                    if (WordIndex === spanIndex) {
                        span.innerHTML = theClickedLetter; // Display the correct letter
                    }
                });
            }
        });

        if (theStatus !== true) {
            wrongAttempts++;
            theDraw.classList.add(`wrong-${wrongAttempts}`);
            document.getElementById("fail").play();
        } else {
            document.getElementById("success").play();
        }

        // Check if the word has been completely guessed
        let completedWord = Array.from(document.querySelectorAll(".letters-guess span")).every(span => span.innerHTML !== '_');
        if (completedWord) {
            endGame();
            lettersContainer.classList.add("finished");
        } else if (wrongAttempts === 8) {
            endGame();
            lettersContainer.classList.add("finished");
        }
    }
});

function endGame() {
    let div = document.createElement("div");
    let divText = document.createTextNode(`Your score is: ${calculateScore()}! Game Over, The Word Is ${randomValueValue}`);
    div.appendChild(divText);
    let playAgainButton = document.createElement('button');
    playAgainButton.innerHTML = 'Play Again';
    playAgainButton.onclick = () => location.reload();
    div.appendChild(playAgainButton);
    div.className = 'popup';
    document.body.appendChild(div);
}

function calculateScore() {
    return 8 - wrongAttempts;
}
