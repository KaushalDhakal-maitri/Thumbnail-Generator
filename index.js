const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

// Helper: Convert a file to an image using LibreOffice CLI
const convertToImage = (inputPath, outputDir) => {
  return new Promise((resolve, reject) => {
    const command = `libreoffice --headless --convert-to png --outdir "${outputDir}" "${inputPath}"`;
    exec(command, (error, stdout, stderr) => {
      if (error) return reject(`Error converting file: ${stderr}`);
      resolve(stdout.trim());
    });
  });
};

// Helper: Convert PNG to WEBP using ImageMagick's `convert` command
const convertImageToWebP = (inputImagePath, outputWebPPath) => {
  return new Promise((resolve, reject) => {
    const command = `convert "${inputImagePath}" -resize 400x300 "${outputWebPPath}"`;
    exec(command, (error, stdout, stderr) => {
      if (error) return reject(`Error converting image to WebP: ${stderr}`);
      resolve(stdout.trim());
    });
  });
};

// Main Function to Generate Thumbnails
const generateThumbnails = async (filePath) => {
  const outputDir = path.join(__dirname, "output");
  const fileName = path.basename(filePath, path.extname(filePath));
  const pngPath = path.join(outputDir, `${fileName}.png`);
  const webpPath = path.join(outputDir, `${fileName}.webp`);

  try {
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    // Convert file to PNG (via LibreOffice for .docx/.pdf, direct for images)
    console.log(`Converting ${filePath} to PNG...`);
    await convertToImage(filePath, outputDir);

    // Convert PNG to WEBP
    // console.log(`Converting PNG to WEBP...`);
    // await convertImageToWebP(pngPath, webpPath);

    console.log(`Thumbnail created: ${webpPath}`);
  } catch (error) {
    console.error("Error:", error);
  }
};

// Example Usage
(async () => {
  // const docxFilePath = path.join(__dirname, "meeting.docx"); // Replace with your .docx file path
  
  const pdfFilePath = path.join(__dirname, "dummy.pdf"); // Replace with your .pdf file path
  // const imageFilePath = path.join(__dirname, "sample.jpg"); // Replace with your image file path

  // console.log("Generating thumbnail for .docx file...");
  // await generateThumbnails(docxFilePath);

  console.log("Generating thumbnail for .pdf file...");
  await generateThumbnails(pdfFilePath);

  // console.log("Generating thumbnail for image...");
  // await generateThumbnails(imageFilePath);
})();

