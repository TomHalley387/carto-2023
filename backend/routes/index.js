var express = require("express");
var path = require("path");
var router = express.Router();

var sharp = require("sharp");
var fs = require("fs");

// Serve static files from the "concepts" folder.
/*
router.use(
  "/img/concepts",
  express.static(path.join(__dirname, "..", "..", "concepts"))
);

//articles too
router.use(
  "/img/articles",
  express.static(path.join(__dirname, "..", "..", "articles"))
);*/

// Map the request to the file path and check if it exists
function mapToFile(req, folderPath) {
  const imagePath = path.join(__dirname, "..", "..", folderPath, req.path);
  if (!fs.existsSync(imagePath)) {
    return null;
  }
  return imagePath;
}
function isValidDimension(valueStr) {
  if (!valueStr) return false; // if value is undefined, null, or empty
  const value = parseInt(valueStr);
  return !isNaN(value) && value > 0;
}

function transformImage(req, res, imagePath) {
  const width = isValidDimension(req.query.width)
    ? parseInt(req.query.width)
    : undefined;
  const height = isValidDimension(req.query.height)
    ? parseInt(req.query.height)
    : undefined;
  const format = req.query.format || "webp";

  // If width and height are not provided, serve as static
  if (!width && !height && !format) {
    return res.sendFile(imagePath);
  } else {
    // Create a read stream for the image file
    const readStream = fs.createReadStream(imagePath);

    // Transform the image using sharp
    let transform = sharp();

    if (width || height) {
      transform = transform.resize(width, height);
    }

    if (format) {
      transform = transform.toFormat(format);
    }

    // Pipe the image through sharp and then to response
    readStream.pipe(transform).pipe(res);
  }
}

// Middleware to handle image request
function handleImageRequest(req, res, next, folderPath) {
  const decodedPath = decodeURIComponent(req.path);
  const imagePath = path.join(__dirname, "..", "..", folderPath, decodedPath);

  console.log("Decoded path:", decodedPath); // Log decoded path
  console.log("Mapped image path:", imagePath); // Log full image path

  if (!fs.existsSync(imagePath)) {
    console.log("File not found:", imagePath); // Log if file not found
    return res.status(404).send("Not found");
  }

  transformImage(req, res, imagePath);
}
// Use the handleImageRequest function for both paths
router.use("/img/concepts", (req, res, next) =>
  handleImageRequest(req, res, next, "concepts")
);
router.use("/img/articles", (req, res, next) =>
  handleImageRequest(req, res, next, "articles")
);

// Serve static files from the vue-dist directory
router.use(express.static(path.join(__dirname, "..", "vue-dist")));

// Catch all routes and redirect to the index.html
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "vue-dist", "index.html"));
});

/* GET home page.
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
 */
//proxy the parent /concepts folder to the concepts path here.

module.exports = router;
