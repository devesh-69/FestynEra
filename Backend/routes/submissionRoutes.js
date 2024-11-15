// routes/submissionRoutes.js
const express = require("express");
const { createSubmission } = require("../controllers/submissionController");
const upload = require("../middlewares/upload");

const router = express.Router();

// POST: Create a new submission
// Use multer to handle image uploads (up to 5 images)
router.post(
  "/",
  upload,
  (req, res, next) => {
    if (!req.files || req.files.length > 5) {
      return res
        .status(400)
        .json({ message: "You can upload a maximum of 5 images." });
    }
    next();
  },
  createSubmission
); // Proceed to the controller after validation

module.exports = router;
