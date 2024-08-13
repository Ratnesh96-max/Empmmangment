require("dotenv").config(); // Load environment variables
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const path = require("path");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" }));
// Routes
app.use("/api/auth", authRoutes);
app.use("/api", employeeRoutes);

const PORT = process.env.PORT || 5000; // Use the PORT from .env
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
