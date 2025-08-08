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
  generateFeeSlipWithBarcode,
  generateEducatorsFeeSlip,
  generateBulkEducatorsFeeSlips,
  updateFeeSlipStatus,
  deleteFeeSlip,
  getFeeSlipBySlipId,
  getFeeSlipByBarcode,
  generateBarcodeImage,
  generateStudentBarcodeImage,
  getDetailedFeeBreakdown,
} = require("../controllers/feeSlipController");

const {
  generateFeeSlipsForNewMonth,
} = require("../services/autoFeeSlipService");

// Apply middleware to all routes (temporarily disabled for development)
// router.use(verifyToken);

// Generate fee slip for a single student
router.post("/generate", generateFeeSlip);

// Generate fee slips for all students
router.post("/generate-all", generateAllFeeSlips);

// Generate fee slips for new month (carries forward unpaid amounts as arrears)
router.post("/generate-new-month", async (req, res) => {
  try {
    const { month, year } = req.body;

    if (!month || !year) {
      return res.status(400).json({
        error: "Month and year are required",
      });
    }

    console.log(`🔧 Generating fee slips for new month: ${month}/${year}`);

    const result = await generateFeeSlipsForNewMonth(month, year);

    res.status(200).json({
      message: "Fee slips generated successfully for new month",
      month,
      year,
      ...result,
    });
  } catch (error) {
    console.error("❌ Error generating fee slips for new month:", error);
    res.status(500).json({
      error: "Failed to generate fee slips for new month",
      details: error.message,
    });
  }
});

// Manually trigger auto fee slip update (for testing)
router.post("/trigger-auto-update", async (req, res) => {
  try {
    console.log("🔧 Manually triggering auto fee slip update");

    const {
      autoUpdateMonthlyFeeSlips,
    } = require("../services/autoFeeSlipService");

    // Run the auto update function
    autoUpdateMonthlyFeeSlips();

    res.status(200).json({
      message: "Auto fee slip update triggered successfully",
      timestamp: new Date().toISOString(),
      note: "Check server logs for detailed results",
    });
  } catch (error) {
    console.error("❌ Error triggering auto update:", error);
    res.status(500).json({
      error: "Failed to trigger auto update",
      details: error.message,
    });
  }
});

// Get comprehensive arrears report for a student
router.get("/arrears-report/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const {
      getStudentArrearsReport,
    } = require("../services/autoFeeSlipService");

    const report = await getStudentArrearsReport(studentId);

    res.status(200).json({
      success: true,
      report: report,
      summary: {
        student_name: report.student_name,
        total_arrears: report.total_arrears,
        total_fee_slips: report.fee_slips.length,
      },
    });
  } catch (error) {
    console.error("❌ Error generating arrears report:", error);
    res.status(500).json({
      error: "Failed to generate arrears report",
      details: error.message,
    });
  }
});

// Get all fee slips with filters
router.get("/", getAllFeeSlips);

// Get fee slip by ID
router.get("/:id", getFeeSlipById);

// Get fee slip by slip ID (for barcode scanning)
router.get("/slip/:slipId", getFeeSlipBySlipId);

// Get fee slip by unique student barcode (for barcode scanning)
router.get("/barcode/:barcode", getFeeSlipByBarcode);

// Get detailed fee breakdown for fee submission form
router.get("/fee-breakdown/:barcode", getDetailedFeeBreakdown);

// Generate barcode image for fee slip (for portable scanner compatibility)
router.get("/barcode-image/:slipId", generateBarcodeImage);

// Generate barcode image for student (for portable scanner compatibility)
router.get("/student-barcode-image/:studentId", generateStudentBarcodeImage);

// Get fee slips by student ID
router.get("/student/:student_id", getFeeSlipsByStudent);

// Generate PDF for fee slip
router.get("/:id/pdf", generateFeeSlipPDF);

// Generate PDF for fee slip with barcode (new design)
router.get("/:id/pdf-with-barcode", generateFeeSlipWithBarcode);

// Generate PDF for fee slip with THE EDUCATORS design
router.get("/:id/pdf-educators", generateEducatorsFeeSlip);

// Generate improved PDF for fee slip with THE EDUCATORS design
// router.get("/:id/pdf-educators-improved", generateImprovedEducatorsFeeSlip);

// Generate bulk PDF for fee slips with THE EDUCATORS design
router.post("/bulk-educators", generateBulkEducatorsFeeSlips);

// Update fee slip status
router.put("/:id/status", updateFeeSlipStatus);

// Delete fee slip
router.delete("/:id", deleteFeeSlip);

module.exports = router;
