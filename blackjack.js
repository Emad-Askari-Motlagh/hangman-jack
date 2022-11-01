var dealerSum = 0;
var yourSum = 0;
var dealerAceCount = 0;
var yourAceCount = 0;
var hidden;
var deck;
const initiatedCards = new Array(1).fill("card");
var canHit = true;

window.onload = function () {
  buildDeck();
  shuffleDeck();
  startGame();
};

function buildDeck() {
  let values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  let types = ["C", "D", "H", "S"];
  deck = [];

  for (let i = 0; i < types.length; i++) {
    for (let j = 0; j < values.length; j++) {
      deck.push(values[j] + "-" + types[i]); //A-C -> K-C, A-D -> K-D
    }
  }
  // console.log(deck);
}

function shuffleDeck() {
  const cards = new Array(deck.length).fill("card");
  deck.forEach((element, i) => {
    let j = Math.floor(Math.random() * deck.length); // (0-1) * 52 => (0-51.9999)
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  });
}
function dealerRun() {
  const stayButton = document.getElementById("stay");
  hidden = deck.pop();
  dealerSum += getValue(hidden);
  dealerAceCount += checkAce(hidden);

  stayButton.setAttribute("disabled", true);

  while (dealerSum < 17) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    dealerSum += getValue(card);
    dealerAceCount += checkAce(card);
    document
      .getElementById("dealer-cards")
      .insertAdjacentElement("afterbegin", cardImg);
  }
}
function startGame() {
  dealerRun();
  initiatedCards.map((res, i) => {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);
  });

  document.getElementById("hit").addEventListener("click", hit);
  document.getElementById("stay").addEventListener("click", stay);
}

function hit() {
  if (!canHit) {
    return;
  }
  const stayButton = document.getElementById("stay");
  stayButton.removeAttribute("disabled");
  let cardImg = document.createElement("img");
  let card = deck.pop();
  cardImg.src = "./cards/" + card + ".png";
  yourSum += getValue(card);
  yourAceCount += checkAce(card);
  document.getElementById("your-cards").append(cardImg);

  if (reduceAce(yourSum, yourAceCount) > 21) {
    //A, J, 8 -> 1 + 10 + 8
    canHit = false;
  }
}

function stay() {
  const confirm = document.querySelector(".confirm-button");
  confirm.textContent = "ok";
  confirm.style.backgroundColor = "#282828";
  dealerSum = reduceAce(dealerSum, dealerAceCount);
  yourSum = reduceAce(yourSum, yourAceCount);

  canHit = false;
  document.getElementById("hidden").src = "./cards/" + hidden + ".png";
  const resultButton = document.getElementById("results");
  let showModal = false;
  let message = "";

  if (yourSum > 21) {
    message = "You Lose!";
    showModal = true;
  } else if (dealerSum > 21) {
    message = "You win!";
    showModal = true;
  }
  //both you and dealer <= 21
  else if (yourSum == dealerSum) {
    message = "Tie!";
    showModal = true;
  } else if (yourSum > dealerSum) {
    message = "You Win!";
    showModal = true;
  } else if (yourSum < dealerSum) {
    message = "You Lose!";
    showModal = true;
  }
  if (showModal) {
    resultButton.classList.add("results-show");
    confirm.textContent = "Play Again";
  }
  confirm.addEventListener("click", () => {
    resultButton.classList.remove("results-show");
    confirm.textContent = null;

    //REload the page to play again
    location.reload();
  });
  document.getElementById("dealer-sum").innerText = dealerSum;
  document.getElementById("your-sum").innerText = yourSum;
  document.getElementById(
    "results-p"
  ).innerHTML = `<div><div>${message}</div><div>${yourSum} vs ${dealerSum}</div> </div>`;
}

function getValue(card) {
  let data = card.split("-");
  let value = data[0];
  let types = ["C", "D", "H", "S"];
  if (isNaN(value)) {
    //A J Q K
    if (value == "A") {
      return 11;
    }
    return 10;
  }
  return parseInt(value);
}

function checkAce(card) {
  if (card[0] == "A") {
    return 1;
  }
  return 0;
}

function reduceAce(playerSum, playerAceCount) {
  while (playerSum > 21 && playerAceCount > 0) {
    playerSum -= 10;
    playerAceCount -= 1;
  }
  return playerSum;
}
