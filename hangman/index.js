var mistkaesCount = 0;
let guesses = [];
let currentGuess = "";
let guessList = [
  {
    type: "sport",
    words: ["basketball"],
  },
  {
    type: "sience",
    words: ["cell", "chemical", "chemistry", "climate", "climatologist"],
  },
];
const wordObj = { type: "", word: "" };
const winWord = "";
const classes = null;
const hangClasses = ["scaffold", "head", "body", "arms", "legs"];
let guessWord = new Array(winWord.length).fill(undefined);

var alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

window.onload = function () {
  findGuessWord();
  start();
  ClickAlphabet();
};

function findGuessWord() {
  const categoryEl = document.getElementById("category");
  const randomCat = Math.floor(Math.random() * guessWord.length + 0);
  const randomWord = Math.floor(
    Math.random() * guessList[randomCat].words.length + 0
  );
  wordObj.type = guessList[randomCat].type;
  wordObj.word = guessList[randomCat].words[randomWord];
  categoryEl.textContent = wordObj.type;
}

function ClickAlphabet() {
  const alphabetItems = document.querySelectorAll("#alphabet-item");
  const ul = document.getElementById("alphabet");
  const childrens = alphabetItems;
  if (childrens) {
    childrens.forEach((el) => {
      el.addEventListener("click", (e) => {
        console.log(e.target.textContent);
        currentGuess = e.target.textContent;
        checkTheChar();
      });
    });
  }
}

function executePLayAgainButton() {
  const playAgainButton = document.getElementById("play-again");
  playAgainButton.style.display = "block";
  playAgainButton.textContent = "Play Again";

  playAgainButton.addEventListener("click", () => {
    location.reload();
  });
}

function gameOver() {
  const gameOverItem = document.getElementById("game-over");
  gameOverItem.classList.toggle("gameover");
  const span = document.createElement("span");
  span.textContent = "Game Over";
  gameOverItem.insertAdjacentElement("afterbegin", span);
  executePLayAgainButton();
}
function drawHangPieces() {
  const head = document.getElementById("head");
  const body = document.getElementById("body");
  const arms = document.getElementById("arms");
  const legs = document.getElementById("legs");
  const scaffold = document.getElementById("scaffold");
  switch (mistkaesCount) {
    case 1:
      console.log("1 mistake");
      scaffold.style.display = "flex";
      scaffold.style.transition = "all 3s ease-in-out";
      return;
    case 2:
      console.log("2 mistake");
      head.style.display = "flex";
      arms.style.transition = "all 2s ease-in";
      arms.setAttribute("fill", "red");
      return;
    case 3:
      console.log("3 mistake");
      body.style.display = "flex";
      arms.style.transition = "all 2s ease-in";
      return;
    case 4:
      console.log("4 mistake");
      arms.style.display = "flex";
      return;
    case 5:
      console.log("4 mistake");
      legs.style.display = "flex";
      gameOver();
      return;
  }
}

function checkTheChar() {
  const figure = document.querySelector(".figure");
  const container = document.getElementById("guesses-show");
  let showCaseItem = document.querySelector(".guess-item");
  let found;

  const winWord = wordObj.word;

  for (let i = 0; i < winWord.length; i++) {
    if (winWord[i] === currentGuess) {
      container.children[i].textContent = currentGuess;
      console.log(winWord.indexOf(winWord[i]));
      guessWord.splice(i, 1, currentGuess);
      found = true;
    }

    console.log(guessWord);
  }

  if (!found) {
    figure.style.animationPlayState = "running";
    mistkaesCount++;
    drawHangPieces();
  } else {
    figure.style.animationPlayState = "paused";
  }
  if (JSON.stringify(guessWord) == JSON.stringify(Array.from(winWord))) {
    const winCard = document.getElementById("win-card");
    const winCardText = document.getElementById("win-card-text");
    winCard.style.display = "flex";
    winCard.classList.toggle("win-card-show");
    winCardText.textContent = "Congratulation! You Won";
    executePLayAgainButton();
  }
}

//Satart the game
function start() {
  mistkaesCount = 0;
  const container = document.getElementById("guesses-show");

  //create keyboard
  const ul = document.getElementById("alphabet");
  for (let i = 0; i < alphabet.length; i++) {
    const liItem = document.createElement("li");
    liItem.id = "alphabet-item";
    liItem.textContent = alphabet[i];
    ul.insertAdjacentElement("beforeend", liItem);
  }

  //Show guesses
  const winWord = wordObj.word;
  Array.from(winWord).forEach((element) => {
    const el = document.createElement("span");
    el.style.margin = "10px";
    el.textContent = "_";
    container.appendChild(el);
    el.classList.add("guess-item");
  });
}
