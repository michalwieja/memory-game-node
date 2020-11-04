let choosenCards = [];
let choosenCardsId = [];
let cardsWon = [];
let disabledButtons = [];
let turnsNumber = 0;

const grid = document.querySelector(".grid");
const score = document.querySelector("#score");
const turns = document.querySelector("#turns");
const winningTurns = document.querySelector("#winningTurns");

const cards = [
  { name: "delfin", img: "../img/delfin.svg" },
  { name: "delfin", img: "../img/delfin.svg" },
  { name: "gwiazda", img: "../img/gwiazda.svg" },
  { name: "gwiazda", img: "../img/gwiazda.svg" },
  { name: "konik", img: "../img/konik.svg" },
  { name: "konik", img: "../img/konik.svg" },
  { name: "krab", img: "../img/krab.svg" },
  { name: "krab", img: "../img/krab.svg" },
  { name: "kreweta", img: "../img/kreweta.svg" },
  { name: "kreweta", img: "../img/kreweta.svg" },
  { name: "muszla", img: "../img/muszla.svg" },
  { name: "muszla", img: "../img/muszla.svg" },
  { name: "osmiornica", img: "../img/osmiornica.svg" },
  { name: "osmiornica", img: "../img/osmiornica.svg" },
  { name: "plaszcz", img: "../img/plaszcz.svg" },
  { name: "plaszcz", img: "../img/plaszcz.svg" },
  { name: "rekin", img: "../img/rekin.svg" },
  { name: "rekin", img: "../img/rekin.svg" },
  { name: "ryba", img: "../img/ryba.svg" },
  { name: "ryba", img: "../img/ryba.svg" },
  { name: "skalar", img: "../img/skalar.svg" },
  { name: "skalar", img: "../img/skalar.svg" },
  { name: "zolw", img: "../img/zolw.svg" },
  { name: "zolw", img: "../img/zolw.svg" },
];
let cardsSliced = cards.slice(20);
// if (level === "easy") {
//   cardsSliced = cards.slice(12);
//   grid.classList.add("easy");
// } else if (level === "medium") {
//   cardsSliced = cards.slice.slice(8);
// } else if (level === "hard") {
//   cardsSliced = cards.slice.slice(0);
// }

let cardsShuffled = cardsSliced.sort(() => 0.5 - Math.random());

cardsShuffled.forEach((card, index) => {
  let button = document.createElement("button");

  button.setAttribute("data-id", index);
  button.addEventListener("click", flipcard);
  grid.appendChild(button);
});

// flip

function flipcard() {
  let id = this.getAttribute("data-id");
  this.style.backgroundImage = `url(${cardsShuffled[id].img})`;
  this.disabled = true;

  choosenCards.push(cardsShuffled[id].name);
  choosenCardsId.push(id);

  if (choosenCards.length === 2) {
    let cards = document.querySelectorAll("button");
    cards.forEach((card) => (card.disabled = true));
    setTimeout(() => {
      cards.forEach((card) => {
        card.disabled = false;
      });
    }, 1000);
    setTimeout(() => {
      disabledButtons.forEach((button) => (button.disabled = true));
    }, 1001);
    setTimeout(check, 1000);

    turnsNumber++;
    turns.textContent = turnsNumber;
  }
}
// check

function check() {
  let cards = document.querySelectorAll("button");

  let firstId = choosenCardsId[0];
  let secondId = choosenCardsId[1];

  if (choosenCards[0] === choosenCards[1]) {
    cards[firstId].style.backgroundImage = `url(./img/white.svg)`;
    cards[secondId].style.backgroundImage = `url(./img/white.svg)`;
    disabledButtons.push(cards[firstId]);
    disabledButtons.push(cards[secondId]);

    cardsWon.push(choosenCards);
  } else {
    cards[firstId].style.backgroundImage = `url(./img/gili.svg)`;
    cards[secondId].style.backgroundImage = `url(./img/gili.svg)`;
    cards[firstId].disabled = false;
    cards[secondId].disabled = false;
  }

  choosenCards = [];
  choosenCardsId = [];

  score.textContent = cardsWon.length;
  if (cardsWon.length === cardsShuffled.length / 2) {
    document.querySelector(".winner").style.visibility = "visible";
    document.querySelector(".winner").style.opacity = 1;
    winningTurns.textContent = turnsNumber;

    const data = { winningTurns: turnsNumber };

    fetch("/winner", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setTimeout(() => {
      location = location;
    }, 5000);
  }
}
