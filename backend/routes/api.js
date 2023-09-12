var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json("ok mon ami");
});

router.get("/allConcepts", function (req, res, next) {
  res.json("TODO mon ami");
});

module.exports = router;
