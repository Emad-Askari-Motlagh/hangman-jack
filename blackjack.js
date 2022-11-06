var dealerSum = 0;
var yourSum = 0;
var dealerAceCount = 0;
var yourAceCount = 0;
var hidden;
var deck;
const initiatedCards = new Array(1).fill("card");
var canHit = true;
let hitButton;
window.onload = function () {
  hitButton = document.getElementById("hit");
  buildDeck();
  shuffleDeck();
  startGame();
};

const Card = {
  name: "card",
  animateCard(el, animationName) {
    if (!el) return;

    return (el.style.animation = `${animationName} 0.3s linear alternate`);
  },
  animateCard1() {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    Card.animateCard(cardImg, "animation");
    cardImg.style.animation = "animate 0.5s linear alternate";
  },
};

function buildDeck(animationName) {
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
      deck.push(values[j] + "-" + types[i]);
    }
  }
  // console.log(deck);
}

function stopTheGame() {
  dealerSum = calcSum(dealerSum);
  yourSum = calcSum(yourSum);
  canHit = false;
  const hiddenCard = document.getElementById("hidden");
  hiddenCard.src = "./cards/" + hidden + ".png";
  Card.animateCard(hiddenCard, "animate-hidden");
  document.getElementById("hit").setAttribute("disabled", true);
  document.getElementById("stay").setAttribute("disabled", true);
}

function shuffleDeck() {
  deck.forEach((element, i) => {
    let j = Math.floor(Math.random() * deck.length);
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
    Card.animateCard(cardImg, "animation");
    cardImg.style.animation = "animate 0.5s linear alternate";
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
    Card.animateCard(cardImg, "animation");
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);
  });
  document.getElementById("hit").addEventListener("click", hit);
  document.getElementById("stay").addEventListener("click", stay);
}

function hit() {
  const stayButton = document.getElementById("stay");
  stayButton.removeAttribute("disabled");
  let cardImg = document.createElement("img");
  cardImg.style.animation = "animate 0.5s linear alternate";
  Card.animateCard(cardImg, "animate");
  let card = deck.pop();
  cardImg.src = "./cards/" + card + ".png";
  yourSum += getValue(card);
  yourAceCount += checkAce(card);
  document.getElementById("your-cards").append(cardImg);
  dealerSum = calcSum(dealerSum);
  yourSum = calcSum(yourSum);
  if (yourSum > 21) {
    message = "You Lose!";
    stopTheGame();
    showResult(message, false);
  } else if (dealerSum > 21) {
    message = "You win!";
  }
}

function showResult(message, isOpen) {
  const resultButton = document.getElementById("results");
  if (!resultButton) return;
  setTimeout(() => {
    const confirm = document.querySelector(".confirm-button");
    confirm.textContent = "Play again";
    confirm.style.backgroundColor = "#182828";
    if (!isOpen) {
      resultButton.classList.add("results-show");
      confirm.addEventListener("click", () => {
        confirm.textContent = null;
        //REload the page to play again
        location.reload();
      });
    } else {
      resultButton.classList.remove("results-show");
    }
    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
    document.getElementById(
      "results-p"
    ).innerHTML = `<div><div>${message}</div><div>${yourSum} vs ${dealerSum}</div> </div>`;
  }, 300);
}

function stay() {
  stopTheGame();
  let showModal = false;
  let message = "";
  hitButton.setAttribute("disabled", true);

  //you and dealer goes up to 21
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
    showResult(message, false);
  }
}

function getValue(card) {
  let data = card.split("-");
  let value = data[0];
  let types = ["C", "D", "H", "S"];
  if (isNaN(value)) {
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

function calcSum(playerSum) {
  return playerSum;
}
