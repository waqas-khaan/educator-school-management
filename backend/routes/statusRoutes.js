const express = require("express");
const router = express.Router();

const db = require("../config/db");

// Get server status
router.get("/", (req, res) => {
  res.json({
    status: "Server is running",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Get detailed fee slip statistics
router.get("/fee-slip-stats", (req, res) => {
  const query = `
    SELECT 
      s.id as student_id,
      s.name as student_name,
      s.admission_number,
      COUNT(fs.id) as fee_slip_count,
      GROUP_CONCAT(CONCAT(fs.month, '/', fs.year) ORDER BY fs.month, fs.year) as months
    FROM students s
    LEFT JOIN fee_slips fs ON s.id = fs.student_id
    WHERE s.status = 'Active'
    GROUP BY s.id, s.name, s.admission_number
    ORDER BY s.id
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching fee slip stats:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const stats = {
      totalStudents: results.length,
      studentsWithFeeSlips: results.filter((r) => r.fee_slip_count > 0).length,
      studentsWithoutFeeSlips: results.filter((r) => r.fee_slip_count === 0)
        .length,
      totalFeeSlips: results.reduce(
        (sum, r) => sum + parseInt(r.fee_slip_count),
        0
      ),
      details: results,
    };

    res.json(stats);
  });
});

module.exports = router;
