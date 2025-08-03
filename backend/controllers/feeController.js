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

    // Insert the fee payment
    const insertQuery = `
    INSERT INTO fees (
      student_id, fee_type, amount, payment_date, payment_method, 
      month, year, remarks, admission_fee_paid
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        res.status(201).json({
          message: "Fee added successfully",
          fee_id: result.insertId,
          amount: amount,
          student_id: actualStudentId,
          fee_type: fee_type,
          is_admission_fee: isAdmissionFee,
        });
      }
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
  const query = `
    SELECT 
      s.id,
      s.name as student_name,
      s.cnic,
      s.monthly_fee,
      c.name as class_name,
      COALESCE(SUM(f.amount), 0) as paid_amount,
      (s.monthly_fee - COALESCE(SUM(f.amount), 0)) as arrears_amount,
      MAX(f.payment_date) as last_payment
    FROM students s
    LEFT JOIN classes c ON s.class_id = c.id
    LEFT JOIN fees f ON s.id = f.student_id AND f.fee_type = 'Monthly Fee'
    WHERE s.status = 'Active'
    GROUP BY s.id, s.name, s.cnic, s.monthly_fee, c.name
    HAVING arrears_amount > 0
    ORDER BY arrears_amount DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching pending fees:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};

// Search fees
exports.searchFees = (req, res) => {
  const { query } = req.query;

  const searchQuery = `
    SELECT 
      f.*,
      s.name as student_name,
      s.cnic as student_cnic,
      c.name as class_name
    FROM fees f
    LEFT JOIN students s ON f.student_id = s.id
    LEFT JOIN classes c ON s.class_id = c.id
    WHERE s.name LIKE ? OR s.cnic LIKE ? OR f.fee_type LIKE ?
    ORDER BY f.payment_date DESC
  `;

  const searchTerm = `%${query}%`;

  db.query(
    searchQuery,
    [searchTerm, searchTerm, searchTerm],
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
