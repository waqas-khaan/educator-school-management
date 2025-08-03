const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");

// Apply authentication middleware to all routes
router.use(verifyToken);

// Placeholder routes - to be implemented
router.get("/", (req, res) => {
  res.json({ message: "Upload routes coming soon" });
});

module.exports = router;
