const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const {
  getAllRevenue,
  addRevenue,
  updateRevenue,
  deleteRevenue,
} = require("../controllers/revenueController");

// Apply authentication middleware to all routes
// Temporarily disabled for development
// router.use(verifyToken);

// Get all revenue records
router.get("/", getAllRevenue);

// Add new revenue record
router.post("/", addRevenue);

// Update revenue record
router.put("/:id", updateRevenue);

// Delete revenue record
router.delete("/:id", deleteRevenue);

module.exports = router;
