var express = require("express");
var router = express.Router();

//fs
var fs = require("fs");
var path = require("path");
var util = require("util");

const matter = require("gray-matter"); // Library for extracting front matter from MD files
const markdownIt = require("markdown-it"); // Markdown to HTML converter
const md = new markdownIt();

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

/// ARTICLES

// Pointing to the articles directory one level up from the routes folder
const articlesDir = path.join(__dirname, "..", "..", "articles");

// Recursive function to get all .md files
function getMdFiles(dir, files_) {
  files_ = files_ || [];
  const files = fs.readdirSync(dir);
  for (let i in files) {
    const name = path.join(dir, files[i]);
    if (fs.statSync(name).isDirectory()) {
      getMdFiles(name, files_);
    } else if (name.endsWith(".md")) {
      files_.push(name);
    }
  }
  return files_;
}

router.get("/articles/all", (req, res) => {
  const mdFiles = getMdFiles(articlesDir);
  const articles = [];

  mdFiles.forEach((file) => {
    const fileContent = fs.readFileSync(file, "utf-8");
    const { data, content } = matter(fileContent);
    const htmlContent = md.render(content);

    articles.push({
      slug: path.basename(file, ".md"),
      path: path.relative(articlesDir, file),
      frontMatter: data,
      content: htmlContent,
    });
  });

  res.json(articles);
});

module.exports = router;
