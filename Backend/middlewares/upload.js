// middlewares/upload.js
const multer = require("multer");

// Use memory storage to store images in memory as buffers
const storage = multer.memoryStorage();

// Only allow image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images are allowed"), false);
  }
};

// Multer configuration for handling multiple images (up to 5 images)
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
}).array("images", 5); // "images" field in form, with a limit of 5 images

module.exports = upload;
