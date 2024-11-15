// controller
const {
  ArtSubmission,
  TechSubmission,
  CulturalSubmission,
} = require("../models/submission");
exports.createSubmission = async (req, res) => {
  try {
    const { name, email, phoneNumber, collegeName, description, category } =
      req.body;

    // Validate image count
    if (req.files.length > 5) {
      return res
        .status(400)
        .json({ message: "You can upload a maximum of 5 images." });
    }

    const images = req.files.map((file) => file.buffer.toString("base64"));

    // Choose the correct model based on the category
    let SubmissionModel;
    if (category === "Art") {
      SubmissionModel = ArtSubmission;
    } else if (category === "Tech") {
      SubmissionModel = TechSubmission;
    } else {
      SubmissionModel = CulturalSubmission;
    }

    // Create a new submission document
    const newSubmission = new SubmissionModel({
      name,
      email,
      phoneNumber,
      collegeName,
      description,
      images,
    });

    // Save the submission to the database
    await newSubmission.save();

    // Send a response
    res.status(201).json({
      message: "Submission created successfully",
      submission: newSubmission,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
