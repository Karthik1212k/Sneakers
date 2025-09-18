const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); // Import the 'path' module

dotenv.config();
const app = express();

// ===== Middleware =====
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== API Routes =====
const authRoute = require("./routes/authRoute");
app.use("/api/auth", authRoute);

// ===== DEPLOYMENT LOGIC =====
// This code tells Express where to find the frontend's static files.
// It navigates up one directory from 'server' to the project root,
// then into 'client/dist'. This is the correct path.
app.use(express.static(path.join(__dirname, "../client/dist")));

// This is a catch-all route. For any request that doesn't match an API route,
// it sends back the main index.html file from the frontend.
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});


// ===== MongoDB Connection =====
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1); // Exit process with failure
  });

// ===== Start Server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});