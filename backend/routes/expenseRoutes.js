const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const {
  getAllExpenses,
  getExpenseById,
  addExpense,
  updateExpense,
  deleteExpense,
  searchExpenses,
  getExpenseStatistics,
} = require("../controllers/expenseController");

// Apply authentication middleware to all routes
// Temporarily disabled for development
// router.use(verifyToken);

// Get all expense records
router.get("/", getAllExpenses);

// Get expense by ID
router.get("/:id", getExpenseById);

// Add new expense record
router.post("/", addExpense);

// Update expense record
router.put("/:id", updateExpense);

// Delete expense record
router.delete("/:id", deleteExpense);

// Search expenses
router.get("/search", searchExpenses);

// Get expense statistics
router.get("/statistics", getExpenseStatistics);

module.exports = router;
