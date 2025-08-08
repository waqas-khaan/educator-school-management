const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const {
  generateAdmissionSlip,
  generateMultipleAdmissionSlips,
  generateStudentDirectory,
  generateCustomPrint,
} = require("../controllers/admissionSlipController");

// Apply middleware to all routes (temporarily disabled for development)
// router.use(verifyToken);

// Generate admission slip PDF
router.get("/:studentId", generateAdmissionSlip);

// Generate multiple admission slips PDF
router.post("/bulk", generateMultipleAdmissionSlips);

// Generate student directory PDF
router.post("/directory", generateStudentDirectory);

// Generate custom print PDF with selected fields
router.post("/custom-print", generateCustomPrint);

module.exports = router;
