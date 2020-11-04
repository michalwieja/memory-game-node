let easyContainer = document.querySelector(".easy");
let mediumContainer = document.querySelector(".medium");
let hardContainer = document.querySelector(".hard");

fetch("/score")
  .then((response) => response.json())
  .then((score) => showScore(score));

function showScore(score) {
  let easyScore = score.filter((score) => score.level === "easy");
  let mediumScore = score.filter((score) => score.level === "medium");
  let hardScore = score.filter((score) => score.level === "hard");

  function compare(a, b) {
    const scoreA = a.turns;
    const scoreB = b.turns;
    if (scoreA > scoreB) return 1;
    if (scoreB > scoreA) return -1;

    return 0;
  }
  easyScore.sort(compare);
  mediumScore.sort(compare);
  hardScore.sort(compare);

  let easyScoreSliced = easyScore.slice(0, 3);
  let mediumScoreSliced = mediumScore.slice(0, 3);
  let hardScoreSliced = hardScore.slice(0, 3);
  console.log(easyScoreSliced);

  easyScoreSliced.forEach((score) => {
    let div = document.createElement("div");

    div.innerText = score.name + " " + score.turns;

    easyContainer.appendChild(div);
  });
  mediumScoreSliced.forEach((score) => {
    let div = document.createElement("div");

    div.innerText = score.name + " " + score.turns;

    mediumContainer.appendChild(div);
  });
  hardScoreSliced.forEach((score) => {
    let div = document.createElement("div");

    div.innerText = score.name + " " + score.turns;

    hardContainer.appendChild(div);
  });
}
