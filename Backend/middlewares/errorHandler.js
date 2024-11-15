function errorHandler(err, req, res, next) {
  console.error(err.stack); // Log the error stack to the console

  // Handle specific error types
  if (err.name === "ValidationError") {
    return res
      .status(400)
      .json({ message: "Validation error", details: err.message });
  }

  // Handle other errors
  res.status(500).json({ message: "Something went wrong", error: err.message });
}

module.exports = errorHandler;
