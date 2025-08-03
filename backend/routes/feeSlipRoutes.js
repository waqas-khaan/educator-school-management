const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const {
  generateFeeSlip,
  generateAllFeeSlips,
  getFeeSlipById,
  getFeeSlipsByStudent,
  getAllFeeSlips,
  generateFeeSlipPDF,
  updateFeeSlipStatus,
  deleteFeeSlip,
  getFeeSlipBySlipId,
  getFeeSlipByBarcode,
} = require("../controllers/feeSlipController");

// Apply middleware to all routes (temporarily disabled for development)
// router.use(verifyToken);

// Generate fee slip for a single student
router.post("/generate", generateFeeSlip);

// Generate fee slips for all students
router.post("/generate-all", generateAllFeeSlips);

// Get all fee slips with filters
router.get("/", getAllFeeSlips);

// Get fee slip by ID
router.get("/:id", getFeeSlipById);

// Get fee slip by slip ID (for barcode scanning)
router.get("/slip/:slipId", getFeeSlipBySlipId);

// Get fee slip by unique student barcode (for barcode scanning)
router.get("/barcode/:barcode", getFeeSlipByBarcode);

// Get fee slips by student ID
router.get("/student/:student_id", getFeeSlipsByStudent);

// Generate PDF for fee slip
router.get("/:id/pdf", generateFeeSlipPDF);

// Update fee slip status
router.put("/:id/status", updateFeeSlipStatus);

// Delete fee slip
router.delete("/:id", deleteFeeSlip);

module.exports = router;
