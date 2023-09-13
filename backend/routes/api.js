var express = require("express");
var router = express.Router();

//fs
var fs = require("fs");
var path = require("path");
var util = require("util");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json("ok mon ami");
});

router.get("/all-concepts", function (req, res, next) {
  //return content of the file ftondendData.json using fs
  //readfile
  var file = path.join(__dirname, "..", "..", "data", "allConceptsData.json");
  var json = JSON.parse(fs.readFileSync(file, "utf8"));

  res.json(json);
  //res.json("TODO mon ami");
});

module.exports = router;
