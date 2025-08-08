const db = require("../config/db");

// Get all fees
exports.getAllFees = (req, res) => {
  const query = `
    SELECT 
      f.*,
      s.name as student_name,
      s.cnic as student_cnic,
      c.name as class_name
    FROM fees f
    LEFT JOIN students s ON f.student_id = s.id
    LEFT JOIN classes c ON s.class_id = c.id
    ORDER BY f.payment_date DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching fees:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};

// Get fee by ID
exports.getFeeById = (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT 
      f.*,
      s.name as student_name,
      s.cnic as student_cnic,
      c.name as class_name
    FROM fees f
    LEFT JOIN students s ON f.student_id = s.id
    LEFT JOIN classes c ON s.class_id = c.id
    WHERE f.id = ?
  `;

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching fee:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Fee not found" });
    }
    res.json(results[0]);
  });
};

// Add new fee
exports.addFee = (req, res) => {
  try {
    console.log("📥 Received fee data:", req.body);
    console.log("📥 Request headers:", req.headers);

    const {
      student_id,
      fee_type,
      amount,
      payment_date,
      payment_method,
      month,
      year,
      remarks,
      transport_fee,
    } = req.body;

    // Extract student_id if it's an object
    const actualStudentId =
      typeof student_id === "object" ? student_id.id : student_id;

    // Validate required fields
    if (
      !actualStudentId ||
      !fee_type ||
      !amount ||
      !payment_date ||
      !payment_method ||
      !month ||
      !year
    ) {
      console.log("❌ Missing required fields:", {
        student_id: actualStudentId,
        fee_type,
        amount,
        payment_date,
        payment_method,
        month,
        year,
      });
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if this is an admission fee payment
    const isAdmissionFee = fee_type === "Admission Fee";

    // Get the current fee slip to calculate arrears
    const getFeeSlipQuery = `
      SELECT 
        monthly_fee, admission_fee, transport_fee, arrears_amount, fine_amount, total_amount,
        month, year
      FROM fee_slips 
      WHERE student_id = ? 
      ORDER BY id DESC 
      LIMIT 1
    `;

    db.query(getFeeSlipQuery, [actualStudentId], (slipErr, slipResult) => {
      if (slipErr) {
        console.error("❌ Error fetching fee slip:", slipErr);
        return res.status(500).json({ error: "Database error" });
      }

      let arrearsToAdd = 0;
      let expectedAmount = 0;

      if (slipResult.length > 0) {
        const currentSlip = slipResult[0];

        // Calculate expected amount based on fee type
        switch (fee_type) {
          case "Admission Fee":
            expectedAmount = parseFloat(currentSlip.admission_fee) || 0;
            break;
          case "Monthly Fee":
            expectedAmount = parseFloat(currentSlip.monthly_fee) || 0;
            break;
          case "Transport Fee":
            expectedAmount = parseFloat(currentSlip.transport_fee) || 0;
            break;
          case "Fine":
            expectedAmount = parseFloat(currentSlip.fine_amount) || 0;
            break;
          case "Annual Fee":
            // Annual fee is typically a fixed amount, get from student data
            const getAnnualFeeQuery = `SELECT annual_fee_amount FROM students WHERE id = ?`;
            db.query(
              getAnnualFeeQuery,
              [actualStudentId],
              (annualErr, annualResult) => {
                if (!annualErr && annualResult.length > 0) {
                  expectedAmount =
                    parseFloat(annualResult[0].annual_fee_amount) || 0;
                }
              }
            );
            break;
          case "Arrears":
            // For arrears payment, don't add to arrears
            expectedAmount = 0;
            break;
          default:
            expectedAmount = 0;
        }

        // Arrears should only be calculated from previous month records, not current month partial payments
        // Therefore, we don't add to arrears from current month payments
        arrearsToAdd = 0;
        console.log(
          `📊 Arrears only calculated from previous month records, not current month payments: ${fee_type}`
        );
      }

      // Insert the fee payment
      const insertQuery = `
      INSERT INTO fees (
        student_id, fee_type, amount, payment_date, payment_method, 
        month, year, remarks, admission_fee_paid, transport_fee_paid
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

      const values = [
        actualStudentId,
        fee_type,
        amount,
        payment_date,
        payment_method,
        month,
        year,
        remarks || "",
        isAdmissionFee ? amount : 0,
        transport_fee || 0,
      ];

      console.log("📊 Executing query:", insertQuery);
      console.log("📊 Query values:", values);

      db.query(insertQuery, values, (err, result) => {
        if (err) {
          console.error("❌ Error adding fee:", err);
          return res
            .status(500)
            .json({ error: "Database error", details: err.message });
        }

        // Arrears are only calculated from previous month records, not updated from current month payments
        // No need to update arrears from current month partial payments

        // Get student information for revenue entry
        const getStudentQuery = `
        SELECT s.name as student_name, s.cnic, c.name as class_name
        FROM students s
        LEFT JOIN classes c ON s.class_id = c.id
        WHERE s.id = ?
      `;

        db.query(
          getStudentQuery,
          [actualStudentId],
          (studentErr, studentResult) => {
            if (studentErr) {
              console.error(
                "Error fetching student info for revenue:",
                studentErr
              );
            } else if (studentResult.length > 0) {
              const student = studentResult[0];

              // Add revenue entry for the fee payment
              const revenueQuery = `
            INSERT INTO revenue (source, amount, date, description, category)
            VALUES (?, ?, ?, ?, ?)
          `;

              const revenueDescription = `Fee payment from ${student.student_name} (${student.cnic}) - ${fee_type}`;
              const revenueValues = [
                `Student Fee - ${student.class_name || "Unknown Class"}`,
                amount,
                payment_date,
                revenueDescription,
                "Fees",
              ];

              db.query(
                revenueQuery,
                revenueValues,
                (revenueErr, revenueResult) => {
                  if (revenueErr) {
                    console.error("Error adding revenue entry:", revenueErr);
                  } else {
                    console.log("✅ Revenue entry added for fee payment:", {
                      fee_id: result.insertId,
                      revenue_id: revenueResult.insertId,
                      amount: amount,
                      student: student.student_name,
                    });
                  }
                }
              );
            }
          }
        );

        // Update student's admission fee status if this is an admission fee payment
        if (isAdmissionFee) {
          const updateStudentQuery = `
          UPDATE students 
          SET is_admission_paid = TRUE 
          WHERE id = ?
        `;

          db.query(updateStudentQuery, [actualStudentId], (updateErr) => {
            if (updateErr) {
              console.error(
                "Error updating student admission fee status:",
                updateErr
              );
            } else {
              console.log(
                "✅ Updated student admission fee status for student ID:",
                actualStudentId
              );
            }
          });
        }

        // Update fee slip paid_amount when any payment is made
        this.updateFeeSlipPaidAmount(
          actualStudentId,
          month,
          year,
          amount,
          fee_type
        );

        // Update fee slip status if this is a monthly fee payment
        if (fee_type === "Monthly Fee") {
          this.updateFeeSlipStatusAfterPayment(
            actualStudentId,
            month,
            year,
            amount,
            result,
            res
          );
        } else {
          // Generate receipt after successful payment
          const receiptData = {
            student_id: actualStudentId,
            payment_id: result.insertId,
            month: month,
            year: year,
          };

          // Call receipt generation
          this.generateReceipt(
            { body: receiptData },
            {
              json: (receiptResponse) => {
                console.log(
                  "✅ Receipt generated after payment:",
                  receiptResponse
                );
              },
            }
          );

          res.status(201).json({
            message: "Fee added successfully",
            fee_id: result.insertId,
            amount: amount,
            student_id: actualStudentId,
            fee_type: fee_type,
            is_admission_fee: isAdmissionFee,
            receipt_generated: true,
            payment_id: result.insertId,
          });
        }
      });
    });
  } catch (error) {
    console.error("❌ Unexpected error in addFee:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
      stack: error.stack,
    });
  }
};

// Helper function to update fee slip paid_amount when payment is made
exports.updateFeeSlipPaidAmount = (studentId, month, year, amount, feeType) => {
  // Get the current fee slip for this student and month
  const getFeeSlipQuery = `
    SELECT id, paid_amount, total_amount
    FROM fee_slips 
    WHERE student_id = ? AND month = ? AND year = ?
    ORDER BY id DESC LIMIT 1
  `;

  db.query(getFeeSlipQuery, [studentId, month, year], (err, feeSlipResults) => {
    if (err) {
      console.error("Error fetching fee slip for paid_amount update:", err);
      return;
    }

    if (feeSlipResults.length === 0) {
      console.log("No fee slip found for updating paid_amount");
      return;
    }

    const feeSlip = feeSlipResults[0];
    const currentPaidAmount = parseFloat(feeSlip.paid_amount) || 0;
    const newPaidAmount = currentPaidAmount + parseFloat(amount);

    // Update the fee slip paid_amount
    const updateFeeSlipQuery = `
      UPDATE fee_slips 
      SET paid_amount = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    db.query(
      updateFeeSlipQuery,
      [newPaidAmount, feeSlip.id],
      (updateErr, updateResult) => {
        if (updateErr) {
          console.error("Error updating fee slip paid_amount:", updateErr);
        } else {
          console.log("✅ Fee slip paid_amount updated:", {
            fee_slip_id: feeSlip.id,
            old_paid_amount: currentPaidAmount,
            new_paid_amount: newPaidAmount,
            payment_amount: amount,
            fee_type: feeType,
          });
        }
      }
    );
  });
};

// Helper function to update fee slip status after payment
exports.updateFeeSlipStatusAfterPayment = (
  studentId,
  month,
  year,
  amountPaid,
  result,
  res
) => {
  // Get the current fee slip for this student and month
  const getFeeSlipQuery = `
    SELECT 
      fs.*,
      COALESCE(SUM(f.amount), 0) as total_paid_this_month
    FROM fee_slips fs
    LEFT JOIN fees f ON fs.student_id = f.student_id 
      AND fs.month = f.month 
      AND fs.year = f.year
      AND f.fee_type = 'Monthly Fee'
    WHERE fs.student_id = ? AND fs.month = ? AND fs.year = ?
    GROUP BY fs.id
  `;

  db.query(getFeeSlipQuery, [studentId, month, year], (err, feeSlipResults) => {
    if (err) {
      console.error("Error fetching fee slip for status update:", err);
      return res.status(201).json({
        message: "Fee added successfully (fee slip status update failed)",
        fee_id: result.insertId,
        amount: amountPaid,
        student_id: studentId,
        fee_type: "Monthly Fee",
      });
    }

    if (feeSlipResults.length === 0) {
      console.log(
        "No fee slip found for student",
        studentId,
        "month",
        month,
        "year",
        year
      );
      return res.status(201).json({
        message: "Fee added successfully (no fee slip found)",
        fee_id: result.insertId,
        amount: amountPaid,
        student_id: studentId,
        fee_type: "Monthly Fee",
      });
    }

    const feeSlip = feeSlipResults[0];
    const totalPaidThisMonth = parseFloat(feeSlip.total_paid_this_month) || 0;
    const totalFeeAmount = parseFloat(feeSlip.total_amount) || 0;
    const remainingBalance = totalFeeAmount - totalPaidThisMonth;

    // Determine the new status
    let newStatus = "Pending";
    if (remainingBalance <= 0) {
      newStatus = "Paid";
    } else if (remainingBalance > 0) {
      newStatus = "Pending"; // Still has remaining balance
    }

    // Update the fee slip status
    const updateFeeSlipQuery = `
      UPDATE fee_slips 
      SET status = ?, payment_date = CURRENT_DATE
      WHERE id = ?
    `;

    db.query(
      updateFeeSlipQuery,
      [newStatus, feeSlip.id],
      (updateErr, updateResult) => {
        if (updateErr) {
          console.error("Error updating fee slip status:", updateErr);
        } else {
          console.log("✅ Fee slip status updated:", {
            fee_slip_id: feeSlip.id,
            old_status: feeSlip.status,
            new_status: newStatus,
            total_paid: totalPaidThisMonth,
            remaining_balance: remainingBalance,
          });
        }

        // Return success response
        res.status(201).json({
          message: "Fee added successfully",
          fee_id: result.insertId,
          amount: amountPaid,
          student_id: studentId,
          fee_type: "Monthly Fee",
          fee_slip_updated: true,
          new_status: newStatus,
          remaining_balance: remainingBalance,
          payment_message:
            remainingBalance <= 0
              ? "No Dues"
              : `Remaining: ₨${remainingBalance}`,
        });
      }
    );
  });
};

// Update fee
exports.updateFee = (req, res) => {
  try {
    console.log("🚀 updateFee function called");

    const { id } = req.params;

    // Extract only the fields we need, with fallbacks
    const {
      fee_type,
      amount,
      payment_date,
      payment_method,
      month,
      year,
      remarks,
    } = req.body;

    console.log("🔧 Updating fee:", {
      id,
      fee_type,
      amount,
      payment_date,
      payment_method,
      month,
      year,
      remarks,
    });

    // Validate required fields
    if (!fee_type || !amount || !payment_date || !payment_method) {
      console.error("❌ Missing required fields:", {
        fee_type,
        amount,
        payment_date,
        payment_method,
      });
      return res.status(400).json({
        error: "Missing required fields",
        received: { fee_type, amount, payment_date, payment_method },
      });
    }

    // Ensure proper data types
    const feeAmount = parseFloat(amount) || 0;
    const feeMonth = parseInt(month) || new Date().getMonth() + 1;
    const feeYear = parseInt(year) || new Date().getFullYear();

    // Log the request body for debugging
    console.log("🔧 Request body:", JSON.stringify(req.body, null, 2));
    console.log("🔧 Request params:", req.params);
    console.log("🔧 Request headers:", req.headers);

    // Update the fee - only update the fields we're actually changing
    const updateQuery = `
      UPDATE fees SET
        fee_type = ?, amount = ?, payment_date = ?, payment_method = ?,
        month = ?, year = ?, remarks = ?
      WHERE id = ?
    `;

    const updateValues = [
      fee_type,
      feeAmount,
      payment_date,
      payment_method,
      feeMonth,
      feeYear,
      remarks || "",
      id,
    ];

    console.log("🔧 Executing query:", updateQuery);
    console.log("🔧 Query values:", updateValues);

    db.query(updateQuery, updateValues, (err, result) => {
      if (err) {
        console.error("❌ Database error updating fee:", err);
        return res
          .status(500)
          .json({ error: "Database error", details: err.message });
      }
      if (result.affectedRows === 0) {
        console.log("❌ No fee found with ID:", id);
        return res.status(404).json({ error: "Fee not found" });
      }

      console.log("✅ Fee updated successfully:", {
        fee_id: id,
        affected_rows: result.affectedRows,
      });

      res.json({ message: "Fee updated successfully" });
    });
  } catch (error) {
    console.error("❌ Unexpected error in updateFee:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

// Delete fee
exports.deleteFee = (req, res) => {
  const { id } = req.params;

  console.log("🔧 Deleting fee:", { id });

  // First, get the fee details to delete revenue entry
  const getFeeQuery = `
    SELECT f.*, s.name as student_name, s.admission_number
    FROM fees f
    LEFT JOIN students s ON f.student_id = s.id
    WHERE f.id = ?
  `;

  db.query(getFeeQuery, [id], (getErr, feeResult) => {
    if (getErr) {
      console.error("Error fetching fee details:", getErr);
      return res.status(500).json({ error: "Database error" });
    }

    if (feeResult.length === 0) {
      return res.status(404).json({ error: "Fee not found" });
    }

    const fee = feeResult[0];

    // Delete the fee
    db.query("DELETE FROM fees WHERE id = ?", [id], (err, result) => {
      if (err) {
        console.error("Error deleting fee:", err);
        return res.status(500).json({ error: "Database error" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Fee not found" });
      }

      // Delete the corresponding revenue entry
      const revenueQuery = `
        DELETE FROM revenue 
        WHERE description LIKE ? AND date = ?
      `;

      const revenueValues = [`%${fee.student_name}%`, fee.payment_date];

      db.query(revenueQuery, revenueValues, (revenueErr, revenueResult) => {
        if (revenueErr) {
          console.error("Error deleting revenue entry:", revenueErr);
        } else {
          console.log("✅ Revenue entry deleted for fee payment:", {
            fee_id: id,
            student: fee.student_name,
          });
        }
      });

      res.json({ message: "Fee deleted successfully" });
    });
  });
};

// Get fee statistics
exports.getFeeStatistics = (req, res) => {
  const { year } = req.query;
  const currentYear = year || new Date().getFullYear();

  const query = `
    SELECT 
      payment_method,
      COUNT(*) as payment_count,
      SUM(amount) as total_collected
    FROM fees 
    WHERE year = ?
    GROUP BY payment_method
    ORDER BY total_collected DESC
  `;

  db.query(query, [currentYear], (err, results) => {
    if (err) {
      console.error("Error fetching fee statistics:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};

// Get student fee history
exports.getStudentFeeHistory = (req, res) => {
  const { student_id } = req.params;

  const query = `
    SELECT 
      f.*,
      s.name as student_name,
      c.name as class_name
    FROM fees f
    LEFT JOIN students s ON f.student_id = s.id
    LEFT JOIN classes c ON s.class_id = c.id
    WHERE f.student_id = ?
    ORDER BY f.payment_date DESC
  `;

  db.query(query, [student_id], (err, results) => {
    if (err) {
      console.error("Error fetching student fee history:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};

// Get student's monthly payment total
exports.getStudentMonthlyPayment = (req, res) => {
  const { student_id, month, year } = req.params;

  const query = `
    SELECT 
      COALESCE(SUM(amount), 0) as total_paid,
      COUNT(*) as payment_count,
      MAX(payment_date) as last_payment_date
    FROM fees 
    WHERE student_id = ? AND month = ? AND year = ?
  `;

  db.query(query, [student_id, month, year], (err, results) => {
    if (err) {
      console.error("Error fetching student monthly payment:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const paymentData = results[0];
    res.json({
      total_paid: parseFloat(paymentData.total_paid),
      payment_count: paymentData.payment_count,
      last_payment_date: paymentData.last_payment_date,
    });
  });
};

// Get pending fees
exports.getPendingFees = (req, res) => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  console.log(
    `🔍 Checking pending fees for month: ${currentMonth}, year: ${currentYear}`
  );

  const query = `
    SELECT 
      s.id,
      s.name as student_name,
      s.cnic,
      s.monthly_fee,
      s.transport_fee,
      c.name as class_name,
      COALESCE(SUM(CASE WHEN f.month = ? AND f.year = ? AND f.fee_type = 'Monthly Fee' THEN f.amount ELSE 0 END), 0) as monthly_fee_paid,
      COALESCE(SUM(CASE WHEN f.month = ? AND f.year = ? AND f.fee_type = 'Transport Fee' THEN f.amount ELSE 0 END), 0) as transport_fee_paid,
      COALESCE(SUM(CASE WHEN f.fee_type = 'Admission Fee' THEN f.amount ELSE 0 END), 0) as admission_fee_paid,
      COALESCE(SUM(CASE WHEN f.fee_type = 'Arrears' THEN f.amount ELSE 0 END), 0) as arrears_paid,
      COALESCE(SUM(CASE WHEN f.fee_type = 'Fine' THEN f.amount ELSE 0 END), 0) as fine_paid,
      COALESCE(SUM(CASE WHEN f.fee_type = 'Annual Fee' THEN f.amount ELSE 0 END), 0) as annual_fee_paid,
      (s.monthly_fee + s.transport_fee) as total_expected_this_month,
      (s.monthly_fee - COALESCE(SUM(CASE WHEN f.month = ? AND f.year = ? AND f.fee_type = 'Monthly Fee' THEN f.amount ELSE 0 END), 0)) as monthly_fee_pending,
      (s.transport_fee - COALESCE(SUM(CASE WHEN f.month = ? AND f.year = ? AND f.fee_type = 'Transport Fee' THEN f.amount ELSE 0 END), 0)) as transport_fee_pending,
      (5000 - COALESCE(SUM(CASE WHEN f.fee_type = 'Admission Fee' THEN f.amount ELSE 0 END), 0)) as admission_fee_pending,
      COALESCE(SUM(CASE WHEN f.fee_type = 'Arrears' THEN f.amount ELSE 0 END), 0) as arrears_pending,
      COALESCE(SUM(CASE WHEN f.fee_type = 'Fine' THEN f.amount ELSE 0 END), 0) as fine_pending,
      COALESCE(SUM(CASE WHEN f.fee_type = 'Annual Fee' THEN f.amount ELSE 0 END), 0) as annual_fee_pending,
      MAX(f.payment_date) as last_payment,
      COUNT(CASE WHEN f.month = ? AND f.year = ? THEN 1 END) as payment_count_this_month
    FROM students s
    LEFT JOIN classes c ON s.class_id = c.id
    LEFT JOIN fees f ON s.id = f.student_id
    WHERE s.status = 'Active'
    GROUP BY s.id, s.name, s.cnic, s.monthly_fee, s.transport_fee, c.name
    HAVING (
      (s.monthly_fee - COALESCE(SUM(CASE WHEN f.month = ? AND f.year = ? AND f.fee_type = 'Monthly Fee' THEN f.amount ELSE 0 END), 0)) +
      (s.transport_fee - COALESCE(SUM(CASE WHEN f.month = ? AND f.year = ? AND f.fee_type = 'Transport Fee' THEN f.amount ELSE 0 END), 0)) +
      (5000 - COALESCE(SUM(CASE WHEN f.fee_type = 'Admission Fee' THEN f.amount ELSE 0 END), 0)) +
      COALESCE(SUM(CASE WHEN f.fee_type = 'Arrears' THEN f.amount ELSE 0 END), 0) +
      COALESCE(SUM(CASE WHEN f.fee_type = 'Fine' THEN f.amount ELSE 0 END), 0) +
      COALESCE(SUM(CASE WHEN f.fee_type = 'Annual Fee' THEN f.amount ELSE 0 END), 0)
    ) > 0
    ORDER BY (
      (s.monthly_fee - COALESCE(SUM(CASE WHEN f.month = ? AND f.year = ? AND f.fee_type = 'Monthly Fee' THEN f.amount ELSE 0 END), 0)) +
      (s.transport_fee - COALESCE(SUM(CASE WHEN f.month = ? AND f.year = ? AND f.fee_type = 'Transport Fee' THEN f.amount ELSE 0 END), 0)) +
      (5000 - COALESCE(SUM(CASE WHEN f.fee_type = 'Admission Fee' THEN f.amount ELSE 0 END), 0)) +
      COALESCE(SUM(CASE WHEN f.fee_type = 'Arrears' THEN f.amount ELSE 0 END), 0) +
      COALESCE(SUM(CASE WHEN f.fee_type = 'Fine' THEN f.amount ELSE 0 END), 0) +
      COALESCE(SUM(CASE WHEN f.fee_type = 'Annual Fee' THEN f.amount ELSE 0 END), 0)
    ) DESC
  `;

  db.query(
    query,
    [
      currentMonth,
      currentYear, // monthly_fee_paid
      currentMonth,
      currentYear, // transport_fee_paid
      currentMonth,
      currentYear, // monthly_fee_pending
      currentMonth,
      currentYear, // transport_fee_pending
      currentMonth,
      currentYear, // payment_count_this_month
      currentMonth,
      currentYear, // HAVING clause - monthly fee
      currentMonth,
      currentYear, // HAVING clause - transport fee
      currentMonth,
      currentYear, // ORDER BY - monthly fee
      currentMonth,
      currentYear, // ORDER BY - transport fee
    ],
    (err, results) => {
      if (err) {
        console.error("Error fetching pending fees:", err);
        return res.status(500).json({ error: "Database error" });
      }

      console.log(`📊 Found ${results.length} students with pending fees`);

      // Transform results to match expected format
      const transformedResults = results.map((student) => {
        const monthlyFeePending = Math.max(0, parseFloat(student.monthly_fee_pending) || 0);
        const transportFeePending = Math.max(0, parseFloat(student.transport_fee_pending) || 0);
        const admissionFeePending = Math.max(0, parseFloat(student.admission_fee_pending) || 0);
        const arrearsPending = parseFloat(student.arrears_pending) || 0;
        const finePending = parseFloat(student.fine_pending) || 0;
        const annualFeePending = parseFloat(student.annual_fee_pending) || 0;

        const totalPending =
          monthlyFeePending +
          transportFeePending +
          admissionFeePending +
          arrearsPending +
          finePending +
          annualFeePending;

        console.log(`🔍 Student ${student.student_name} pending fees:`, {
          monthlyFeePending,
          transportFeePending,
          admissionFeePending,
          arrearsPending,
          finePending,
          annualFeePending,
          totalPending
        });

        return {
          id: student.id,
          student_name: student.student_name,
          cnic: student.cnic,
          monthly_fee: student.monthly_fee,
          transport_fee: student.transport_fee,
          class_name: student.class_name,
          paid_amount:
            parseFloat(student.monthly_fee_paid) +
            parseFloat(student.transport_fee_paid) +
            parseFloat(student.admission_fee_paid) +
            parseFloat(student.arrears_paid) +
            parseFloat(student.fine_paid) +
            parseFloat(student.annual_fee_paid),
          arrears_amount: totalPending,
          monthly_fee_pending: monthlyFeePending,
          transport_fee_pending: transportFeePending,
          admission_fee_pending: admissionFeePending,
          arrears_pending: arrearsPending,
          fine_pending: finePending,
          annual_fee_pending: annualFeePending,
          last_payment: student.last_payment,
          payment_count_this_month: student.payment_count_this_month,
        };
      });

      console.log(
        `✅ Returning ${transformedResults.length} pending fee records`
      );
      res.json(transformedResults);
    }
  );
};

// Search fees
exports.searchFees = (req, res) => {
  const { query } = req.query;

  const searchQuery = `
    SELECT 
      f.*,
      s.name as student_name,
      s.cnic as student_cnic,
      s.admission_number,
      s.phone,
      c.name as class_name
    FROM fees f
    LEFT JOIN students s ON f.student_id = s.id
    LEFT JOIN classes c ON s.class_id = c.id
    WHERE s.name LIKE ? 
       OR s.cnic LIKE ? 
       OR s.admission_number LIKE ? 
       OR s.phone LIKE ? 
       OR f.fee_type LIKE ?
       OR c.name LIKE ?
    ORDER BY f.payment_date DESC
  `;

  const searchTerm = `%${query}%`;

  db.query(
    searchQuery,
    [searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm],
    (err, results) => {
      if (err) {
        console.error("Error searching fees:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json(results);
    }
  );
};

// Get fee history
exports.getFeeHistory = (req, res) => {
  const query = `
    SELECT 
      f.*,
      s.name as student_name,
      s.cnic as student_cnic,
      c.name as class_name,
      CONCAT(f.month, '/', f.year) as month_year
    FROM fees f
    LEFT JOIN students s ON f.student_id = s.id
    LEFT JOIN classes c ON s.class_id = c.id
    ORDER BY f.payment_date DESC
    LIMIT 100
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching fee history:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};

// Get student arrears
exports.getStudentArrears = (req, res) => {
  const { student_id } = req.params;

  const query = `
    SELECT 
      s.id,
      s.name as student_name,
      s.admission_number,
      s.father_name,
      s.cnic,
      s.monthly_fee,
      c.name as class_name,
      COALESCE(fs.arrears_amount, 0) as current_arrears,
      COALESCE(fs.fine_amount, 0) as current_fine,
      COALESCE(fs.total_amount, 0) as total_due,
      fs.month as current_month,
      fs.year as current_year,
      fs.due_date,
      fs.status as slip_status,
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
      ) as total_fine_paid
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

  db.query(query, [student_id], (err, results) => {
    if (err) {
      console.error("Error fetching student arrears:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ error: "Student not found or no fee slip available" });
    }

    const studentData = results[0];

    // Calculate additional arrears information
    const monthlyFee = parseFloat(studentData.monthly_fee) || 0;
    const currentArrears = parseFloat(studentData.current_arrears) || 0;
    const currentFine = parseFloat(studentData.current_fine) || 0;
    const totalDue = parseFloat(studentData.total_due) || 0;
    const totalPaidThisYear = parseFloat(studentData.total_paid_this_year) || 0;
    const totalArrearsPaid = parseFloat(studentData.total_arrears_paid) || 0;
    const totalFinePaid = parseFloat(studentData.total_fine_paid) || 0;

    // Calculate expected payments for current year
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // 1-12
    const expectedPayments = currentMonth;
    const expectedAmount = monthlyFee * expectedPayments;

    res.json({
      student_info: {
        id: studentData.id,
        name: studentData.student_name,
        admission_number: studentData.admission_number,
        father_name: studentData.father_name,
        cnic: studentData.cnic,
        class_name: studentData.class_name,
        monthly_fee: monthlyFee,
      },
      current_fee_slip: {
        month: studentData.current_month,
        year: studentData.current_year,
        due_date: studentData.due_date,
        status: studentData.slip_status,
      },
      arrears_summary: {
        current_arrears: currentArrears,
        current_fine: currentFine,
        total_due: totalDue,
        total_paid_this_year: totalPaidThisYear,
        total_arrears_paid: totalArrearsPaid,
        total_fine_paid: totalFinePaid,
        expected_payments: expectedPayments,
        expected_amount: expectedAmount,
        payments_made: studentData.payments_made_this_year,
        last_payment_date: studentData.last_payment_date,
      },
      payment_status: {
        has_arrears: currentArrears > 0,
        has_fine: currentFine > 0,
        is_overdue: totalDue > 0,
        payment_progress: {
          made: studentData.payments_made_this_year,
          expected: expectedPayments,
          percentage:
            expectedPayments > 0
              ? Math.round(
                  (studentData.payments_made_this_year / expectedPayments) * 100
                )
              : 0,
        },
      },
    });
  });
};

// Generate receipt after fee submission
exports.generateReceipt = (req, res) => {
  const { student_id, payment_id, month, year } = req.body;

  console.log("📄 Generating receipt for payment:", {
    student_id,
    payment_id,
    month,
    year,
  });

  // Get the payment details
  const getPaymentQuery = `
    SELECT 
      f.*,
      s.name as student_name,
      s.admission_number,
      s.father_name,
      s.cnic,
      s.phone,
      c.name as class_name
    FROM fees f
    LEFT JOIN students s ON f.student_id = s.id
    LEFT JOIN classes c ON s.class_id = c.id
    WHERE f.id = ? AND f.student_id = ?
  `;

  db.query(getPaymentQuery, [payment_id, student_id], (err, paymentResult) => {
    if (err) {
      console.error("Error fetching payment details:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (paymentResult.length === 0) {
      return res.status(404).json({ error: "Payment not found" });
    }

    const payment = paymentResult[0];

    // Get current fee breakdown for the student
    const getFeeBreakdownQuery = `
      SELECT 
        fs.*,
        s.monthly_fee,
        s.transport_fee,
        s.admission_fee_amount,
        s.is_admission_paid,
        (
          SELECT COALESCE(SUM(f.amount), 0)
          FROM fees f
          WHERE f.student_id = s.id 
          AND f.fee_type = 'Admission Fee'
        ) as admission_fee_paid_total,
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
        ) as annual_fee_paid_this_month
      FROM fee_slips fs
      LEFT JOIN students s ON fs.student_id = s.id
      WHERE fs.student_id = ? AND fs.month = ? AND fs.year = ?
      ORDER BY fs.id DESC LIMIT 1
    `;

    db.query(
      getFeeBreakdownQuery,
      [student_id, month, year],
      (breakdownErr, breakdownResult) => {
        if (breakdownErr) {
          console.error("Error fetching fee breakdown:", breakdownErr);
          return res.status(500).json({ error: "Database error" });
        }

        let feeBreakdown = null;
        if (breakdownResult.length > 0) {
          feeBreakdown = breakdownResult[0];
        }

        // Calculate fee breakdown
        const admissionFeeExpected = parseFloat(
          feeBreakdown?.admission_fee || 0
        );
        const admissionFeePaid = parseFloat(
          feeBreakdown?.admission_fee_paid_total || 0
        );
        const admissionFeeRemaining = Math.max(
          0,
          admissionFeeExpected - admissionFeePaid
        );

        const monthlyFeeExpected = parseFloat(feeBreakdown?.monthly_fee || 0);
        const monthlyFeePaid = parseFloat(
          feeBreakdown?.monthly_fee_paid_this_month || 0
        );
        const monthlyFeeRemaining = Math.max(
          0,
          monthlyFeeExpected - monthlyFeePaid
        );

        const transportFeeExpected = parseFloat(
          feeBreakdown?.transport_fee || 0
        );
        const transportFeePaid = parseFloat(
          feeBreakdown?.transport_fee_paid_this_month || 0
        );
        const transportFeeRemaining = Math.max(
          0,
          transportFeeExpected - transportFeePaid
        );

        const arrearsExpected = parseFloat(feeBreakdown?.arrears_amount || 0);
        const arrearsPaid = parseFloat(
          feeBreakdown?.arrears_paid_this_month || 0
        );
        const arrearsRemaining = Math.max(0, arrearsExpected - arrearsPaid);

        const fineExpected = parseFloat(feeBreakdown?.fine_amount || 0);
        const finePaid = parseFloat(feeBreakdown?.fine_paid_this_month || 0);
        const fineRemaining = Math.max(0, fineExpected - finePaid);

        const annualFeeExpected = 0; // Annual fee is not in current slip
        const annualFeePaid = parseFloat(
          feeBreakdown?.annual_fee_paid_this_month || 0
        );
        const annualFeeRemaining = Math.max(
          0,
          annualFeeExpected - annualFeePaid
        );

        // Calculate totals
        const totalExpected =
          admissionFeeExpected +
          monthlyFeeExpected +
          transportFeeExpected +
          arrearsExpected +
          fineExpected +
          annualFeeExpected;
        const totalPaid =
          admissionFeePaid +
          monthlyFeePaid +
          transportFeePaid +
          arrearsPaid +
          finePaid +
          annualFeePaid;
        const totalRemaining =
          admissionFeeRemaining +
          monthlyFeeRemaining +
          transportFeeRemaining +
          arrearsRemaining +
          fineRemaining +
          annualFeeRemaining;

        // Create receipt data
        const receipt = {
          payment_details: {
            payment_id: payment.id,
            payment_date: payment.payment_date,
            payment_method: payment.payment_method,
            amount_paid: payment.amount,
            fee_type: payment.fee_type,
            remarks: payment.remarks,
          },
          student_info: {
            name: payment.student_name,
            admission_number: payment.admission_number,
            father_name: payment.father_name,
            cnic: payment.cnic,
            phone: payment.phone,
            class_name: payment.class_name,
          },
          fee_breakdown: {
            admission_fee: {
              expected: admissionFeeExpected,
              paid: admissionFeePaid,
              remaining: admissionFeeRemaining,
              status:
                admissionFeeRemaining === 0
                  ? "PAID"
                  : admissionFeePaid > 0
                  ? "PARTIAL"
                  : "PENDING",
            },
            monthly_fee: {
              expected: monthlyFeeExpected,
              paid: monthlyFeePaid,
              remaining: monthlyFeeRemaining,
              status:
                monthlyFeeRemaining === 0
                  ? "PAID"
                  : monthlyFeePaid > 0
                  ? "PARTIAL"
                  : "PENDING",
            },
            transport_fee: {
              expected: transportFeeExpected,
              paid: transportFeePaid,
              remaining: transportFeeRemaining,
              status:
                transportFeeRemaining === 0
                  ? "PAID"
                  : transportFeePaid > 0
                  ? "PARTIAL"
                  : "PENDING",
            },
            arrears: {
              expected: arrearsExpected,
              paid: arrearsPaid,
              remaining: arrearsRemaining,
              status:
                arrearsRemaining === 0
                  ? "PAID"
                  : arrearsPaid > 0
                  ? "PARTIAL"
                  : "PENDING",
            },
            fine: {
              expected: fineExpected,
              paid: finePaid,
              remaining: fineRemaining,
              status:
                fineRemaining === 0
                  ? "PAID"
                  : finePaid > 0
                  ? "PARTIAL"
                  : "PENDING",
            },
            annual_fee: {
              expected: annualFeeExpected,
              paid: annualFeePaid,
              remaining: annualFeeRemaining,
              status:
                annualFeeRemaining === 0
                  ? "PAID"
                  : annualFeePaid > 0
                  ? "PARTIAL"
                  : "PENDING",
            },
          },
          summary: {
            total_expected: totalExpected,
            total_paid: totalPaid,
            total_remaining: totalRemaining,
            payment_status:
              totalRemaining === 0
                ? "FULLY_PAID"
                : totalPaid > 0
                ? "PARTIALLY_PAID"
                : "UNPAID",
          },
          receipt_number: `RCP-${payment.id}-${Date.now()}`,
          generated_at: new Date().toISOString(),
        };

        console.log(
          "✅ Receipt generated successfully:",
          receipt.receipt_number
        );

        res.json({
          message: "Receipt generated successfully",
          receipt: receipt,
        });
      }
    );
  });
};
