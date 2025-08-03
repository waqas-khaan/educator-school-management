const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const {
  getAllSalaries,
  getSalaryById,
  addSalary,
  updateSalary,
  deleteSalary,
  searchSalaries,
  getSalaryStatistics,
} = require("../controllers/salaryController");

// Apply authentication middleware to all routes
// Temporarily disabled for development
// router.use(verifyToken);

// Get all salary records
router.get("/", getAllSalaries);

// Get salary by ID
router.get("/:id", getSalaryById);

// Add new salary record
router.post("/", addSalary);

// Update salary record
router.put("/:id", updateSalary);

// Delete salary record
router.delete("/:id", deleteSalary);

// Search salaries
router.get("/search", searchSalaries);

// Get salary statistics
router.get("/statistics", getSalaryStatistics);



module.exports = router;
