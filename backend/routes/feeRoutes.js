const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const {
  getAllFees,
  getFeeById,
  addFee,
  updateFee,
  deleteFee,
  getFeeStatistics,
  getStudentFeeHistory,
  getStudentMonthlyPayment,
  getStudentArrears,
  getPendingFees,
  searchFees,
  getFeeHistory,
} = require("../controllers/feeController");

// Apply middleware to all routes (temporarily disabled for development)
// router.use(verifyToken);

// Get all fees
router.get("/", getAllFees);

// Get fee statistics
router.get("/statistics", getFeeStatistics);

// Get pending fees
router.get("/pending", getPendingFees);

// Get fee history
router.get("/history", getFeeHistory);

// Search fees
router.get("/search", searchFees);

// Get student fee history
router.get("/student/:student_id", getStudentFeeHistory);

// Get student's monthly payment total
router.get(
  "/student/:student_id/monthly/:month/:year",
  getStudentMonthlyPayment
);

// Get student arrears
router.get("/student/:student_id/arrears", getStudentArrears);

// Get fee by ID
router.get("/:id", getFeeById);

// Add new fee
router.post("/", addFee);

// Update fee
router.put("/:id", updateFee);

// Delete fee
router.delete("/:id", deleteFee);

module.exports = router;
