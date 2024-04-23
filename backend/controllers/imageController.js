const fs = require("fs");
const path = require("path");

exports.saveImage = async (req, res) => {
  console.log(
    `Received image size: ${JSON.stringify(req.body).length / 1024} KB`
  );

  // Extract imageData and filename from the request body
  const { imageData, filename } = req.body;
  if (!imageData || !filename) {
    return res.status(400).json({ message: "Missing image data or filename" });
  }

  // Sanitize the filename to remove problematic characters and shorten it
  const safeFilename = `map-screenshot-${new Date()
    .toISOString()
    .replace(/[:.-]/g, "")}.png`;

  // Remove data URL prefix if present and decode from base64
  const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");

  // Define the path where the image will be saved
  const directoryPath = path.join(
    __dirname,
    "../../frontend/src/assets/screenshots"
  );

  // Ensure the directory exists
  try {
    if (!fs.existsSync(directoryPath)) {
      console.log("Directory does not exist, creating directory...");
      fs.mkdirSync(directoryPath, { recursive: true });
      console.log("Directory created at:", directoryPath);
    } else {
      console.log("Directory already exists:", directoryPath);
    }
  } catch (err) {
    console.error("Error creating directory:", err);
    return res.status(500).json({ message: "Failed to create directory" });
  }

  // Construct the file path where the image will be saved
  const filePath = path.join(directoryPath, safeFilename);
  console.log("Saving file to:", filePath);

  // Introduce a delay to handle potential file system synchronization delays
  setTimeout(() => {
    fs.writeFile(filePath, buffer, (err) => {
      if (err) {
        console.error("Failed to save the image:", err);
        return res.status(500).json({ message: "Failed to save the image" });
      }
      console.log("Image saved successfully at:", filePath);
      res.json({
        message: "Image saved successfully",
        path: filePath,
      });
    });
  }, 1000); // Delay file writing by 1000 ms
};
