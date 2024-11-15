// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const submissionRoutes = require("../routes/submissionRoutes");
// const errorHandler = require("../middlewares/errorHandler");

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Routes
// app.use("/api/submissions", submissionRoutes);

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB connected");
//   })
//   .catch((error) => {
//     console.error("MongoDB connection error:", error);
//     process.exit(1);
//   });

// // Global error handler (after all routes)
// app.use(errorHandler);

// // Start server
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// /api/index.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const submissionRoutes = require("../routes/submissionRoutes");
const errorHandler = require("../middlewares/errorHandler");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/submissions", submissionRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

// Global error handler (after all routes)
app.use(errorHandler);

// Exporting the handler for Vercel
module.exports = (req, res) => {
  app(req, res);
};

