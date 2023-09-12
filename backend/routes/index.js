var express = require("express");
var path = require("path");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// Serve static files from the "concepts" folder.
router.use(
  "/concepts",
  express.static(path.join(__dirname, "..", "..", "concepts"))
);

//proxy the parent /concepts folder to the concepts path here.

module.exports = router;
