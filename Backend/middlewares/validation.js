const { body } = require("express-validator");

// Validation rules for submission
exports.validateSubmission = [
  body("name").not().isEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("phoneNumber")
    .isMobilePhone()
    .withMessage("Valid phone number is required"),
  body("collegeName").not().isEmpty().withMessage("College name is required"),
  body("description").not().isEmpty().withMessage("Description is required"),
  body("images").isArray({ max: 5 }).withMessage("Maximum of 5 images allowed"),
];
