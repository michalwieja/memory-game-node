var express = require("express");
var router = express.Router();

let name;
let level;
let winningTurns;

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "memorki" });
});

router.post("/", function (req, res) {
  name = req.body.name;
  level = req.body.level;
  res.render("game", { name, level });
});

router.post("/winner", (req, res) => {
  winningTurns = req.body.winningTurns;

  console.log(name, level, winningTurns);
});

module.exports = router;
