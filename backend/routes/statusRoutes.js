const express = require("express");
const router = express.Router();

// Health check endpoint
router.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Backend server is running",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

module.exports = router; 