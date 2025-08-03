const db = require("../config/db");
const fs = require("fs");
const path = require("path");

// Generate unique slip number (unique per student, not per month)
const generateUniqueSlipNumber = (studentId) => {
  const paddedStudentId = studentId.toString().padStart(4, "0");
  const timestamp = Date.now().toString().slice(-6); // Last 6 digits of timestamp
  const randomSuffix = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `FS${paddedStudentId}${timestamp}${randomSuffix}`;
};

// Generate monthly slip number (for backward compatibility)
const generateSlipNumber = (studentId, month, year) => {
  const paddedStudentId = studentId.toString().padStart(4, "0");
  const paddedMonth = month.toString().padStart(2, "0");
  return `FS${paddedStudentId}${paddedMonth}${year}`;
};

// Generate unique student barcode
const generateStudentBarcode = (studentId, admissionNumber) => {
  const paddedStudentId = studentId.toString().padStart(4, "0");
  // Create unique barcode: ST (Student) + StudentID + Admission Number (cleaned) + timestamp
  const cleanAdmissionNumber = admissionNumber.replace(/[^A-Z0-9]/g, "");
  const timestamp = Date.now().toString().slice(-4); // Last 4 digits of timestamp
  const randomSuffix = Math.floor(Math.random() * 100)
    .toString()
    .padStart(2, "0");
  return `ST${paddedStudentId}${cleanAdmissionNumber}${timestamp}${randomSuffix}`;
};

// Create simple text-based barcode representation
const createBarcodeText = (barcodeData) => {
  // Create a simple visual barcode using text
  const bars = barcodeData
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      return "|".repeat(Math.floor(code / 10) + 1);
    })
    .join(" ");

  return bars;
};

// Generate fee slip for a single student
exports.generateFeeSlip = async (req, res) => {
  const { student_id, month, year } = req.body;

  console.log(
    "🔧 Generating fee slip for student_id:",
    student_id,
    "month:",
    month,
    "year:",
    year
  );

  // Check if fee slip already exists for this student and month
  const checkQuery = `
    SELECT id, slip_id FROM fee_slips 
    WHERE student_id = ? AND month = ? AND year = ?
  `;

  db.query(checkQuery, [student_id, month, year], (err, results) => {
    if (err) {
      console.error("❌ Error checking existing fee slip:", err);
      return res.status(500).json({ error: "Database error" });
    }

    console.log("🔍 Checked existing fee slips:", results.length, "found");

    if (results.length > 0) {
      // Fee slip already exists, but we need to check current payment status
      const existingFeeSlip = results[0];

      // Get current payment status for this month
      const currentPaymentQuery = `
        SELECT COALESCE(SUM(amount), 0) as paid_amount
        FROM fees 
        WHERE student_id = ? 
        AND month = ? 
        AND year = ?
        AND fee_type IN ('Monthly Fee', 'Admission Fee', 'Arrears', 'Fine')
      `;

      db.query(
        currentPaymentQuery,
        [student_id, month, year],
        (err, paymentResult) => {
          if (err) {
            console.error("Error checking current payment status:", err);
            return res.status(500).json({ error: "Database error" });
          }

          const paidAmount = parseFloat(paymentResult[0].paid_amount) || 0;
          const originalTotal = parseFloat(existingFeeSlip.total_amount) || 0;
          const isFullyPaid = paidAmount >= originalTotal;

          // Use comprehensive fee calculation instead of simple comparison
          // Get the existing fee slip data and use comprehensive calculation
          const getExistingFeeSlipQuery = `
          SELECT * FROM fee_slips WHERE id = ?
        `;

          db.query(
            getExistingFeeSlipQuery,
            [existingFeeSlip.id],
            (err, feeSlipResult) => {
              if (err) {
                console.error("Error fetching existing fee slip:", err);
                return res.status(500).json({ error: "Database error" });
              }

              if (feeSlipResult.length === 0) {
                return res.status(404).json({ error: "Fee slip not found" });
              }

              const existingFeeSlipData = feeSlipResult[0];

              // Use comprehensive fee calculation
              this.getComprehensiveFeeData(
                student_id,
                existingFeeSlipData,
                res
              );
            }
          );
        }
      );
      return; // Add return statement to prevent further execution
    }

    // Get student information
    const studentQuery = `
      SELECT s.*, c.name as class_name 
      FROM students s 
      LEFT JOIN classes c ON s.class_id = c.id 
      WHERE s.id = ?
    `;

    db.query(studentQuery, [student_id], (err, students) => {
      if (err) {
        console.error("❌ Error fetching student:", err);
        return res.status(500).json({ error: "Database error" });
      }

      console.log(
        "👤 Fetched student data:",
        students.length,
        "students found"
      );

      if (students.length === 0) {
        console.log("❌ Student not found with ID:", student_id);
        return res.status(404).json({ error: "Student not found" });
      }

      const student = students[0];
      const monthlyFee = parseFloat(student.monthly_fee) || 0;

      // Calculate arrears (unpaid fees from previous months, accounting for payments made)
      const arrearsQuery = `
        SELECT COALESCE(SUM(
          fs.total_amount - COALESCE(
            (SELECT SUM(f2.amount) 
             FROM fees f2 
             WHERE f2.student_id = fs.student_id 
             AND f2.month = fs.month 
             AND f2.year = fs.year
             AND f2.fee_type IN ('Monthly Fee', 'Arrears', 'Fine', 'Annual Fee')
            ), 0)
        ), 0) as arrears
        FROM fee_slips fs
        WHERE fs.student_id = ? 
          AND (fs.month < ? OR (fs.month = ? AND fs.year < ?))
          AND fs.status = 'Pending'
      `;

      db.query(
        arrearsQuery,
        [student_id, month, month, year],
        (err, arrearsResult) => {
          if (err) {
            console.error("Error calculating arrears:", err);
            return res.status(500).json({ error: "Database error" });
          }

          const arrears = parseFloat(arrearsResult[0].arrears) || 0;

          // Calculate fine (unpaid fines from previous months)
          const fineQuery = `
            SELECT COALESCE(SUM(fs.fine_amount - COALESCE(
              (SELECT SUM(f2.amount) 
               FROM fees f2 
               WHERE f2.student_id = fs.student_id 
               AND f2.month = fs.month 
               AND f2.year = fs.year
               AND f2.fee_type = 'Fine'
              ), 0)
            ), 0) as total_fine
            FROM fee_slips fs
            WHERE fs.student_id = ? 
              AND (fs.month < ? OR (fs.month = ? AND fs.year < ?))
              AND fs.fine_amount > 0
          `;

          db.query(
            fineQuery,
            [student_id, month, month, year],
            (err, fineResult) => {
              if (err) {
                console.error("Error calculating fine:", err);
                return res.status(500).json({ error: "Database error" });
              }

              const fine = parseFloat(fineResult[0].total_fine) || 0;
              const discount = 0; // Can be applied based on business logic

              // Check if current month fee is already paid
              const checkCurrentMonthPaymentQuery = `
              SELECT COALESCE(SUM(amount), 0) as paid_amount
              FROM fees 
              WHERE student_id = ? 
              AND month = ? 
              AND year = ?
              AND fee_type IN ('Monthly Fee', 'Admission Fee', 'Arrears', 'Fine')
            `;

              db.query(
                checkCurrentMonthPaymentQuery,
                [student_id, month, year],
                (err, paymentResult) => {
                  if (err) {
                    console.error("Error checking current month payment:", err);
                    return res.status(500).json({ error: "Database error" });
                  }

                  const paidAmount =
                    parseFloat(paymentResult[0].paid_amount) || 0;
                  const totalFeeForMonth = monthlyFee + arrears + fine;

                  // If already paid for this month, show zero amounts (only if there are actual payments)
                  if (paidAmount > 0 && paidAmount >= totalFeeForMonth) {
                    const totalAmount = 0;

                    // Insert fee slip with zero amounts
                    const insertQuery = `
                INSERT INTO fee_slips (
                  slip_id, student_id, admission_number, student_name, class_name,
                  month, year, monthly_fee, admission_fee, arrears_amount, fine_amount, 
                  discount_amount, total_amount, due_date, barcode_data
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
              `;

                    const values = [
                      generateUniqueSlipNumber(student_id),
                      student_id,
                      student.admission_number || "",
                      student.name,
                      student.class_name || "",
                      month,
                      year,
                      0, // monthly_fee = 0 (already paid)
                      0, // admission_fee = 0 (already paid)
                      0, // arrears_amount = 0 (already paid)
                      0, // fine_amount = 0 (already paid)
                      discount,
                      totalAmount,
                      new Date(year, month - 1, 10),
                      generateStudentBarcode(
                        student_id,
                        student.admission_number || ""
                      ),
                    ];

                    db.query(insertQuery, values, (err, result) => {
                      if (err) {
                        console.error("Error creating fee slip:", err);
                        return res
                          .status(500)
                          .json({ error: "Database error" });
                      }

                      res.status(201).json({
                        message: "Fee slip generated successfully (No Dues)",
                        slip_id: result.insertId,
                        slip_number: values[0],
                        total_amount: totalAmount,
                        status: "No Dues",
                      });
                    });
                    return;
                  }

                  // Check if admission fee should be included (only for unpaid admission)
                  let admissionFee = 0;
                  if (
                    !student.is_admission_paid &&
                    student.admission_fee_amount > 0
                  ) {
                    admissionFee = parseFloat(student.admission_fee_amount);
                  }

                  const totalAmount =
                    admissionFee + monthlyFee + arrears + fine - discount;

                  // Set due date to 10th of next month (month is 0-indexed in Date constructor)
                  const dueDate = new Date(year, month - 1, 10);

                  const slipNumber = generateUniqueSlipNumber(student_id);

                  // Insert fee slip
                  const insertQuery = `
              INSERT INTO fee_slips (
                slip_id, student_id, admission_number, student_name, class_name,
                month, year, monthly_fee, admission_fee, arrears_amount, fine_amount, 
                discount_amount, total_amount, due_date, barcode_data
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

                  const values = [
                    slipNumber,
                    student_id,
                    student.admission_number || "",
                    student.name,
                    student.class_name || "",
                    month,
                    year,
                    monthlyFee,
                    admissionFee,
                    arrears,
                    fine,
                    discount,
                    totalAmount,
                    dueDate,
                    generateStudentBarcode(
                      student_id,
                      student.admission_number || ""
                    ),
                  ];

                  db.query(insertQuery, values, (err, result) => {
                    if (err) {
                      console.error("Error creating fee slip:", err);
                      return res.status(500).json({ error: "Database error" });
                    }

                    res.status(201).json({
                      message: "Fee slip generated successfully",
                      slip_id: result.insertId,
                      slip_number: slipNumber,
                      total_amount: totalAmount,
                    });
                  });
                }
              );
            }
          );
        }
      );
    });
  });
};

// Generate fee slips for all students
exports.generateAllFeeSlips = async (req, res) => {
  const { month, year } = req.body;

  try {
    console.log("🔧 Generating fee slips for month:", month, "year:", year);

    // Get all active students
    const studentsQuery = `
      SELECT s.*, c.name as class_name 
      FROM students s 
      LEFT JOIN classes c ON s.class_id = c.id 
      WHERE s.status = 'Active'
    `;

    db.query(studentsQuery, async (err, students) => {
      if (err) {
        console.error("Error fetching students:", err);
        return res.status(500).json({ error: "Database error" });
      }

      console.log("📋 Found", students.length, "active students");

      let generatedCount = 0;
      let skippedCount = 0;
      let errors = [];
      let processedCount = 0;

      // Process students sequentially to avoid race conditions
      for (let i = 0; i < students.length; i++) {
        const student = students[i];

        try {
          const slipNumber = generateUniqueSlipNumber(student.id);

          // Check if fee slip already exists
          const checkQuery = `
            SELECT id FROM fee_slips 
            WHERE student_id = ? AND month = ? AND year = ?
          `;

          const checkResult = await new Promise((resolve, reject) => {
            db.query(checkQuery, [student.id, month, year], (err, results) => {
              if (err) reject(err);
              else resolve(results);
            });
          });

          if (checkResult.length > 0) {
            console.log(
              `⏭️ Skipping ${student.name} - fee slip already exists`
            );
            skippedCount++;
          } else {
            // Generate fee slip for this student
            const monthlyFee = parseFloat(student.monthly_fee) || 0;
            const arrears = 0; // Simplified for bulk generation
            const fine = 0;
            const discount = 0;
            const totalAmount = monthlyFee + arrears + fine - discount;
            const dueDate = new Date(year, month - 1, 10); // month is 0-indexed

            const insertQuery = `
              INSERT INTO fee_slips (
                slip_id, student_id, admission_number, student_name, class_name,
                month, year, monthly_fee, arrears_amount, fine_amount, 
                discount_amount, total_amount, due_date, barcode_data
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const values = [
              slipNumber,
              student.id,
              student.admission_number || "",
              student.name,
              student.class_name || "",
              month,
              year,
              monthlyFee,
              arrears,
              fine,
              discount,
              totalAmount,
              dueDate,
              generateStudentBarcode(
                student.id,
                student.admission_number || ""
              ),
            ];

            await new Promise((resolve, reject) => {
              db.query(insertQuery, values, (err, result) => {
                if (err) {
                  console.error(
                    `❌ Error generating fee slip for ${student.name}:`,
                    err
                  );
                  errors.push(
                    `Error generating fee slip for ${student.name}: ${err.message}`
                  );
                  reject(err);
                } else {
                  console.log(`✅ Generated fee slip for ${student.name}`);
                  generatedCount++;
                  resolve(result);
                }
              });
            });
          }
        } catch (error) {
          console.error(`❌ Error processing student ${student.name}:`, error);
          errors.push(`Error processing ${student.name}: ${error.message}`);
        }

        processedCount++;
      }

      console.log("🎉 Fee slip generation completed");
      console.log("📊 Results:", {
        generated: generatedCount,
        skipped: skippedCount,
        errors: errors.length,
      });

      res.json({
        message: "Fee slips generation completed",
        generated: generatedCount,
        skipped: skippedCount,
        errors: errors,
      });
    });
  } catch (error) {
    console.error("❌ Error generating all fee slips:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get fee slip by ID
exports.getFeeSlipById = (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT 
      fs.*,
      s.father_name,
      s.cnic,
      s.phone
    FROM fee_slips fs
    LEFT JOIN students s ON fs.student_id = s.id
    WHERE fs.id = ?
  `;

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching fee slip:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Fee slip not found" });
    }

    res.json(results[0]);
  });
};

// Get fee slips by student ID
exports.getFeeSlipsByStudent = (req, res) => {
  const { student_id } = req.params;

  const query = `
    SELECT 
      fs.*,
      s.name as student_name,
      s.admission_number,
      s.father_name,
      c.name as class_name
    FROM fee_slips fs
    LEFT JOIN students s ON fs.student_id = s.id
    LEFT JOIN classes c ON s.class_id = c.id
    WHERE fs.student_id = ?
    ORDER BY fs.year DESC, fs.month DESC
  `;

  db.query(query, [student_id], (err, results) => {
    if (err) {
      console.error("Error fetching fee slips:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results);
  });
};

// Get all fee slips with filters
exports.getAllFeeSlips = (req, res) => {
  const { month, year, status, class_id, search } = req.query;

  let query = `
    SELECT 
      fs.*
    FROM fee_slips fs
    WHERE 1=1
  `;

  const params = [];

  if (month) {
    query += " AND fs.month = ?";
    params.push(month);
  }

  if (year) {
    query += " AND fs.year = ?";
    params.push(year);
  }

  if (status) {
    query += " AND fs.status = ?";
    params.push(status);
  }

  if (class_id) {
    query += " AND s.class_id = ?";
    params.push(class_id);
  }

  if (search) {
    query +=
      " AND (fs.student_name LIKE ? OR fs.admission_number LIKE ? OR fs.slip_id LIKE ?)";
    const searchTerm = `%${search}%`;
    params.push(searchTerm, searchTerm, searchTerm);
  }

  query += " ORDER BY fs.generated_at DESC";

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error fetching fee slips:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results);
  });
};

// Generate PDF for fee slip
exports.generateFeeSlipPDF = async (req, res) => {
  const { id } = req.params;

  try {
    // Get fee slip data
    const query = `
      SELECT 
        fs.*,
        s.father_name,
        s.cnic,
        s.phone
      FROM fee_slips fs
      LEFT JOIN students s ON fs.student_id = s.id
      WHERE fs.id = ?
    `;

    db.query(query, [id], async (err, results) => {
      if (err) {
        console.error("Error fetching fee slip:", err);
        return res.status(500).json({ error: "Database error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Fee slip not found" });
      }

      const feeSlip = results[0];

      // Get comprehensive fee data
      const comprehensiveQuery = `
        SELECT 
          s.monthly_fee,
          s.id as student_id,
          s.name as student_name,
          s.admission_number,
          s.father_name,
          s.cnic,
          s.phone,
          s.profile_image,
          s.is_admission_paid,
          c.name as class_name,
          COALESCE(fs.arrears_amount, 0) as original_arrears,
          COALESCE(fs.fine_amount, 0) as original_fine,
          COALESCE(fs.total_amount, 0) as total_due,
          COALESCE(fs.monthly_fee, 0) as slip_monthly_fee,
          COALESCE(s.admission_fee_amount, 0) as slip_admission_fee,
          COALESCE(fs.discount_amount, 0) as discount_amount,
          fs.month as slip_month,
          fs.year as slip_year,
          fs.due_date,
          fs.status as slip_status,
          fs.slip_id,
          fs.barcode_data,
          (
            SELECT COALESCE(SUM(f.amount), 0)
            FROM fees f
            WHERE f.student_id = s.id 
            AND f.fee_type IN ('Monthly Fee', 'Admission Fee', 'Arrears', 'Fine')
            AND f.month = fs.month
            AND f.year = fs.year
          ) as paid_this_month
        FROM students s
        LEFT JOIN classes c ON s.class_id = c.id
        LEFT JOIN fee_slips fs ON s.id = fs.student_id
        WHERE s.id = ?
        AND fs.id = ?
      `;

      db.query(comprehensiveQuery, [feeSlip.student_id, id], (err, results) => {
        if (err) {
          console.error("Error fetching comprehensive fee data:", err);
          return res.status(500).json({ error: "Database error" });
        }

        if (results.length === 0) {
          return res.status(404).json({ error: "Student data not found" });
        }

        const studentData = results[0];
        const paidThisMonth = parseFloat(studentData.paid_this_month) || 0;
        const currentMonthExpected =
          parseFloat(studentData.slip_monthly_fee) || 0;
        const currentMonthPaid = Math.min(paidThisMonth, currentMonthExpected);
        const currentMonthRemaining = Math.max(
          0,
          currentMonthExpected - currentMonthPaid
        );
        const arrearsAmount = parseFloat(studentData.original_arrears) || 0;

        // Check if current date is past the due date (25th of the month)
        const currentDate = new Date();
        const dueDate = new Date(feeSlip.due_date);
        const isPastDueDate = currentDate > dueDate;

        // Auto-advance to next month after 25th
        let effectiveMonth = feeSlip.month;
        let effectiveYear = feeSlip.year;

        if (isPastDueDate) {
          // Move to next month
          effectiveMonth = feeSlip.month + 1;
          if (effectiveMonth > 12) {
            effectiveMonth = 1;
            effectiveYear = feeSlip.year + 1;
          }
        }

        // Generate HTML template
        const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Educator School - Fee Slip</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .fee-slip {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #2196F3;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .school-name {
            font-size: 28px;
            font-weight: bold;
            color: #2196F3;
            margin: 0;
        }
        .fee-slip-title {
            font-size: 18px;
            color: #666;
            margin: 5px 0 0 0;
        }
        .student-info, .payment-status {
            margin-bottom: 30px;
        }
        .section-title {
            font-size: 16px;
            font-weight: bold;
            color: #333;
            margin-bottom: 15px;
            border-bottom: 2px solid #eee;
            padding-bottom: 5px;
        }
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }
        .info-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #f0f0f0;
        }
        .info-label {
            font-weight: bold;
            color: #555;
        }
        .info-value {
            color: #333;
        }
        .payment-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
        }
        .payment-item {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
        }
        .payment-label {
            font-size: 14px;
            color: #666;
            margin-bottom: 5px;
        }
        .payment-amount {
            font-size: 18px;
            font-weight: bold;
            color: #2196F3;
        }
        .total-amount {
            text-align: right;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #2196F3;
        }
        .total-label {
            font-size: 16px;
            font-weight: bold;
            color: #333;
        }
        .total-value {
            font-size: 24px;
            font-weight: bold;
            color: #2196F3;
        }
        .footer {
            margin-top: 40px;
            text-align: center;
            color: #666;
            font-size: 12px;
        }
        .barcode-section {
            text-align: center;
            margin-top: 30px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
        }
        .barcode-text {
            font-family: monospace;
            font-size: 14px;
            color: #333;
            margin-top: 10px;
        }
        .due-date {
            color: #f44336;
            font-weight: bold;
        }
        .arrears {
            color: #ff9800;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="fee-slip">
        <div class="header">
            <h1 class="school-name">The Educator School</h1>
            <p class="fee-slip-title">Fee Slip</p>
        </div>

        <div class="student-info">
            <h2 class="section-title">Student Information</h2>
            <div class="info-grid">
                <div class="info-item">
                    <span class="info-label">Name:</span>
                    <span class="info-value">${studentData.student_name}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Admission Number:</span>
                    <span class="info-value">${
                      studentData.admission_number
                    }</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Father's Name:</span>
                    <span class="info-value">${studentData.father_name}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Class:</span>
                    <span class="info-value">${studentData.class_name}</span>
                </div>
            </div>
        </div>

        <div class="payment-status">
            <h2 class="section-title">${new Date(
              effectiveYear,
              effectiveMonth - 1
            ).toLocaleString("default", { month: "long" })} Payment Status</h2>
            <div class="payment-grid">
                <div class="payment-item">
                    <div class="payment-label">Total Monthly Fee</div>
                    <div class="payment-amount">Rs. ${currentMonthExpected.toFixed(
                      2
                    )}</div>
                </div>
                <div class="payment-item">
                    <div class="payment-label">${new Date(
                      effectiveYear,
                      effectiveMonth - 1
                    ).toLocaleString("default", { month: "long" })} Paid</div>
                    <div class="payment-amount">Rs. ${currentMonthPaid.toFixed(
                      2
                    )}</div>
                </div>
                <div class="payment-item">
                    <div class="payment-label">Arrears</div>
                    <div class="payment-amount arrears">Rs. ${arrearsAmount.toFixed(
                      2
                    )}</div>
                </div>
            </div>
        </div>

        <div class="total-amount">
            <div class="total-label">Total Amount:</div>
            <div class="total-value">Rs. ${(
              currentMonthExpected - currentMonthPaid
            ).toFixed(2)}</div>
        </div>

        <div class="barcode-section">
            <div class="info-item">
                <span class="info-label">Due Date:</span>
                <span class="info-value due-date">${new Date(
                  feeSlip.due_date
                ).toLocaleDateString()}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Slip Number:</span>
                <span class="info-value">${feeSlip.slip_id}</span>
            </div>
            <div class="barcode-text">${feeSlip.barcode_data}</div>
        </div>

        <div class="footer">
            <p>Generated on: ${new Date().toLocaleString()}</p>
            <p>Page 1/1</p>
        </div>
    </div>
</body>
</html>`;

        // Set response headers for PDF
        res.setHeader("Content-Type", "text/html");
        res.setHeader(
          "Content-Disposition",
          `inline; filename="fee_slip_${id}.html"`
        );

        // Send the HTML
        res.send(html);
      });
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update fee slip status
exports.updateFeeSlipStatus = (req, res) => {
  const { id } = req.params;
  const { status, payment_date, payment_method, remarks } = req.body;

  console.log("🔧 Updating fee slip status:", {
    id,
    status,
    payment_date,
    payment_method,
  });

  // First, get the fee slip details to add revenue entry
  const getFeeSlipQuery = `
    SELECT fs.*, s.name as student_name, s.admission_number, c.name as class_name
    FROM fee_slips fs
    LEFT JOIN students s ON fs.student_id = s.id
    LEFT JOIN classes c ON s.class_id = c.id
    WHERE fs.id = ?
  `;

  db.query(getFeeSlipQuery, [id], (getErr, feeSlipResult) => {
    if (getErr) {
      console.error("Error fetching fee slip details:", getErr);
      return res.status(500).json({ error: "Database error" });
    }

    if (feeSlipResult.length === 0) {
      return res.status(404).json({ error: "Fee slip not found" });
    }

    const feeSlip = feeSlipResult[0];

    // Update the fee slip status
    const updateQuery = `
      UPDATE fee_slips 
      SET status = ?, payment_date = ?, payment_method = ?, remarks = ?
      WHERE id = ?
    `;

    const updateValues = [status, payment_date, payment_method, remarks, id];

    db.query(updateQuery, updateValues, (err, result) => {
      if (err) {
        console.error("Error updating fee slip:", err);
        return res.status(500).json({ error: "Database error" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Fee slip not found" });
      }

      // If status is being changed to PAID, add revenue entry
      if (status === "PAID" && payment_date) {
        const revenueQuery = `
          INSERT INTO revenue (source, amount, date, description, category)
          VALUES (?, ?, ?, ?, ?)
        `;

        const revenueDescription = `Fee slip payment from ${feeSlip.student_name} (${feeSlip.admission_number}) - Month: ${feeSlip.month}/${feeSlip.year}`;
        const revenueValues = [
          `Student Fee - ${feeSlip.class_name}`,
          feeSlip.total_amount,
          payment_date,
          revenueDescription,
          "Fees",
        ];

        db.query(revenueQuery, revenueValues, (revenueErr, revenueResult) => {
          if (revenueErr) {
            console.error(
              "Error adding revenue entry for fee slip:",
              revenueErr
            );
          } else {
            console.log("✅ Revenue entry added for fee slip payment:", {
              fee_slip_id: id,
              revenue_id: revenueResult.insertId,
              amount: feeSlip.total_amount,
              student: feeSlip.student_name,
            });
          }
        });
      }

      res.json({ message: "Fee slip status updated successfully" });
    });
  });
};

// Delete fee slip
exports.deleteFeeSlip = (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM fee_slips WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting fee slip:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Fee slip not found" });
    }

    res.json({ message: "Fee slip deleted successfully" });
  });
};

// Get fee slip by slip ID (for barcode scanning)
exports.getFeeSlipBySlipId = (req, res) => {
  const { slipId } = req.params;

  try {
    // Get fee slip data by slip_id
    const query = `
      SELECT 
        fs.*,
        s.name as student_name,
        s.admission_number,
        s.father_name,
        s.cnic,
        s.phone,
        s.profile_image,
        c.name as class_name
      FROM fee_slips fs
      LEFT JOIN students s ON fs.student_id = s.id
      LEFT JOIN classes c ON s.class_id = c.id
      WHERE fs.slip_id = ?
    `;

    db.query(query, [slipId], (err, results) => {
      if (err) {
        console.error("Error fetching fee slip by slip ID:", err);
        return res.status(500).json({ error: "Database error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Fee slip not found" });
      }

      const feeSlip = results[0];

      // Use the comprehensive fee data function to get updated payment status
      this.getComprehensiveFeeData(feeSlip.student_id, feeSlip, res);
    });
  } catch (error) {
    console.error("Error fetching fee slip by slip ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get fee slip by unique student barcode or slip number (for barcode scanning)
exports.getFeeSlipByBarcode = (req, res) => {
  const { barcode } = req.params;

  try {
    // First, try to find by slip_id (if barcode is a slip number)
    const slipQuery = `
      SELECT 
        fs.*,
        s.name as student_name,
        s.admission_number,
        s.father_name,
        s.cnic,
        s.phone,
        s.profile_image,
        c.name as class_name
      FROM fee_slips fs
      LEFT JOIN students s ON fs.student_id = s.id
      LEFT JOIN classes c ON s.class_id = c.id
      WHERE fs.slip_id = ?
      ORDER BY fs.month DESC, fs.year DESC
      LIMIT 1
    `;

    db.query(slipQuery, [barcode], (err, slipResults) => {
      if (err) {
        console.error("Error fetching fee slip by slip ID:", err);
        return res.status(500).json({ error: "Database error" });
      }

      if (slipResults.length > 0) {
        // Found by slip_id
        const feeSlip = slipResults[0];
        this.getComprehensiveFeeData(feeSlip.student_id, feeSlip, res);
        return;
      }

      // If not found by slip_id, try by barcode_data (student barcode)
      const studentQuery = `
        SELECT DISTINCT student_id 
        FROM fee_slips 
        WHERE barcode_data = ?
        LIMIT 1
      `;

      db.query(studentQuery, [barcode], (err, studentResults) => {
        if (err) {
          console.error("Error fetching student by barcode:", err);
          return res.status(500).json({ error: "Database error" });
        }

        if (studentResults.length === 0) {
          return res
            .status(404)
            .json({ error: "Fee slip not found for this barcode" });
        }

        const studentId = studentResults[0].student_id;

        // Now get the latest fee slip for this specific student
        const query = `
          SELECT 
            fs.*,
            s.name as student_name,
            s.admission_number,
            s.father_name,
            s.cnic,
            s.phone,
            s.profile_image,
            c.name as class_name
          FROM fee_slips fs
          LEFT JOIN students s ON fs.student_id = s.id
          LEFT JOIN classes c ON s.class_id = c.id
          WHERE fs.student_id = ?
          ORDER BY fs.month DESC, fs.year DESC
          LIMIT 1
        `;

        db.query(query, [studentId], (err, results) => {
          if (err) {
            console.error("Error fetching fee slip by student ID:", err);
            return res.status(500).json({ error: "Database error" });
          }

          if (results.length === 0) {
            return res
              .status(404)
              .json({ error: "Fee slip not found for this student" });
          }

          const feeSlip = results[0];
          this.getComprehensiveFeeData(studentId, feeSlip, res);
        });
      });
    });
  } catch (error) {
    console.error("Error fetching fee slip by barcode:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Helper function to get comprehensive fee data including payment history
exports.getComprehensiveFeeData = (studentId, feeSlip, res) => {
  // Get comprehensive payment and arrears information for this student
  const comprehensiveQuery = `
    SELECT 
      s.monthly_fee,
      s.id as student_id,
      s.name as student_name,
      s.admission_number,
      s.father_name,
      s.cnic,
      s.phone,
      s.profile_image,
      s.is_admission_paid,
      c.name as class_name,
      COALESCE(fs.arrears_amount, 0) as original_arrears,
      COALESCE(fs.fine_amount, 0) as original_fine,
      COALESCE(fs.total_amount, 0) as total_due,
      COALESCE(fs.monthly_fee, 0) as slip_monthly_fee,
      COALESCE(s.admission_fee_amount, 0) as slip_admission_fee,
      COALESCE(fs.discount_amount, 0) as discount_amount,
      fs.month as slip_month,
      fs.year as slip_year,
      fs.due_date,
      fs.status as slip_status,
      fs.slip_id,
      fs.barcode_data,
      (
        SELECT COALESCE(SUM(f.amount), 0)
        FROM fees f
        WHERE f.student_id = s.id 
        AND f.fee_type IN ('Monthly Fee', 'Admission Fee', 'Arrears', 'Fine')
        AND f.month = fs.month
        AND f.year = fs.year
      ) as paid_this_month,
      (
        SELECT COALESCE(SUM(f.amount), 0)
        FROM fees f
        WHERE f.student_id = s.id 
        AND f.fee_type = 'Arrears'
        AND f.month = fs.month
        AND f.year = fs.year
      ) as arrears_paid_this_month,
      (
        SELECT COALESCE(SUM(f.amount), 0)
        FROM fees f
        WHERE f.student_id = s.id 
        AND f.fee_type = 'Fine'
        AND f.month = fs.month
        AND f.year = fs.year
      ) as fine_paid_this_month,
      (
        SELECT COALESCE(SUM(f.amount), 0)
        FROM fees f
        WHERE f.student_id = s.id 
        AND f.fee_type = 'Monthly Fee'
        AND YEAR(f.payment_date) = fs.year
      ) as total_paid_this_year,
      (
        SELECT COUNT(*)
        FROM fees f
        WHERE f.student_id = s.id 
        AND f.fee_type = 'Monthly Fee'
        AND YEAR(f.payment_date) = fs.year
      ) as payments_made_this_year,
      (
        SELECT MAX(f.payment_date)
        FROM fees f
        WHERE f.student_id = s.id 
        AND f.fee_type = 'Monthly Fee'
      ) as last_payment_date,
      (
        SELECT COALESCE(SUM(f.amount), 0)
        FROM fees f
        WHERE f.student_id = s.id 
        AND f.fee_type = 'Arrears'
      ) as total_arrears_paid,
      (
        SELECT COALESCE(SUM(f.amount), 0)
        FROM fees f
        WHERE f.student_id = s.id 
        AND f.fee_type = 'Fine'
      ) as total_fine_paid,
      (
        SELECT COALESCE(SUM(f.amount), 0)
        FROM fees f
        WHERE f.student_id = s.id 
        AND f.fee_type = 'Annual Fee'
      ) as total_annual_fee_paid
    FROM students s
    LEFT JOIN classes c ON s.class_id = c.id
    LEFT JOIN fee_slips fs ON s.id = fs.student_id
    WHERE s.id = ?
    AND fs.id = (
      SELECT id 
      FROM fee_slips 
      WHERE student_id = s.id 
      ORDER BY month DESC, year DESC 
      LIMIT 1
    )
  `;

  db.query(comprehensiveQuery, [studentId], (err, results) => {
    if (err) {
      console.error("Error fetching comprehensive fee data:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Student data not found" });
    }

    const studentData = results[0];

    // Calculate current payment status
    const monthlyFee = parseFloat(studentData.monthly_fee) || 0;
    const slipMonthlyFee = parseFloat(studentData.slip_monthly_fee) || 0;
    const slipAdmissionFee = parseFloat(studentData.slip_admission_fee) || 0;
    const originalArrears = parseFloat(studentData.original_arrears) || 0;
    const originalFine = parseFloat(studentData.original_fine) || 0;
    const discountAmount = parseFloat(studentData.discount_amount) || 0;
    const paidThisMonth = parseFloat(studentData.paid_this_month) || 0;
    const arrearsPaidThisMonth =
      parseFloat(studentData.arrears_paid_this_month) || 0;
    const finePaidThisMonth = parseFloat(studentData.fine_paid_this_month) || 0;
    const totalPaidThisYear = parseFloat(studentData.total_paid_this_year) || 0;
    const totalArrearsPaid = parseFloat(studentData.total_arrears_paid) || 0;
    const totalFinePaid = parseFloat(studentData.total_fine_paid) || 0;
    const totalAnnualFeePaid =
      parseFloat(studentData.total_annual_fee_paid) || 0;

    // Check if current date is past the due date (25th of the month)
    const currentDate = new Date();
    const dueDate = new Date(feeSlip.due_date);
    const isPastDueDate = currentDate > dueDate;

    // Auto-advance to next month after 25th
    let effectiveMonth = feeSlip.month;
    let effectiveYear = feeSlip.year;

    if (isPastDueDate) {
      // Move to next month
      effectiveMonth = feeSlip.month + 1;
      if (effectiveMonth > 12) {
        effectiveMonth = 1;
        effectiveYear = feeSlip.year + 1;
      }
    }

    // Calculate comprehensive arrears system
    // All remaining amounts from previous months become arrears
    let updatedArrears = Math.max(0, originalArrears - arrearsPaidThisMonth);
    let updatedFine = Math.max(0, originalFine - finePaidThisMonth);

    // Calculate total outstanding from previous months
    const previousMonthsOutstanding = `
      SELECT COALESCE(SUM(
        fs.total_amount - COALESCE(
          (SELECT SUM(f2.amount) 
           FROM fees f2 
           WHERE f2.student_id = fs.student_id 
           AND f2.month = fs.month 
           AND f2.year = fs.year
           AND f2.fee_type IN ('Monthly Fee', 'Admission Fee', 'Arrears', 'Fine')
          ), 0)
      ), 0) as outstanding
      FROM fee_slips fs
      WHERE fs.student_id = ? 
        AND (fs.month < ? OR (fs.month = ? AND fs.year < ?))
        AND fs.status = 'Pending'
    `;

    // Add previous months' outstanding amounts to arrears
    db.query(
      previousMonthsOutstanding,
      [studentId, feeSlip.month, feeSlip.month, feeSlip.year],
      (err, outstandingResult) => {
        if (err) {
          console.error("Error calculating previous months outstanding:", err);
          return res.status(500).json({ error: "Database error" });
        }

        const previousOutstanding =
          parseFloat(outstandingResult[0].outstanding) || 0;
        updatedArrears += previousOutstanding;

        // If past due date, current month's remaining also becomes arrears
        if (isPastDueDate) {
          const currentMonthExpected = slipAdmissionFee + slipMonthlyFee;
          const currentMonthPaid = Math.min(
            paidThisMonth,
            currentMonthExpected
          );
          const currentMonthRemaining = Math.max(
            0,
            currentMonthExpected - currentMonthPaid
          );

          if (currentMonthRemaining > 0) {
            updatedArrears += currentMonthRemaining;
          }
        }

        // Calculate total fee for this month (original slip values)
        const totalFeeForThisMonth =
          slipAdmissionFee +
          slipMonthlyFee +
          updatedArrears +
          updatedFine -
          discountAmount;

        // Debug logging
        console.log("🔍 Debug - Student Payment Analysis:", {
          student_id: studentId,
          slipAdmissionFee,
          slipMonthlyFee,
          updatedArrears,
          updatedFine,
          discountAmount,
          totalFeeForThisMonth,
          paidThisMonth,
          isAdmissionPaid: studentData.is_admission_paid,
          studentHasAdmissionFee: slipAdmissionFee > 0,
        });

        // Check if current month is fully paid (only if there are actual payments)
        const isCurrentMonthFullyPaid =
          paidThisMonth > 0 && paidThisMonth >= totalFeeForThisMonth;

        // Calculate current month payment breakdown (for both paid and unpaid scenarios)
        const currentMonthPayment = paidThisMonth;
        const currentMonthExpected =
          slipAdmissionFee + (isPastDueDate ? slipMonthlyFee : slipMonthlyFee);
        const currentMonthPaid = Math.min(
          currentMonthPayment,
          currentMonthExpected
        );
        const currentMonthRemaining = Math.max(
          0,
          currentMonthExpected - currentMonthPaid
        );

        // If current month is fully paid, return zero values
        if (isCurrentMonthFullyPaid) {
          // For fully paid students, total remaining balance is 0
          const totalRemainingBalance = 0;
          return res.json({
            message: "Fee slip data retrieved successfully (No Dues)",
            feeSlip: {
              id: feeSlip.id,
              slip_id: feeSlip.slip_id,
              student_id: studentData.student_id,
              student_name: studentData.student_name,
              admission_number: studentData.admission_number,
              father_name: studentData.father_name,
              class_name: studentData.class_name,
              photo: studentData.profile_image,
              arrears_amount: totalRemainingBalance, // Show total remaining balance
              total_amount: 0, // Zero because fully paid
              due_date: feeSlip.due_date,
              month: studentData.slip_month,
              year: studentData.slip_year,
              status: "Paid",
              barcode: feeSlip.barcode_data,
            },
            payment_status: {
              total_fee: 0,
              amount_paid: paidThisMonth,
              remaining_balance: 0,
              new_arrears: 0,
              is_fully_paid: true,
              has_outstanding_amounts: false,
              payment_message: "No Dues",
              current_month_paid: currentMonthPaid,
              current_month_expected: currentMonthExpected,
            },
            arrears_info: {
              current_arrears: 0,
              current_fine: 0,
              total_due: 0,
              total_paid_this_year: totalPaidThisYear,
              total_arrears_paid: totalArrearsPaid,
              total_fine_paid: totalFinePaid,
              total_annual_fee_paid: totalAnnualFeePaid,
              expected_payments: studentData.slip_month,
              expected_amount: monthlyFee * studentData.slip_month,
              payments_made: studentData.payments_made_this_year || 0,
              last_payment_date: studentData.last_payment_date,
              has_arrears: false,
              has_fine: false,
              is_overdue: false,
              payment_progress: {
                made: studentData.payments_made_this_year || 0,
                expected: studentData.slip_month,
                percentage: 100,
              },
            },
          });
        }

        // Check if student actually has an admission fee set
        const studentHasAdmissionFee = slipAdmissionFee > 0;

        // Check if admission fee should be shown (only if not paid and student has admission fee)
        // If student has overpaid, admission fee should be considered paid
        const totalPaid = paidThisMonth;
        const totalExpected =
          slipAdmissionFee +
          slipMonthlyFee +
          updatedArrears +
          updatedFine -
          discountAmount;
        const isAdmissionPaid =
          studentData.is_admission_paid || totalPaid >= totalExpected;

        // Only show admission fee if student actually has an admission fee amount
        const admissionFeeToShow =
          isAdmissionPaid || !studentHasAdmissionFee ? 0 : slipAdmissionFee;

        // Calculate total expected fees for this month
        // If past due date, include next month's fee + arrears
        const currentMonthFee = isPastDueDate ? slipMonthlyFee : slipMonthlyFee; // Include next month's fee
        const totalExpectedFees =
          admissionFeeToShow +
          currentMonthFee +
          updatedArrears +
          updatedFine -
          discountAmount;

        // Calculate how much has been paid for this month's fees
        const paidForThisMonth = paidThisMonth;

        // Calculate remaining balance (can be negative if overpaid)
        const remainingBalance = totalExpectedFees - paidForThisMonth;

        // Calculate total remaining balance (all time unpaid amounts)
        const totalRemainingBalance = remainingBalance;

        // Calculate which fees are still due
        let admissionFeeDue = 0;
        let monthlyFeeDue = 0;
        let arrearsDue = 0;

        // Use existing current month payment variables from above

        if (remainingBalance > 0) {
          // Distribute remaining balance across unpaid fees
          let remainingToDistribute = remainingBalance;

          // First, pay admission fee if not paid
          if (!studentData.is_admission_paid && slipAdmissionFee > 0) {
            admissionFeeDue = Math.min(remainingToDistribute, slipAdmissionFee);
            remainingToDistribute -= admissionFeeDue;
          }

          // Then, pay monthly fee
          if (remainingToDistribute > 0 && slipMonthlyFee > 0) {
            monthlyFeeDue = Math.min(remainingToDistribute, slipMonthlyFee);
            remainingToDistribute -= monthlyFeeDue;
          }

          // Finally, any remaining goes to arrears
          if (remainingToDistribute > 0) {
            arrearsDue = remainingToDistribute;
          }
        }

        // If fully paid, all fees should be zero
        if (remainingBalance <= 0) {
          admissionFeeDue = 0;
          monthlyFeeDue = 0;
          arrearsDue = 0;
        }

        // Calculate expected payments for current year
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        const expectedPayments = currentMonth;
        const expectedAmount = monthlyFee * expectedPayments;

        // Determine if student has any outstanding amounts
        const hasOutstandingAmounts =
          remainingBalance > 0 || updatedArrears > 0 || updatedFine > 0;
        const isFullyPaid = remainingBalance <= 0;

        // Return comprehensive fee slip data with payment status
        res.json({
          message: "Fee slip data retrieved successfully",
          feeSlip: {
            id: feeSlip.id,
            slip_id: feeSlip.slip_id,
            student_id: studentData.student_id,
            student_name: studentData.student_name,
            admission_number: studentData.admission_number,
            father_name: studentData.father_name,
            class_name: studentData.class_name,
            photo: studentData.profile_image,
            arrears_amount: totalRemainingBalance, // Show total remaining balance
            total_amount: paidThisMonth, // Show only the amount paid
            due_date: feeSlip.due_date,
            month: effectiveMonth,
            year: effectiveYear,
            status: feeSlip.status,
            barcode: feeSlip.barcode_data,
          },
          payment_status: {
            total_fee: totalFeeForThisMonth,
            amount_paid: paidThisMonth,
            remaining_balance: remainingBalance,
            new_arrears: remainingBalance,
            is_fully_paid: isFullyPaid,
            has_outstanding_amounts: hasOutstandingAmounts,
            payment_message: isFullyPaid
              ? "No Dues"
              : `Remaining: ₨${remainingBalance}`,
            current_month_paid: currentMonthPaid,
            current_month_expected: currentMonthExpected,

            is_past_due_date: isPastDueDate,
            auto_arrears_added: isPastDueDate && updatedArrears > 0,
          },
          arrears_info: {
            current_arrears: updatedArrears,
            current_fine: updatedFine,
            total_due: totalFeeForThisMonth,
            total_paid_this_year: totalPaidThisYear,
            total_arrears_paid: totalArrearsPaid,
            total_fine_paid: totalFinePaid,
            total_annual_fee_paid: totalAnnualFeePaid,
            expected_payments: expectedPayments,
            expected_amount: expectedAmount,
            payments_made: studentData.payments_made_this_year || 0,
            last_payment_date: studentData.last_payment_date,
            has_arrears: updatedArrears > 0,
            has_fine: updatedFine > 0,
            is_overdue: remainingBalance > 0,
            payment_progress: {
              made: studentData.payments_made_this_year || 0,
              expected: expectedPayments,
              percentage:
                expectedPayments > 0
                  ? Math.round(
                      ((studentData.payments_made_this_year || 0) /
                        expectedPayments) *
                        100
                    )
                  : 0,
            },
          },
        });
      }
    );
  });
};
