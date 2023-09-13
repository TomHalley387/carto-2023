var express = require("express");
var path = require("path");
var router = express.Router();

// Serve static files from the "concepts" folder.
router.use(
  "/img/concepts",
  express.static(path.join(__dirname, "..", "..", "concepts"))
);

// Serve static files from the vue-dist directory
router.use(express.static(path.join(__dirname, "..", "vue-dist")));

// Catch all routes and redirect to the index.html
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "vue-dist", "index.html"));
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//proxy the parent /concepts folder to the concepts path here.

module.exports = router;
