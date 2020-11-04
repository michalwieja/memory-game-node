var express = require("express");
var router = express.Router();
let UserModel = require("../model/user");

const mongoose = require("mongoose");
require("dotenv/config");

let name;
let level;
let winningTurns;

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "memorki" });
});

/* POST player data */

router.post("/", function (req, res) {
  name = req.body.name;
  level = req.body.level;
  res.render("game", { name, level });
});

/* Send cards */

router.use("/cards", (req, res) => {
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
  let cardsSliced;

  if (level === "easy") {
    cardsSliced = cards.slice(12);
  } else if (level === "medium") {
    cardsSliced = cards.slice(8);
  } else if (level === "hard") {
    cardsSliced = cards.slice(0);
  }
  cardsShuffled = cardsSliced.sort(() => 0.5 - Math.random());

  res.json(cardsShuffled);
});
// send scorelist
router.use("/score", (req, res) => {
  mongoose
    .connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to Database");
      UserModel.find((err, users) => {
        res.json(users);
      });
    })
    .catch((err) => {
      console.log("Not Connected to Database ERROR! ", err);
    });
});

/* Send winner detail to db */

router.post("/winner", (req, res) => {
  winningTurns = req.body.winningTurns;

  let user = new UserModel({
    name: name,
    level: level,
    turns: winningTurns,
  });
  user
    .save()
    .then(() => console.log("saved"))
    .catch((err) => console.log(err));
});
module.exports = router;
