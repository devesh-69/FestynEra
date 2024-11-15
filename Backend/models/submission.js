const mongoose = require("mongoose");

// Common Submission Schema
const submissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    collegeName: { type: String, required: true },
    description: { type: String, required: true },
    images: {
      type: [String],
      required: true,
      validate: {
        validator: (value) => Array.isArray(value) && value.length <= 5,
        message: "You can upload a maximum of 5 images.",
      },
    },
  },
  { timestamps: true }
);

// Creating separate models for each category with specific collection names
const ArtSubmission = mongoose.model("ArtSubmission", submissionSchema, "ArtSubmission");
const TechSubmission = mongoose.model("TechSubmission", submissionSchema, "TechSubmission");
const CulturalSubmission = mongoose.model("CulturalSubmission", submissionSchema, "CulturalSubmission");

module.exports = { ArtSubmission, TechSubmission, CulturalSubmission };
