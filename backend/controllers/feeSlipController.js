const db = require("../config/db");
const fs = require("fs");
const path = require("path");
const JsBarcode = require("jsbarcode");

// Generate unique slip number (consistent for same student)
const generateUniqueSlipNumber = (studentId, admissionNumber) => {
  const paddedStudentId = studentId.toString().padStart(4, "0");
  const cleanAdmissionNumber = (admissionNumber || "").replace(
    /[^A-Z0-9]/g,
    ""
  );
  return `FS${paddedStudentId}${cleanAdmissionNumber}`;
};

// Generate monthly slip number (for backward compatibility)
const generateSlipNumber = (studentId, month, year) => {
  const paddedStudentId = studentId.toString().padStart(4, "0");
  const paddedMonth = month.toString().padStart(2, "0");
  return `FS${paddedStudentId}${paddedMonth}${year}`;
};

// Generate unique student barcode (consistent for same student)
const generateStudentBarcode = (studentId, admissionNumber) => {
  const paddedStudentId = studentId.toString().padStart(4, "0");
  // Create consistent barcode: FS (Fee Slip) + StudentID + Admission Number (cleaned)
  const cleanAdmissionNumber = admissionNumber.replace(/[^A-Z0-9]/g, "");
  return `FS${paddedStudentId}${cleanAdmissionNumber}`;
};

// Generate barcode image for portable scanner compatibility
const generateBarcodeImage = (barcodeData, format = "CODE128") => {
  try {
    // Create canvas element
    const { createCanvas } = require("canvas");
    const canvas = createCanvas(300, 100);
    const ctx = canvas.getContext("2d");

    // Generate barcode
    JsBarcode(canvas, barcodeData, {
      format: format,
      width: 2,
      height: 50,
      displayValue: true,
      fontSize: 14,
      margin: 10,
    });

    // Convert to buffer
    return canvas.toBuffer("image/png");
  } catch (error) {
    console.error("Error generating barcode image:", error);
    return null;
  }
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
      // Fee slip already exists - return existing fee slip data
      const existingFeeSlip = results[0];
      console.log("⏭️ Fee slip already exists for this student and month");

      return res.status(200).json({
        message: "Fee slip already exists",
        slip_id: existingFeeSlip.id,
        slip_number: existingFeeSlip.slip_id,
        total_amount: existingFeeSlip.total_amount,
        status: "Already Exists",
      });
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
      const transportFee = parseFloat(student.transport_fee) || 0;

      // Calculate arrears (only previous month's remaining balance)
      const previousMonth = month === 1 ? 12 : month - 1;
      const previousYear = month === 1 ? year - 1 : year;

      console.log(
        `🔍 Calculating arrears for month ${month}/${year}, looking at previous month ${previousMonth}/${previousYear}`
      );

      const arrearsQuery = `
        SELECT 
          fs.total_amount,
          fs.monthly_fee,
          fs.transport_fee,
          fs.admission_fee,
          fs.arrears_amount,
          fs.fine_amount,
          COALESCE(
            (SELECT SUM(f2.amount) 
             FROM fees f2 
             WHERE f2.student_id = fs.student_id 
             AND f2.month = fs.month 
             AND f2.year = fs.year
             AND f2.fee_type IN ('Monthly Fee', 'Transport Fee', 'Admission Fee', 'Arrears', 'Fine', 'Annual Fee')
            ), 0) as total_paid
        FROM fee_slips fs
        WHERE fs.student_id = ? 
          AND fs.month = ? 
          AND fs.year = ?
        ORDER BY fs.id DESC LIMIT 1
      `;

      console.log(`🔍 Arrears query: ${arrearsQuery}`);
      console.log(
        `🔍 Query parameters: [${student_id}, ${previousMonth}, ${previousYear}]`
      );

      db.query(
        arrearsQuery,
        [student_id, previousMonth, previousYear],
        (err, arrearsResult) => {
          if (err) {
            console.error("Error calculating arrears:", err);
            return res.status(500).json({ error: "Database error" });
          }

          let arrears = 0;
          if (arrearsResult.length > 0) {
            const feeSlip = arrearsResult[0];
            const totalAmount = parseFloat(feeSlip.total_amount) || 0;
            const totalPaid = parseFloat(feeSlip.total_paid) || 0;
            arrears = Math.max(0, totalAmount - totalPaid);

            console.log(`🔍 Arrears calculation for student ${student_id}:`);
            console.log(`   Previous month: ${previousMonth}/${previousYear}`);
            console.log(`   Total amount: ${totalAmount}`);
            console.log(`   Total paid: ${totalPaid}`);
            console.log(`   Arrears: ${arrears}`);
          }

          // Calculate fine (only previous month's unpaid fines)
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
              AND fs.month = ? 
              AND fs.year = ?
              AND fs.fine_amount > 0
          `;

          db.query(
            fineQuery,
            [student_id, previousMonth, previousYear],
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
                  month, year, monthly_fee, admission_fee, transport_fee, arrears_amount, fine_amount, 
                  discount_amount, total_amount, due_date, barcode_data
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
              `;

                    const values = [
                      generateUniqueSlipNumber(
                        student_id,
                        student.admission_number || ""
                      ),
                      student_id,
                      student.admission_number || "",
                      student.name,
                      student.class_name || "",
                      month,
                      year,
                      0, // monthly_fee = 0 (already paid)
                      0, // admission_fee = 0 (already paid)
                      0, // transport_fee = 0 (already paid)
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
                    admissionFee +
                    monthlyFee +
                    transportFee +
                    arrears +
                    fine -
                    discount;

                  // Set due date to 10th of next month (month is 0-indexed in Date constructor)
                  const dueDate = new Date(year, month - 1, 10);

                  const slipNumber = generateUniqueSlipNumber(
                    student_id,
                    student.admission_number || ""
                  );

                  // Insert fee slip
                  const insertQuery = `
              INSERT INTO fee_slips (
                slip_id, student_id, admission_number, student_name, class_name,
                month, year, monthly_fee, admission_fee, transport_fee, arrears_amount, fine_amount, 
                discount_amount, total_amount, due_date, barcode_data
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
                    transportFee,
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
          const slipNumber = generateUniqueSlipNumber(
            student.id,
            student.admission_number || ""
          );

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
            const transportFee = parseFloat(student.transport_fee) || 0;
            const arrears = 0; // Simplified for bulk generation
            const fine = 0;
            const discount = 0;
            const totalAmount =
              monthlyFee + transportFee + arrears + fine - discount;
            const dueDate = new Date(year, month - 1, 10); // month is 0-indexed

            const insertQuery = `
              INSERT INTO fee_slips (
                slip_id, student_id, admission_number, student_name, class_name,
                month, year, monthly_fee, transport_fee, arrears_amount, fine_amount, 
                discount_amount, total_amount, due_date, barcode_data
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
              transportFee,
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
        .barcode-container {
            text-align: center;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
            margin-top: 15px;
        }
        .barcode-note {
            margin-top: 8px;
            color: #666;
            font-style: italic;
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
            <div class="barcode-container">
                <div class="barcode-text">${feeSlip.barcode_data}</div>
                <div class="barcode-note">
                    <small>Portable barcode scanner compatible</small>
                </div>
            </div>
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

// Generate barcode image for fee slip (for portable scanner compatibility)
exports.generateBarcodeImage = async (req, res) => {
  const { slipId } = req.params;

  try {
    // Get fee slip data
    const query = `
      SELECT slip_id, barcode_data 
      FROM fee_slips 
      WHERE slip_id = ?
    `;

    db.query(query, [slipId], (err, results) => {
      if (err) {
        console.error("Error fetching fee slip:", err);
        return res.status(500).json({ error: "Database error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Fee slip not found" });
      }

      const feeSlip = results[0];
      const barcodeData = feeSlip.slip_id; // Use slip_id as barcode data

      // Generate barcode image
      const barcodeBuffer = generateBarcodeImage(barcodeData, "CODE128");

      if (!barcodeBuffer) {
        return res.status(500).json({ error: "Failed to generate barcode" });
      }

      // Set response headers
      res.setHeader("Content-Type", "image/png");
      res.setHeader(
        "Content-Disposition",
        `inline; filename="barcode_${slipId}.png"`
      );

      // Send barcode image
      res.send(barcodeBuffer);
    });
  } catch (error) {
    console.error("Error generating barcode image:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Generate barcode image for student (for portable scanner compatibility)
exports.generateStudentBarcodeImage = async (req, res) => {
  const { studentId } = req.params;

  try {
    // Get student data
    const query = `
      SELECT id, admission_number 
      FROM students 
      WHERE id = ?
    `;

    db.query(query, [studentId], (err, results) => {
      if (err) {
        console.error("Error fetching student:", err);
        return res.status(500).json({ error: "Database error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Student not found" });
      }

      const student = results[0];
      const barcodeData = generateStudentBarcode(
        student.id,
        student.admission_number
      );

      // Generate barcode image
      const barcodeBuffer = generateBarcodeImage(barcodeData, "CODE128");

      if (!barcodeBuffer) {
        return res.status(500).json({ error: "Failed to generate barcode" });
      }

      // Set response headers
      res.setHeader("Content-Type", "image/png");
      res.setHeader(
        "Content-Disposition",
        `inline; filename="student_barcode_${studentId}.png"`
      );

      // Send barcode image
      res.send(barcodeBuffer);
    });
  } catch (error) {
    console.error("Error generating student barcode image:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Helper function to get comprehensive fee data including payment history
exports.getComprehensiveFeeData = (studentId, feeSlip, res) => {
  // Get comprehensive payment and arrears information for this student
  const comprehensiveQuery = `
    SELECT 
      s.monthly_fee,
      s.transport_fee,
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
      COALESCE(fs.transport_fee, 0) as slip_transport_fee,
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
    const transportFee = parseFloat(studentData.transport_fee) || 0;
    const slipMonthlyFee = parseFloat(studentData.slip_monthly_fee) || 0;
    const slipTransportFee = parseFloat(studentData.slip_transport_fee) || 0;
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
          const currentMonthExpected =
            slipAdmissionFee + slipMonthlyFee + slipTransportFee;
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
          slipTransportFee +
          updatedArrears +
          updatedFine -
          discountAmount;

        // Debug logging
        console.log("🔍 Debug - Student Payment Analysis:", {
          student_id: studentId,
          slipAdmissionFee,
          slipMonthlyFee,
          slipTransportFee,
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
          slipTransportFee +
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
        const currentMonthTransportFee = isPastDueDate
          ? slipTransportFee
          : slipTransportFee; // Include next month's transport fee
        const totalExpectedFees =
          admissionFeeToShow +
          currentMonthFee +
          currentMonthTransportFee +
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
        let transportFeeDue = 0;
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

          // Then, pay transport fee (always include if not paid)
          if (remainingToDistribute > 0 && slipTransportFee > 0) {
            transportFeeDue = Math.min(remainingToDistribute, slipTransportFee);
            remainingToDistribute -= transportFeeDue;
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
          transportFeeDue = 0;
          arrearsDue = 0;
        }

        // Calculate expected payments for current year
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        const expectedPayments = currentMonth;
        const expectedAmount = monthlyFee * expectedPayments;

        // Determine if student has any outstanding amounts (including transport fees)
        const hasOutstandingAmounts =
          remainingBalance > 0 ||
          updatedArrears > 0 ||
          updatedFine > 0 ||
          transportFeeDue > 0;
        const isFullyPaid = remainingBalance <= 0 && transportFeeDue <= 0;

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

// Generate fee slip with two-column design (Parent's copy and School's copy) with barcode
exports.generateFeeSlipWithBarcode = async (req, res) => {
  const { id } = req.params;

  try {
    // Get fee slip data
    const query = `
      SELECT 
        fs.*,
        s.father_name,
        s.cnic,
        s.phone,
        s.monthly_fee,
        s.admission_fee_amount,
        c.name as class_name
      FROM fee_slips fs
      LEFT JOIN students s ON fs.student_id = s.id
      LEFT JOIN classes c ON s.class_id = c.id
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

      // Generate barcode for the fee slip
      const barcodeData =
        feeSlip.barcode_data ||
        `FS${feeSlip.student_id.toString().padStart(4, "0")}${Date.now()
          .toString()
          .slice(-6)}`;

      // Generate barcode image
      const barcodeBuffer = generateBarcodeImage(barcodeData);

      // Create PDF document
      const PDFDocument = require("pdfkit");
      const doc = new PDFDocument({
        size: "A4",
        layout: "landscape",
        margins: {
          top: 20,
          bottom: 20,
          left: 20,
          right: 20,
        },
      });

      // Set response headers for browser display
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `inline; filename="fee-slip-${feeSlip.slip_id}.pdf"`
      );

      // Pipe PDF to response
      doc.pipe(res);

      // Function to draw a single fee slip copy
      const drawFeeSlipCopy = (x, y, width, height, isParentCopy) => {
        // Draw border around the entire slip
        doc.rect(x, y, width, height).stroke("#000000");

        // Header with date and time
        const headerY = y + 10;

        // Date and time in top-left
        doc
          .fontSize(9)
          .font("Helvetica")
          .fill("#000")
          .text(
            new Date().toLocaleDateString("en-GB") +
              ", " +
              new Date().toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              }),
            x + 10,
            headerY
          );

        // Title in center
        doc
          .fontSize(16)
          .font("Helvetica-Bold")
          .fill("#000")
          .text("The Educator School", x + width / 2 - 80, headerY, {
            align: "center",
          });

        // Subtitle
        doc
          .fontSize(14)
          .font("Helvetica-Bold")
          .fill("#000")
          .text("Fee Slip", x + width / 2 - 30, headerY + 25, {
            align: "center",
          });

        // Student Information Section
        const studentInfoY = headerY + 60;

        // Section header
        doc
          .fontSize(12)
          .font("Helvetica-Bold")
          .fill("#000")
          .text("Student Information", x + 10, studentInfoY);

        // Student details table
        const detailY = studentInfoY + 20;
        const detailWidth = width - 20;
        const detailHeight = 20;

        // Name row
        doc
          .rect(x + 10, detailY, detailWidth, detailHeight)
          .fill("#f9f9f9")
          .stroke("#000000");
        doc
          .fontSize(10)
          .font("Helvetica")
          .fill("#000")
          .text("Name:", x + 15, detailY + 6)
          .text(feeSlip.student_name || "Unknown", x + 100, detailY + 6);

        // Admission Number row
        doc
          .rect(x + 10, detailY + detailHeight, detailWidth, detailHeight)
          .fill("#ffffff")
          .stroke("#000000");
        doc
          .fontSize(10)
          .font("Helvetica")
          .fill("#000")
          .text("Admission Number:", x + 15, detailY + detailHeight + 6)
          .text(
            feeSlip.admission_number || `E-${feeSlip.student_id}`,
            x + 100,
            detailY + detailHeight + 6
          );

        // Father's Name row
        doc
          .rect(x + 10, detailY + detailHeight * 2, detailWidth, detailHeight)
          .fill("#f9f9f9")
          .stroke("#000000");
        doc
          .fontSize(10)
          .font("Helvetica")
          .fill("#000")
          .text("Father's Name:", x + 15, detailY + detailHeight * 2 + 6)
          .text(
            feeSlip.father_name || "Unknown",
            x + 100,
            detailY + detailHeight * 2 + 6
          );

        // Class row
        doc
          .rect(x + 10, detailY + detailHeight * 3, detailWidth, detailHeight)
          .fill("#ffffff")
          .stroke("#000000");
        doc
          .fontSize(10)
          .font("Helvetica")
          .fill("#000")
          .text("Class:", x + 15, detailY + detailHeight * 3 + 6)
          .text(
            feeSlip.class_name || "Not Assigned",
            x + 100,
            detailY + detailHeight * 3 + 6
          );

        // Payment Status Section
        const paymentY = detailY + detailHeight * 4 + 20;

        // Section header
        doc
          .fontSize(12)
          .font("Helvetica-Bold")
          .fill("#000")
          .text("August Payment Status", x + 10, paymentY);

        // Payment details table
        const paymentDetailY = paymentY + 20;
        const paymentDetailWidth = width - 20;
        const paymentDetailHeight = 20;

        // Total Monthly Fee row
        doc
          .rect(x + 10, paymentDetailY, paymentDetailWidth, paymentDetailHeight)
          .fill("#f9f9f9")
          .stroke("#000000");
        doc
          .fontSize(10)
          .font("Helvetica")
          .fill("#000")
          .text("Total Monthly Fee:", x + 15, paymentDetailY + 6)
          .text(
            `Rs. ${parseFloat(feeSlip.monthly_fee || 0).toFixed(2)}`,
            x + 150,
            paymentDetailY + 6
          );

        // August Paid row
        doc
          .rect(
            x + 10,
            paymentDetailY + paymentDetailHeight,
            paymentDetailWidth,
            paymentDetailHeight
          )
          .fill("#ffffff")
          .stroke("#000000");
        doc
          .fontSize(10)
          .font("Helvetica")
          .fill("#000")
          .text(
            "August Paid:",
            x + 15,
            paymentDetailY + paymentDetailHeight + 6
          )
          .text("Rs. 0.00", x + 150, paymentDetailY + paymentDetailHeight + 6);

        // Arrears row
        doc
          .rect(
            x + 10,
            paymentDetailY + paymentDetailHeight * 2,
            paymentDetailWidth,
            paymentDetailHeight
          )
          .fill("#f9f9f9")
          .stroke("#000000");
        doc
          .fontSize(10)
          .font("Helvetica")
          .fill("#000")
          .text(
            "Arrears:",
            x + 15,
            paymentDetailY + paymentDetailHeight * 2 + 6
          )
          .text(
            `Rs. ${parseFloat(feeSlip.monthly_fee || 0).toFixed(2)}`,
            x + 150,
            paymentDetailY + paymentDetailHeight * 2 + 6
          );

        // Total Amount
        const totalAmount = parseFloat(feeSlip.monthly_fee || 0);
        const totalY = paymentDetailY + paymentDetailHeight * 3 + 10;
        doc
          .fontSize(12)
          .font("Helvetica-Bold")
          .fill("#000")
          .text(
            `Total Amount: Rs. ${totalAmount.toFixed(2)}`,
            x + width - 150,
            totalY,
            { align: "right" }
          );

        // Payment Details
        const paymentDetailsY = totalY + 20;
        doc
          .fontSize(10)
          .font("Helvetica")
          .fill("#000")
          .text("Due Date:", x + width / 2 - 50, paymentDetailsY, {
            align: "center",
          })
          .text(
            new Date(feeSlip.due_date).toLocaleDateString("en-GB"),
            x + width / 2 - 50,
            paymentDetailsY + 15,
            { align: "center" }
          );

        doc
          .fontSize(10)
          .font("Helvetica")
          .fill("#000")
          .text("Slip Number:", x + width / 2 - 50, paymentDetailsY + 35, {
            align: "center",
          })
          .text(
            feeSlip.slip_number || "FS" + Date.now(),
            x + width / 2 - 50,
            paymentDetailsY + 50,
            { align: "center" }
          );

        doc
          .fontSize(10)
          .font("Helvetica")
          .fill("#000")
          .text("Barcode:", x + width / 2 - 50, paymentDetailsY + 70, {
            align: "center",
          })
          .text(
            feeSlip.slip_number || "FS" + Date.now(),
            x + width / 2 - 50,
            paymentDetailsY + 85,
            { align: "center" }
          );

        // Barcode
        const barcodeY = paymentDetailsY + 110;
        const barcodeWidth = 200;
        const barcodeHeight = 50;
        const barcodeX = x + (width - barcodeWidth) / 2;

        // Barcode container
        doc
          .rect(barcodeX, barcodeY, barcodeWidth, barcodeHeight)
          .fill("#f0f0f0")
          .stroke("#000000");

        if (barcodeBuffer) {
          doc.image(barcodeBuffer, barcodeX + 10, barcodeY + 5, {
            width: barcodeWidth - 20,
            height: barcodeHeight - 10,
          });
        } else {
          // Fallback if barcode generation fails
          doc
            .fontSize(8)
            .fill("#666")
            .text(
              "BARCODE",
              barcodeX + barcodeWidth / 2 - 20,
              barcodeY + barcodeHeight / 2
            );
        }

        // Barcode text below
        doc
          .fontSize(9)
          .font("Helvetica")
          .fill("#000")
          .text(
            feeSlip.slip_number || "FS" + Date.now(),
            barcodeX,
            barcodeY + barcodeHeight + 5,
            { align: "center", width: barcodeWidth }
          );

        // Footer
        const footerY = y + height - 30;
        doc
          .fontSize(8)
          .font("Helvetica")
          .fill("#666")
          .text(
            `Generated on: ${new Date().toLocaleDateString(
              "en-GB"
            )}, ${new Date().toLocaleTimeString("en-GB")}`,
            x + 10,
            footerY,
            { align: "center", width: width - 20 }
          );
      };

      // Draw both copies
      const copyWidth = (doc.page.width - 40) / 2 - 10;
      const copyHeight = doc.page.height - 40;

      // Parent's copy (left side)
      drawFeeSlipCopy(20, 20, copyWidth, copyHeight, true);

      // School's copy (right side)
      drawFeeSlipCopy(
        doc.page.width / 2 + 10,
        20,
        copyWidth,
        copyHeight,
        false
      );

      // Finalize PDF
      doc.end();
    });
  } catch (error) {
    console.error("Error generating fee slip PDF:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Generate fee slip with THE EDUCATORS design - 2 students per A4 page
exports.generateEducatorsFeeSlip = async (req, res) => {
  const { id } = req.params;

  try {
    // Get fee slip data
    const query = `
      SELECT 
        fs.*,
        s.father_name,
        s.cnic,
        s.phone,
        s.monthly_fee,
        s.admission_fee_amount,
        s.admission_number,
        c.name as class_name
      FROM fee_slips fs
      LEFT JOIN students s ON fs.student_id = s.id
      LEFT JOIN classes c ON s.class_id = c.id
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

      // Calculate correct total amount
      const tuitionFee = parseFloat(feeSlip.monthly_fee) || 0;
      const transportFee = 0; // Currently not implemented
      const annualFund = 0; // Currently not implemented
      const arrears = parseFloat(feeSlip.arrears_amount) || 0;
      const totalAmount = tuitionFee + transportFee + annualFund + arrears;

      // Create PDF document in landscape mode
      const PDFDocument = require("pdfkit");
      const doc = new PDFDocument({
        size: "A4",
        layout: "landscape",
        margins: {
          top: 20,
          bottom: 20,
          left: 20,
          right: 20,
        },
      });

      // Set response headers for browser display
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `inline; filename="educators-fee-slip-${feeSlip.slip_id}.pdf"`
      );

      // Pipe PDF to response
      doc.pipe(res);

      // Function to draw THE EDUCATORS fee slip design - SINGLE SLIP
      const drawEducatorsFeeSlip = (x, y, width, height, isParentCopy) => {
        // Draw border around the slip
        doc.rect(x, y, width, height).stroke("#000000");

        // Header Section
        const headerY = y + 10;
        const centerX = x + width / 2;
        const logoWidth = 100; // Width reserved for logos on each side
        const textAreaWidth = width - logoWidth * 2; // Available width for text
        const textStartX = x + logoWidth; // Starting position for centered text

        // Left Logo (THE EDUCATORS Logo)
        drawEducatorsLogo(doc, x, headerY, width);

        // Right Logo (Beaconhouse Logo)
        drawBeaconhouseLogo(doc, x, headerY, width);

        // School Name (centered)
        doc
          .fontSize(18)
          .font("Helvetica-Bold")
          .fill("#000")
          .text("THE EDUCATORS", textStartX + textAreaWidth / 2, headerY + 15, {
            align: "center",
          });

        // Campus Information
        doc
          .fontSize(12)
          .font("Helvetica")
          .fill("#000")
          .text(
            "Kohat road Campus",
            textStartX + textAreaWidth / 2,
            headerY + 35,
            {
              align: "center",
            }
          );

        // Phone Number
        doc
          .fontSize(10)
          .font("Helvetica")
          .fill("#000")
          .text(
            "Phone : 091-2321029",
            textStartX + textAreaWidth / 2,
            headerY + 50,
            {
              align: "center",
            }
          );

        // Slip Title
        doc
          .fontSize(14)
          .font("Helvetica-Bold")
          .fill("#000")
          .text(
            "Monthly Fee Slip",
            textStartX + textAreaWidth / 2,
            headerY + 70,
            { align: "center" }
          );

        // Copy Type (Parent's copy or School's copy)
        doc
          .fontSize(12)
          .font("Helvetica-Bold")
          .fill("#000")
          .text(
            isParentCopy ? "Parent's copy" : "School's copy",
            textStartX + textAreaWidth / 2,
            headerY + 90,
            { align: "center" }
          );

        // Student Information Table
        const tableY = headerY + 120;
        const tableWidth = width - 20;
        const rowHeight = 25;

        // Student ID and Class row
        doc.rect(x + 10, tableY, tableWidth, rowHeight).stroke("#000000");
        doc
          .fontSize(10)
          .font("Helvetica")
          .fill("#000")
          .text("Student ID", x + 15, tableY + 8)
          .text(
            `${
              feeSlip.admission_number ||
              `EDU-2025-${feeSlip.student_id.toString().padStart(4, "0")}`
            } Class ${feeSlip.class_name || "N/A"}`,
            x + 100,
            tableY + 8
          );

        // Name row
        doc
          .rect(x + 10, tableY + rowHeight, tableWidth, rowHeight)
          .stroke("#000000");
        doc
          .fontSize(10)
          .font("Helvetica")
          .fill("#000")
          .text("Name", x + 15, tableY + rowHeight + 8)
          .text(
            feeSlip.student_name || "Unknown",
            x + 100,
            tableY + rowHeight + 8
          );

        // Father's Name row
        doc
          .rect(x + 10, tableY + rowHeight * 2, tableWidth, rowHeight)
          .stroke("#000000");
        doc
          .fontSize(10)
          .font("Helvetica")
          .fill("#000")
          .text("Father's Name", x + 15, tableY + rowHeight * 2 + 8)
          .text(
            feeSlip.father_name || "Unknown",
            x + 100,
            tableY + rowHeight * 2 + 8
          );

        // Fee Month and Due Date row
        doc
          .rect(x + 10, tableY + rowHeight * 3, tableWidth, rowHeight)
          .stroke("#000000");
        doc
          .fontSize(10)
          .font("Helvetica")
          .fill("#000")
          .text("Fee Month", x + 15, tableY + rowHeight * 3 + 8)
          .text(
            `${new Date(feeSlip.year, feeSlip.month - 1)
              .toLocaleString("default", { month: "short" })
              .toUpperCase()} Due Date ${new Date(
              feeSlip.due_date
            ).toLocaleDateString("en-GB")}`,
            x + 100,
            tableY + rowHeight * 3 + 8
          );

        // Fee Breakdown Table
        const feeTableY = tableY + rowHeight * 4 + 20;
        const feeRowHeight = 20;

        // Table header
        doc.rect(x + 10, feeTableY, tableWidth, feeRowHeight).stroke("#000000");
        doc
          .fontSize(10)
          .font("Helvetica-Bold")
          .fill("#000")
          .text("Particulars", x + 15, feeTableY + 6)
          .text("Amount", x + width - 80, feeTableY + 6);

        // Tuition Fee
        doc
          .rect(x + 10, feeTableY + feeRowHeight, tableWidth, feeRowHeight)
          .stroke("#000000");
        doc
          .fontSize(10)
          .font("Helvetica")
          .fill("#000")
          .text("Tuition Fee", x + 15, feeTableY + feeRowHeight + 6)
          .text(
            tuitionFee.toFixed(2),
            x + width - 80,
            feeTableY + feeRowHeight + 6
          );

        // Transport Fee
        doc
          .rect(x + 10, feeTableY + feeRowHeight * 2, tableWidth, feeRowHeight)
          .stroke("#000000");
        doc
          .fontSize(10)
          .font("Helvetica")
          .fill("#000")
          .text("Transport Fee", x + 15, feeTableY + feeRowHeight * 2 + 6)
          .text(
            transportFee.toFixed(2),
            x + width - 80,
            feeTableY + feeRowHeight * 2 + 6
          );

        // Annual Fund
        doc
          .rect(x + 10, feeTableY + feeRowHeight * 3, tableWidth, feeRowHeight)
          .stroke("#000000");
        doc
          .fontSize(10)
          .font("Helvetica")
          .fill("#000")
          .text("Annual Fund", x + 15, feeTableY + feeRowHeight * 3 + 6)
          .text(
            annualFund.toFixed(2),
            x + width - 80,
            feeTableY + feeRowHeight * 3 + 6
          );

        // Arrears
        doc
          .rect(x + 10, feeTableY + feeRowHeight * 4, tableWidth, feeRowHeight)
          .stroke("#000000");
        doc
          .fontSize(10)
          .font("Helvetica")
          .fill("#000")
          .text("Arrears", x + 15, feeTableY + feeRowHeight * 4 + 6)
          .text(
            arrears.toFixed(2),
            x + width - 80,
            feeTableY + feeRowHeight * 4 + 6
          );

        // Grand Total (with thicker border)
        doc
          .rect(x + 10, feeTableY + feeRowHeight * 5, tableWidth, feeRowHeight)
          .stroke("#000000");
        doc
          .lineWidth(2)
          .moveTo(x + 10, feeTableY + feeRowHeight * 5)
          .lineTo(x + width - 10, feeTableY + feeRowHeight * 5)
          .stroke("#000000")
          .lineWidth(1);
        doc
          .fontSize(10)
          .font("Helvetica-Bold")
          .fill("#000")
          .text("Grand Total", x + 15, feeTableY + feeRowHeight * 5 + 6)
          .text(
            totalAmount.toFixed(2),
            x + width - 80,
            feeTableY + feeRowHeight * 5 + 6
          );

        // Footer Section
        const footerY = feeTableY + feeRowHeight * 6 + 20;

        // Note section
        doc
          .fontSize(9)
          .font("Helvetica")
          .fill("#000")
          .text("Note:", x + 15, footerY)
          .text(
            "All dues must be paid on or before the due date.",
            x + 15,
            footerY + 15
          );

        // Only show the second note for parent's copy
        if (isParentCopy) {
          doc.text(
            "This slip must be kept as an evidence of Payment.",
            x + 15,
            footerY + 30
          );
        }

        // Signature line
        doc
          .fontSize(10)
          .font("Helvetica")
          .fill("#000")
          .text("Signature", x + 15, footerY + 50);
        doc
          .lineWidth(1)
          .moveTo(x + 15, footerY + 65)
          .lineTo(x + 100, footerY + 65)
          .stroke("#000000");
      };

      // Calculate page dimensions for two-side layout
      const pageWidth = doc.page.width - 40; // Account for margins
      const pageHeight = doc.page.height - 40;
      const slipWidth = (pageWidth - 20) / 2; // Divide page width into 2 equal parts
      const slipHeight = pageHeight; // Full height for each slip

      // Draw both copies side by side
      // Left side - Parent's copy
      drawEducatorsFeeSlip(20, 20, slipWidth, slipHeight, feeSlip, true);

      // Right side - School's copy
      drawEducatorsFeeSlip(
        20 + slipWidth + 20, // 20px margin between slips
        20,
        slipWidth,
        slipHeight,
        feeSlip,
        false
      );

      // Add page break for second student (if needed for bulk printing)
      // For now, we'll just show one student per page
      // In bulk printing, we can add multiple students

      // Finalize PDF
      doc.end();
    });
  } catch (error) {
    console.error("Error generating educators fee slip:", error);
    res.status(500).json({ error: "Failed to generate fee slip" });
  }
};

// Generate bulk fee slips with THE EDUCATORS design - 2 students per A4 page
exports.generateBulkEducatorsFeeSlips = async (req, res) => {
  const { student_ids } = req.body; // Array of student IDs

  console.log(
    "🔧 Generating bulk educators fee slips for students:",
    student_ids
  );

  try {
    if (
      !student_ids ||
      !Array.isArray(student_ids) ||
      student_ids.length === 0
    ) {
      return res.status(400).json({ error: "Student IDs array is required" });
    }

    // Get fee slip data for all students
    const query = `
      SELECT 
        fs.*,
        s.father_name,
        s.cnic,
        s.phone,
        s.monthly_fee,
        s.admission_fee_amount,
        c.name as class_name
      FROM fee_slips fs
      LEFT JOIN students s ON fs.student_id = s.id
      LEFT JOIN classes c ON s.class_id = c.id
      WHERE fs.student_id IN (${student_ids.map(() => "?").join(",")})
      ORDER BY fs.student_id
    `;

    console.log("🔍 Executing database query for fee slips...");

    db.query(query, student_ids, async (err, results) => {
      if (err) {
        console.error("Error fetching fee slips:", err);
        return res.status(500).json({ error: "Database error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "No fee slips found" });
      }

      try {
        // Create PDF document in landscape mode
        const PDFDocument = require("pdfkit");
        const doc = new PDFDocument({
          size: "A4",
          layout: "landscape",
          margins: {
            top: 20,
            bottom: 20,
            left: 20,
            right: 20,
          },
        });

        // Set response headers for browser display
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
          "Content-Disposition",
          `inline; filename="bulk-educators-fee-slips-${
            new Date().toISOString().split("T")[0]
          }.pdf"`
        );

        // Set timeout to prevent hanging requests
        res.setTimeout(30000, () => {
          console.error("PDF generation timeout");
          if (!res.headersSent) {
            res.status(500).json({ error: "PDF generation timeout" });
          }
        });

        // Handle PDF stream errors
        doc.on("error", (err) => {
          console.error("PDF stream error:", err);
          if (!res.headersSent) {
            res.status(500).json({ error: "PDF generation failed" });
          }
        });

        // Pipe PDF to response
        doc.pipe(res);

        // Function to draw THE EDUCATORS fee slip design - MATCHING IMAGE
        const drawEducatorsFeeSlip = (
          x,
          y,
          width,
          height,
          feeSlip,
          isParentCopy
        ) => {
          // Calculate correct total amount for this fee slip
          const tuitionFee = parseFloat(feeSlip.monthly_fee) || 0;
          const transportFee = parseFloat(feeSlip.transport_fee) || 0;
          const admissionFee = parseFloat(feeSlip.admission_fee) || 0;
          const annualFund = 0; // Currently not implemented
          const arrears = parseFloat(feeSlip.arrears_amount) || 0;

          // Background
          doc.rect(x, y, width, height).fill("#ffffff");

          // Header section - Matching the image design
          const headerHeight = 100;

          // Left logo (The Educators) - Matching admission slip exactly
          try {
            doc.image(
              path.join(__dirname, "../assets/the-educators-logo.png"),
              x + 20,
              y + 15,
              { width: 60, height: 50 }
            );
          } catch (error) {
            // If logo not found, draw a placeholder
            doc.rect(x + 20, y + 15, 60, 50).fill("#f0f0f0");
            doc
              .fontSize(12)
              .fill("#666")
              .text("LOGO", x + 25, y + 35);
          }

          // Right logo (Beaconhouse) - Matching admission slip exactly
          try {
            doc.image(
              path.join(
                __dirname,
                "../assets/beaconhouse-school-system-logo.png"
              ),
              x + width - 80,
              y + 15,
              { width: 60, height: 50 }
            );
          } catch (error) {
            // If logo not found, draw a placeholder
            doc.rect(x + width - 80, y + 15, 60, 50).fill("#f0f0f0");
            doc
              .fontSize(12)
              .fill("#666")
              .text("LOGO", x + width - 75, y + 35);
          }

          // School name and details - Matching admission slip exactly
          doc
            .fontSize(16)
            .font("Helvetica-Bold")
            .fill("#000")
            .text("THE EDUCATORS", x + width / 2 - 80, y + 20);
          doc
            .fontSize(10)
            .font("Helvetica")
            .fill("#000")
            .text(
              "A project of Beaconhouse School System",
              x + width / 2 - 100,
              y + 40
            );
          doc
            .fontSize(10)
            .font("Helvetica")
            .fill("#000")
            .text("Kohat Road Campus", x + width / 2 - 60, y + 55);
          doc
            .fontSize(10)
            .font("Helvetica")
            .fill("#000")
            .text("Session 2025-2026", x + width / 2 - 50, y + 70);

          // Title - Matching admission slip exactly
          doc
            .fontSize(14)
            .font("Helvetica-Bold")
            .fill("#000")
            .text("MONTHLY FEE SLIP", x + width / 2 - 60, y + 90);

          // Student information section - Matching the image structure
          const tableY = y + 140;
          const rowHeight = 25;
          const labelX = x + 20;
          const valueX = x + 120;

          // Student ID
          doc
            .fontSize(11)
            .font("Helvetica-Bold")
            .fill("#000")
            .text("Student ID:", labelX, tableY);
          doc
            .fontSize(11)
            .font("Helvetica")
            .fill("#000")
            .text(
              `${
                feeSlip.admission_number ||
                `E-${feeSlip.student_id.toString().padStart(3, "0")}`
              }`,
              valueX,
              tableY
            );

          // Name
          doc
            .fontSize(11)
            .font("Helvetica-Bold")
            .fill("#000")
            .text("Name:", labelX, tableY + rowHeight);
          doc
            .fontSize(11)
            .font("Helvetica")
            .fill("#000")
            .text(
              feeSlip.student_name || "Unknown",
              valueX,
              tableY + rowHeight
            );

          // Father's Name
          doc
            .fontSize(11)
            .font("Helvetica-Bold")
            .fill("#000")
            .text("Father's Name:", labelX, tableY + rowHeight * 2);
          doc
            .fontSize(11)
            .font("Helvetica")
            .fill("#000")
            .text(
              feeSlip.father_name || "Unknown",
              valueX,
              tableY + rowHeight * 2
            );

          // Fee Month and Due Date (on same row)
          const currentMonth = new Date()
            .toLocaleString("default", { month: "short" })
            .toUpperCase();
          const dueDate = new Date(
            feeSlip.due_date || new Date()
          ).toLocaleDateString("en-GB");

          doc
            .fontSize(11)
            .font("Helvetica-Bold")
            .fill("#000")
            .text("Fee Month:", labelX, tableY + rowHeight * 3);
          doc
            .fontSize(11)
            .font("Helvetica")
            .fill("#000")
            .text(currentMonth, valueX, tableY + rowHeight * 3);

          // Due Date (on same row as Fee Month)
          doc
            .fontSize(11)
            .font("Helvetica-Bold")
            .fill("#000")
            .text("Due Date:", valueX + 80, tableY + rowHeight * 3);
          doc
            .fontSize(11)
            .font("Helvetica")
            .fill("#000")
            .text(dueDate, valueX + 160, tableY + rowHeight * 3);

          // Fees section - Matching the image structure
          const feesY = tableY + rowHeight * 4 + 20;
          const feeRowHeight = 20;

          doc
            .fontSize(12)
            .font("Helvetica-Bold")
            .fill("#000")
            .text("PARTICULARS & AMOUNT", x + 20, feesY + 4);

          const feesTableY = feesY + 30;
          let currentRow = 0;

          // Admission Fee (only show if > 0)
          if (admissionFee > 0) {
            doc
              .fontSize(10)
              .font("Helvetica")
              .fill("#000")
              .text(
                "Admission Fee:",
                x + 20,
                feesTableY + feeRowHeight * currentRow
              );
            doc
              .fontSize(10)
              .font("Helvetica")
              .fill("#000")
              .text(
                `${admissionFee.toFixed(0)}`,
                x + width - 100,
                feesTableY + feeRowHeight * currentRow
              );
            currentRow++;
          }

          // Tuition Fee
          doc
            .fontSize(10)
            .font("Helvetica")
            .fill("#000")
            .text(
              "Tuition Fee:",
              x + 20,
              feesTableY + feeRowHeight * currentRow
            );
          doc
            .fontSize(10)
            .font("Helvetica")
            .fill("#000")
            .text(
              `${tuitionFee.toFixed(0)}`,
              x + width - 100,
              feesTableY + feeRowHeight * currentRow
            );
          currentRow++;

          // Transport Fee
          doc
            .fontSize(10)
            .font("Helvetica")
            .fill("#000")
            .text(
              "Transport Fee:",
              x + 20,
              feesTableY + feeRowHeight * currentRow
            );
          doc
            .fontSize(10)
            .font("Helvetica")
            .fill("#000")
            .text(
              `${transportFee.toFixed(0)}`,
              x + width - 100,
              feesTableY + feeRowHeight * currentRow
            );
          currentRow++;

          // Annual Fund
          doc
            .fontSize(10)
            .font("Helvetica")
            .fill("#000")
            .text(
              "Annual Fund:",
              x + 20,
              feesTableY + feeRowHeight * currentRow
            );
          doc
            .fontSize(10)
            .font("Helvetica")
            .fill("#000")
            .text("0", x + width - 100, feesTableY + feeRowHeight * currentRow);
          currentRow++;

          // Arrears
          doc
            .fontSize(10)
            .font("Helvetica")
            .fill("#000")
            .text("Arrears:", x + 20, feesTableY + feeRowHeight * currentRow);
          doc
            .fontSize(10)
            .font("Helvetica")
            .fill("#000")
            .text("0", x + width - 100, feesTableY + feeRowHeight * currentRow);
          currentRow++;

          // Calculate total (matching the image structure)
          const totalAmount = admissionFee + tuitionFee + transportFee;

          // Grand Total - Bold and prominent (matching the image)
          doc
            .fontSize(12)
            .font("Helvetica-Bold")
            .fill("#000")
            .text(
              "Grand Total:",
              x + 20,
              feesTableY + feeRowHeight * currentRow
            );
          doc
            .fontSize(12)
            .font("Helvetica-Bold")
            .fill("#000")
            .text(
              `${totalAmount.toFixed(0)}`,
              x + width - 100,
              feesTableY + feeRowHeight * currentRow
            );

          // Barcode section - Positioned between fees and signature
          const barcodeY = feesTableY + feeRowHeight * (currentRow + 1) + 30;
          const barcodeData =
            feeSlip.slip_id || `FS${feeSlip.student_id}${Date.now()}`;
          const barcodeImage = generateBarcodeImage(barcodeData);

          if (barcodeImage) {
            try {
              doc.image(barcodeImage, x + 20, barcodeY, {
                width: 150,
                height: 40,
              });
            } catch (error) {
              console.error("Error adding barcode image:", error);
            }
          }

          // Barcode instruction
          doc
            .fontSize(9)
            .font("Helvetica")
            .fill("#000")
            .text(
              "Scan this barcode for fee collection",
              x + 20,
              barcodeY + 55
            );

          // Signature and Stamp area - Positioned above the note text
          const signatureY = y + height - 55; // 20px above the note text
          const signatureBoxWidth = 120;
          const signatureBoxHeight = 40;

          // Draw signature box
          doc
            .rect(
              x + width - signatureBoxWidth - 20,
              signatureY,
              signatureBoxWidth,
              signatureBoxHeight
            )
            .stroke("#000000");

          // Add signature label
          doc
            .fontSize(9)
            .font("Helvetica")
            .fill("#000")
            .text(
              "Signature & Stamp",
              x + width - signatureBoxWidth - 20 + signatureBoxWidth / 2 - 35,
              signatureY - 10
            );

          // Note - Positioned above copy indicator
          doc
            .fontSize(10)
            .font("Helvetica")
            .fill("#000")
            .text(
              "All dues must be paid on or before the due date.",
              x + 20,
              y + height - 35
            );

          // Copy indicator - Clean and simple
          if (isParentCopy) {
            doc
              .fontSize(10)
              .font("Helvetica-Bold")
              .fill("#000")
              .text("PARENT COPY", x + 20, y + height - 15);
          } else {
            doc
              .fontSize(10)
              .font("Helvetica-Bold")
              .fill("#000")
              .text("SCHOOL COPY", x + 20, y + height - 15);
          }
        };

        // Calculate page dimensions for two-side layout
        const pageWidth = doc.page.width - 40; // Account for margins
        const pageHeight = doc.page.height - 40;
        const slipWidth = (pageWidth - 20) / 2; // Divide page width into 2 equal parts
        const slipHeight = pageHeight; // Full height for each slip

        // Process students one per page (left and right side)
        console.log(
          `📄 Processing ${results.length} students for two-side PDF generation...`
        );

        for (let i = 0; i < results.length; i++) {
          console.log(`📄 Processing student ${i + 1}/${results.length}`);

          // Add new page for each student (except first page)
          if (i > 0) {
            doc.addPage();
          }

          // Draw both copies side by side
          const student = results[i];

          // Left side - Parent's copy
          drawEducatorsFeeSlip(20, 20, slipWidth, slipHeight, student, true);

          // Right side - School's copy
          drawEducatorsFeeSlip(
            20 + slipWidth + 20, // 20px margin between slips
            20,
            slipWidth,
            slipHeight,
            student,
            false
          );
        }

        // Finalize PDF
        doc.end();
      } catch (error) {
        console.error("Error in PDF generation:", error);
        if (!res.headersSent) {
          res.status(500).json({ error: "Failed to generate PDF" });
        }
      }
    });
  } catch (error) {
    console.error("Error generating bulk educators fee slips:", error);
    // Check if response has already been sent
    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to generate bulk fee slips" });
    }
  }
};

// Helper function to draw THE EDUCATORS logo - MATCHING SAMPLE
const drawEducatorsLogo = (doc, x, y, width) => {
  try {
    const logoPath = path.join(
      __dirname,
      "../assets/the-educators-seeklogo.png"
    );
    console.log("🔍 Loading logo from:", logoPath);
    console.log("🔍 Logo file exists:", fs.existsSync(logoPath));

    if (fs.existsSync(logoPath)) {
      // Logo size matching sample image
      doc.image(logoPath, x + 20, y - 5, { width: 80, height: 30 });
      console.log("✅ Logo loaded successfully");
    } else {
      console.log("⚠️ Logo file not found, using text fallback");
      // Fallback to text if logo not found
      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .fill("#000")
        .text("THE EDUCATORS", x + 20, y);
    }
  } catch (error) {
    console.error("❌ Error loading logo:", error);
    // Fallback to text
    doc
      .fontSize(12)
      .font("Helvetica-Bold")
      .fill("#000")
      .text("THE EDUCATORS", x + 20, y);
  }
};

// Helper function to draw Beaconhouse logo - MATCHING SAMPLE
const drawBeaconhouseLogo = (doc, x, y, width) => {
  try {
    const logoPath = path.join(
      __dirname,
      "../assets/beaconhouse-school-system-logo-B8DD760BF0-seeklogo.com_-1-300x290.png"
    );
    console.log("🔍 Loading Beaconhouse logo from:", logoPath);
    console.log("🔍 Beaconhouse logo file exists:", fs.existsSync(logoPath));

    if (fs.existsSync(logoPath)) {
      // Logo size matching sample image
      doc.image(logoPath, x + width - 100, y - 5, { width: 80, height: 30 });
      console.log("✅ Beaconhouse logo loaded successfully");
    } else {
      console.log("⚠️ Beaconhouse logo file not found, using text fallback");
      // Fallback to text if logo not found
      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .fill("#000")
        .text("BEACONHOUSE", x + width - 80, y);
    }
  } catch (error) {
    console.error("❌ Error loading Beaconhouse logo:", error);
    // Fallback to text
    doc
      .fontSize(12)
      .font("Helvetica-Bold")
      .fill("#000")
      .text("BEACONHOUSE", x + width - 80, y);
  }
};

// Get detailed fee breakdown for fee submission form
exports.getDetailedFeeBreakdown = (req, res) => {
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
        s.monthly_fee,
        s.transport_fee,
        s.admission_fee_amount,
        s.is_admission_paid,
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
        this.getDetailedFeeBreakdownData(feeSlip.student_id, feeSlip, res);
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
          return res.status(404).json({ error: "Fee slip not found" });
        }

        const studentId = studentResults[0].student_id;

        // Get the latest fee slip for this student
        const latestSlipQuery = `
          SELECT 
            fs.*,
            s.name as student_name,
            s.admission_number,
            s.father_name,
            s.cnic,
            s.phone,
            s.profile_image,
            s.monthly_fee,
            s.transport_fee,
            s.admission_fee_amount,
            s.is_admission_paid,
            c.name as class_name
          FROM fee_slips fs
          LEFT JOIN students s ON fs.student_id = s.id
          LEFT JOIN classes c ON s.class_id = c.id
          WHERE fs.student_id = ?
          ORDER BY fs.month DESC, fs.year DESC
          LIMIT 1
        `;

        db.query(latestSlipQuery, [studentId], (err, latestResults) => {
          if (err) {
            console.error("Error fetching latest fee slip:", err);
            return res.status(500).json({ error: "Database error" });
          }

          if (latestResults.length === 0) {
            return res
              .status(404)
              .json({ error: "No fee slip found for student" });
          }

          const feeSlip = latestResults[0];
          this.getDetailedFeeBreakdownData(studentId, feeSlip, res);
        });
      });
    });
  } catch (error) {
    console.error("Error in getDetailedFeeBreakdown:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Helper function to get detailed fee breakdown data
exports.getDetailedFeeBreakdownData = (studentId, feeSlip, res) => {
  // Get comprehensive payment and arrears information for this student
  const comprehensiveQuery = `
    SELECT 
      s.monthly_fee,
      s.transport_fee,
      s.id as student_id,
      s.name as student_name,
      s.admission_number,
      s.father_name,
      s.cnic,
      s.phone,
      s.profile_image,
      s.is_admission_paid,
      s.admission_fee_amount,
      c.name as class_name,
      COALESCE(fs.arrears_amount, 0) as original_arrears,
      COALESCE(fs.fine_amount, 0) as original_fine,
      COALESCE(fs.total_amount, 0) as total_due,
      COALESCE(fs.monthly_fee, 0) as slip_monthly_fee,
      COALESCE(fs.transport_fee, 0) as slip_transport_fee,
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
        AND f.fee_type IN ('Monthly Fee', 'Admission Fee', 'Arrears', 'Fine', 'Transport Fee', 'Annual Fee')
        AND f.month = fs.month
        AND f.year = fs.year
      ) as paid_this_month,
      (
        SELECT COALESCE(SUM(f.amount), 0)
        FROM fees f
        WHERE f.student_id = s.id 
        AND f.fee_type = 'Monthly Fee'
        AND f.month = fs.month
        AND f.year = fs.year
      ) as monthly_fee_paid_this_month,
      (
        SELECT COALESCE(SUM(f.amount), 0)
        FROM fees f
        WHERE f.student_id = s.id 
        AND f.fee_type = 'Transport Fee'
        AND f.month = fs.month
        AND f.year = fs.year
      ) as transport_fee_paid_this_month,
      (
        SELECT COALESCE(SUM(f.amount), 0)
        FROM fees f
        WHERE f.student_id = s.id 
        AND f.fee_type = 'Admission Fee'
        AND f.month = fs.month
        AND f.year = fs.year
      ) as admission_fee_paid_this_month,
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
        AND f.fee_type = 'Annual Fee'
        AND f.month = fs.month
        AND f.year = fs.year
      ) as annual_fee_paid_this_month,
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
    AND fs.id = ?
  `;

  db.query(comprehensiveQuery, [studentId, feeSlip.id], (err, results) => {
    if (err) {
      console.error("Error fetching detailed fee breakdown:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Student data not found" });
    }

    const studentData = results[0];

    // Calculate current payment status
    const monthlyFee = parseFloat(studentData.monthly_fee) || 0;
    const transportFee = parseFloat(studentData.transport_fee) || 0;
    const slipMonthlyFee = parseFloat(studentData.slip_monthly_fee) || 0;
    const slipTransportFee = parseFloat(studentData.slip_transport_fee) || 0;
    const slipAdmissionFee = parseFloat(studentData.slip_admission_fee) || 0;
    const originalArrears = parseFloat(studentData.original_arrears) || 0;
    const originalFine = parseFloat(studentData.original_fine) || 0;
    const discountAmount = parseFloat(studentData.discount_amount) || 0;

    // Get payments made this month for each fee type
    const paidThisMonth = parseFloat(studentData.paid_this_month) || 0;
    const monthlyFeePaidThisMonth =
      parseFloat(studentData.monthly_fee_paid_this_month) || 0;
    const transportFeePaidThisMonth =
      parseFloat(studentData.transport_fee_paid_this_month) || 0;
    const admissionFeePaidThisMonth =
      parseFloat(studentData.admission_fee_paid_this_month) || 0;
    const arrearsPaidThisMonth =
      parseFloat(studentData.arrears_paid_this_month) || 0;
    const finePaidThisMonth = parseFloat(studentData.fine_paid_this_month) || 0;
    const annualFeePaidThisMonth =
      parseFloat(studentData.annual_fee_paid_this_month) || 0;

    // Calculate remaining amounts for each fee type
    const admissionFeeRemaining = Math.max(
      0,
      slipAdmissionFee - admissionFeePaidThisMonth
    );
    const monthlyFeeRemaining = Math.max(
      0,
      slipMonthlyFee - monthlyFeePaidThisMonth
    );
    const transportFeeRemaining = Math.max(
      0,
      slipTransportFee - transportFeePaidThisMonth
    );
    const arrearsRemaining = Math.max(
      0,
      originalArrears - arrearsPaidThisMonth
    );
    const fineRemaining = Math.max(0, originalFine - finePaidThisMonth);
    const annualFeeRemaining = 0; // Annual fee is not in current slip

    // Calculate total remaining balance
    const totalRemaining =
      admissionFeeRemaining +
      monthlyFeeRemaining +
      transportFeeRemaining +
      arrearsRemaining +
      fineRemaining +
      annualFeeRemaining;

    // Check if current date is past the due date (25th of the month)
    const currentDate = new Date();
    const dueDate = new Date(feeSlip.due_date);
    const isPastDueDate = currentDate > dueDate;

    // Return detailed fee breakdown
    res.json({
      message: "Detailed fee breakdown retrieved successfully",
      student_info: {
        id: studentData.student_id,
        name: studentData.student_name,
        admission_number: studentData.admission_number,
        father_name: studentData.father_name,
        class_name: studentData.class_name,
        photo: studentData.profile_image,
      },
      fee_breakdown: {
        admission_fee: {
          expected: slipAdmissionFee,
          paid: admissionFeePaidThisMonth,
          remaining: admissionFeeRemaining,
          is_paid: admissionFeeRemaining === 0 && slipAdmissionFee > 0,
          is_pending: admissionFeeRemaining > 0 && slipAdmissionFee > 0,
        },
        monthly_fee: {
          expected: slipMonthlyFee,
          paid: monthlyFeePaidThisMonth,
          remaining: monthlyFeeRemaining,
          is_paid: monthlyFeeRemaining === 0 && slipMonthlyFee > 0,
          is_pending: monthlyFeeRemaining > 0 && slipMonthlyFee > 0,
        },
        transport_fee: {
          expected: slipTransportFee,
          paid: transportFeePaidThisMonth,
          remaining: transportFeeRemaining,
          is_paid: transportFeeRemaining === 0 && slipTransportFee > 0,
          is_pending: transportFeeRemaining > 0 && slipTransportFee > 0,
        },
        arrears: {
          expected: originalArrears,
          paid: arrearsPaidThisMonth,
          remaining: arrearsRemaining,
          is_paid: arrearsRemaining === 0 && originalArrears > 0,
          is_pending: arrearsRemaining > 0 && originalArrears > 0,
        },
        fine: {
          expected: originalFine,
          paid: finePaidThisMonth,
          remaining: fineRemaining,
          is_paid: fineRemaining === 0 && originalFine > 0,
          is_pending: fineRemaining > 0 && originalFine > 0,
        },
        annual_fee: {
          expected: 0, // Not in current slip
          paid: annualFeePaidThisMonth,
          remaining: annualFeeRemaining,
          is_paid: annualFeeRemaining === 0,
          is_pending: annualFeeRemaining > 0,
        },
      },
      payment_summary: {
        total_expected:
          slipAdmissionFee +
          slipMonthlyFee +
          slipTransportFee +
          originalArrears +
          originalFine,
        total_paid: paidThisMonth,
        total_remaining: totalRemaining,
        is_fully_paid: totalRemaining === 0,
        has_pending_transport_fee:
          transportFeeRemaining > 0 && slipTransportFee > 0,
        is_past_due_date: isPastDueDate,
        slip_month: feeSlip.month,
        slip_year: feeSlip.year,
        due_date: feeSlip.due_date,
      },
    });
  });
};
