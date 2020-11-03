var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "memorki" });
});

router.post("/", function (req, res) {
  res.render("game", { name: req.body.name, level: req.body.level });
});

module.exports = router;
