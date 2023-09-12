import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { promisify } from "util";
import sharp from "sharp"; // npm install sharp - image processing library

const readdirAsync = promisify(fs.readdir);
const statAsync = promisify(fs.stat);

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Get image dimensions using sharp
async function getImageDimensions(imagePath) {
  const image = sharp(imagePath);
  const metadata = await image.metadata();
  return {
    width: metadata.width,
    height: metadata.height,
    ratio: metadata.width / metadata.height,
  };
}

// Recursive function to scan images in a directory
async function scanImages(dir) {
  const allImages = [];
  const files = await readdirAsync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await statAsync(filePath);
    if (stat.isDirectory()) {
      allImages.push(...(await scanImages(filePath)));
    } else if (
      [".jpg", ".jpeg", ".png", ".gif"].includes(
        path.extname(file).toLowerCase()
      )
    ) {
      allImages.push(filePath);
    }
  }

  return allImages;
}

async function generateConceptsJson(conceptsPath) {
  const projectRoot = path.resolve(__dirname, "..");
  const dirs = await readdirAsync(conceptsPath);
  const result = [];

  for (const dir of dirs) {
    const dirPath = path.join(conceptsPath, dir);
    const stat = await statAsync(dirPath);
    if (stat.isDirectory()) {
      const imagesPath = await scanImages(dirPath);
      const imagesDetails = [];
      for (const imagePath of imagesPath) {
        const dimensions = await getImageDimensions(imagePath);
        imagesDetails.push({
          path: path.relative(projectRoot, imagePath),
          ...dimensions,
        });
      }
      result.push({
        name: dir,
        path: path.relative(projectRoot, dirPath),
        images: imagesDetails,
      });
    }
  }

  return result;
}

// Generate and write to a JSON file
async function updateFrontEndData() {
  const conceptsPath = path.join(__dirname, "../concepts");
  const data = await generateConceptsJson(conceptsPath);
  const outputFilePath = path.join(__dirname, "../data/frontEndData.json");
  fs.writeFileSync(outputFilePath, JSON.stringify(data, null, 4));
  console.log("Front end data updated!");
}

updateFrontEndData();
