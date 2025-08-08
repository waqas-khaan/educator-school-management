const db = require("../config/db");

// Generate unique slip number (consistent for same student)
const generateUniqueSlipNumber = (studentId, admissionNumber) => {
  const paddedStudentId = studentId.toString().padStart(4, "0");
  const cleanAdmissionNumber = (admissionNumber || "").replace(
    /[^A-Z0-9]/g,
    ""
  );
  return `FS${paddedStudentId}${cleanAdmissionNumber}`;
};

// Generate student barcode (consistent for same student)
const generateStudentBarcode = (studentId, admissionNumber) => {
  return `FS${studentId.toString().padStart(4, "0")}${(
    admissionNumber || "N/A"
  ).replace(/[^A-Z0-9]/g, "")}`;
};

// Calculate arrears for a student (unpaid amounts from previous month)
const calculateArrears = (studentId, previousMonth, previousYear) => {
  return new Promise((resolve, reject) => {
    // Get the fee slip for the previous month
    const query = `
      SELECT 
        fs.total_amount,
        fs.monthly_fee,
        fs.transport_fee,
        fs.admission_fee,
        fs.arrears_amount,
        fs.fine_amount,
        COALESCE(
          (SELECT SUM(f.amount) 
           FROM fees f 
           WHERE f.student_id = fs.student_id 
           AND f.month = fs.month 
           AND f.year = fs.year
           AND f.fee_type IN ('Monthly Fee', 'Transport Fee', 'Admission Fee', 'Arrears', 'Fine', 'Annual Fee')
          ), 0) as total_paid
      FROM fee_slips fs
      WHERE fs.student_id = ? AND fs.month = ? AND fs.year = ?
      ORDER BY fs.id DESC LIMIT 1
    `;

    db.query(
      query,
      [studentId, previousMonth, previousYear],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length === 0) {
            // No fee slip found for previous month, no arrears
            resolve(0);
          } else {
            const feeSlip = results[0];
            const totalAmount = parseFloat(feeSlip.total_amount) || 0;
            const totalPaid = parseFloat(feeSlip.total_paid) || 0;
            const arrears = Math.max(0, totalAmount - totalPaid);

            console.log(`🔍 Arrears calculation for student ${studentId}:`);
            console.log(`   Previous month: ${previousMonth}/${previousYear}`);
            console.log(`   Total amount: ${totalAmount}`);
            console.log(`   Total paid: ${totalPaid}`);
            console.log(`   Arrears: ${arrears}`);

            resolve(arrears);
          }
        }
      }
    );
  });
};

// Generate fee slip for a single student (for manual generation)
const generateFeeSlipForStudent = async (student, nextMonth, nextYear) => {
  return new Promise((resolve, reject) => {
    try {
      // Calculate current month arrears
      const currentMonth = nextMonth === 1 ? 12 : nextMonth - 1;
      const currentYear = nextMonth === 1 ? nextYear - 1 : nextYear;

      calculateArrears(student.id, currentMonth, currentYear)
        .then((arrears) => {
          const monthlyFee = parseFloat(student.monthly_fee) || 0;
          const transportFee = parseFloat(student.transport_fee) || 0;
          const admissionFee =
            !student.is_admission_paid && student.admission_fee_amount > 0
              ? parseFloat(student.admission_fee_amount)
              : 0;

          const totalAmount =
            monthlyFee + transportFee + admissionFee + arrears;
          const slipNumber = generateUniqueSlipNumber(
            student.id,
            student.admission_number || ""
          );
          const dueDate = new Date(nextYear, nextMonth - 1, 10); // 10th of next month

          const insertQuery = `
          INSERT INTO fee_slips (
            slip_id, student_id, admission_number, student_name, class_name,
            month, year, monthly_fee, transport_fee, admission_fee, arrears_amount, 
            fine_amount, discount_amount, total_amount, due_date, barcode_data, status
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'PENDING')
        `;

          const values = [
            slipNumber,
            student.id,
            student.admission_number || "",
            student.name,
            student.class_name || "",
            nextMonth,
            nextYear,
            monthlyFee,
            transportFee,
            admissionFee,
            arrears,
            0, // fine_amount
            0, // discount_amount
            totalAmount,
            dueDate,
            generateStudentBarcode(student.id, student.admission_number || ""),
          ];

          db.query(insertQuery, values, (err, result) => {
            if (err) {
              console.error(
                `❌ Error generating fee slip for ${student.name}:`,
                err
              );
              reject(err);
            } else {
              console.log(
                `✅ Generated fee slip for ${student.name} - Month: ${nextMonth}/${nextYear}`
              );
              resolve({
                studentId: student.id,
                studentName: student.name,
                slipNumber: slipNumber,
                totalAmount: totalAmount,
                arrears: arrears,
              });
            }
          });
        })
        .catch(reject);
    } catch (error) {
      reject(error);
    }
  });
};

// Generate fee slips for all students for a new month
const generateFeeSlipsForNewMonth = async (newMonth, newYear) => {
  return new Promise((resolve, reject) => {
    console.log(
      `🔧 Generating fee slips for new month: ${newMonth}/${newYear}`
    );

    // Get all active students
    const getStudentsQuery = `
      SELECT s.*, c.name as class_name
      FROM students s
      LEFT JOIN classes c ON s.class_id = c.id
      WHERE s.status = 'Active'
      ORDER BY s.name
    `;

    db.query(getStudentsQuery, async (err, students) => {
      if (err) {
        console.error("❌ Error fetching students:", err);
        reject(err);
        return;
      }

      console.log(`📋 Found ${students.length} active students`);

      const results = [];
      let successCount = 0;
      let errorCount = 0;

      for (const student of students) {
        try {
          const result = await generateFeeSlipForStudent(
            student,
            newMonth,
            newYear
          );
          results.push(result);
          successCount++;
          console.log(`✅ Generated fee slip for ${student.name}`);
        } catch (error) {
          console.error(
            `❌ Error generating fee slip for ${student.name}:`,
            error
          );
          errorCount++;
        }
      }

      console.log(`📊 Fee slip generation completed:`);
      console.log(`   ✅ Success: ${successCount}`);
      console.log(`   ❌ Errors: ${errorCount}`);
      console.log(`   📋 Total: ${students.length}`);

      resolve({
        successCount,
        errorCount,
        totalStudents: students.length,
        results,
      });
    });
  });
};

// Manual trigger for fee slip generation (for testing/admin use)
const triggerManualGeneration = () => {
  console.log("🔧 Manual fee slip generation triggered");
  // This function can be used for manual generation if needed
  // For now, it just logs the trigger
};

// Automatic fee slip update on 25th of every month
const autoUpdateMonthlyFeeSlips = () => {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  // Only run on the 25th of each month
  if (currentDay !== 25) {
    console.log(
      `📅 Not the 25th (current day: ${currentDay}), skipping auto update`
    );
    return;
  }

  console.log(
    `🔧 Auto-updating fee slips to next month on ${currentDate.toDateString()}`
  );

  // Calculate next month (the month we're updating TO)
  let nextMonth = currentMonth + 1;
  let nextYear = currentYear;

  if (nextMonth > 12) {
    nextMonth = 1;
    nextYear = currentYear + 1;
  }

  console.log(
    `📅 Updating fee slips FROM ${currentMonth}/${currentYear} TO ${nextMonth}/${nextYear}`
  );

  // Get all active students
  const getStudentsQuery = `
    SELECT s.*, c.name as class_name
    FROM students s
    LEFT JOIN classes c ON s.class_id = c.id
    WHERE s.status = 'Active'
    ORDER BY s.name
  `;

  db.query(getStudentsQuery, async (err, students) => {
    if (err) {
      console.error("❌ Error fetching students for auto update:", err);
      return;
    }

    console.log(`📋 Found ${students.length} active students for auto update`);

    let successCount = 0;
    let errorCount = 0;

    for (const student of students) {
      try {
        // Find the current month's fee slip (the one we're updating)
        const getCurrentFeeSlipQuery = `
          SELECT * FROM fee_slips 
          WHERE student_id = ? 
            AND month = ? 
            AND year = ?
          ORDER BY id DESC LIMIT 1
        `;

        const currentFeeSlipResult = await new Promise((resolve, reject) => {
          db.query(
            getCurrentFeeSlipQuery,
            [student.id, currentMonth, currentYear],
            (err, results) => {
              if (err) reject(err);
              else resolve(results);
            }
          );
        });

        if (currentFeeSlipResult.length === 0) {
          console.log(
            `⚠️ No fee slip found for ${student.name} for ${currentMonth}/${currentYear}`
          );
          continue;
        }

        const currentFeeSlip = currentFeeSlipResult[0];

        // Calculate comprehensive arrears from ALL previous unpaid amounts
        const getAllUnpaidAmountsQuery = `
          SELECT 
            fs.id,
            fs.month,
            fs.year,
            fs.total_amount,
            fs.monthly_fee,
            fs.transport_fee,
            fs.admission_fee,
            fs.arrears_amount as existing_arrears,
            fs.fine_amount,
            fs.discount_amount,
            COALESCE(
              (SELECT SUM(f2.amount) 
               FROM fees f2 
               WHERE f2.student_id = fs.student_id 
               AND f2.month = fs.month 
               AND f2.year = fs.year
               AND f2.fee_type IN ('Monthly Fee', 'Transport Fee', 'Admission Fee', 'Arrears', 'Fine', 'Annual Fee')
              ), 0) as total_paid,
            (fs.total_amount - COALESCE(
              (SELECT SUM(f2.amount) 
               FROM fees f2 
               WHERE f2.student_id = fs.student_id 
               AND f2.month = fs.month 
               AND f2.year = fs.year
               AND f2.fee_type IN ('Monthly Fee', 'Transport Fee', 'Admission Fee', 'Arrears', 'Fine', 'Annual Fee')
              ), 0)) as unpaid_amount
          FROM fee_slips fs
          WHERE fs.student_id = ? 
            AND (
              (fs.year < ?) OR 
              (fs.year = ? AND fs.month <= ?)
            )
          ORDER BY fs.year ASC, fs.month ASC
        `;

        const allUnpaidResult = await new Promise((resolve, reject) => {
          db.query(
            getAllUnpaidAmountsQuery,
            [student.id, currentYear, currentYear, currentMonth],
            (err, results) => {
              if (err) reject(err);
              else resolve(results);
            }
          );
        });

        // Calculate total accumulated arrears from all previous months
        let totalAccumulatedArrears = 0;
        let currentMonthUnpaid = 0;

        console.log(
          `🔍 Student ${student.name} comprehensive arrears calculation:`
        );

        allUnpaidResult.forEach((slip) => {
          const unpaidAmount = Math.max(0, parseFloat(slip.unpaid_amount) || 0);

          if (slip.month === currentMonth && slip.year === currentYear) {
            currentMonthUnpaid = unpaidAmount;
            console.log(
              `   Current month (${slip.month}/${slip.year}): Total=${slip.total_amount}, Paid=${slip.total_paid}, Unpaid=${unpaidAmount}`
            );
          } else {
            totalAccumulatedArrears += unpaidAmount;
            if (unpaidAmount > 0) {
              console.log(
                `   Previous month (${slip.month}/${slip.year}): Total=${slip.total_amount}, Paid=${slip.total_paid}, Unpaid=${unpaidAmount}`
              );
            }
          }
        });

        // Total arrears = all previous months unpaid + current month unpaid
        const arrearsFromCurrentMonth =
          totalAccumulatedArrears + currentMonthUnpaid;

        console.log(`   📊 Summary for ${student.name}:`);
        console.log(
          `     - Previous months accumulated arrears: Rs ${totalAccumulatedArrears}`
        );
        console.log(
          `     - Current month (${currentMonth}/${currentYear}) unpaid: Rs ${currentMonthUnpaid}`
        );
        console.log(
          `     - Total arrears for next month: Rs ${arrearsFromCurrentMonth}`
        );

        // Update the fee slip to next month with new values
        const monthlyFee = parseFloat(student.monthly_fee) || 0;
        const transportFee = parseFloat(student.transport_fee) || 0;
        const admissionFee = 0; // Admission fee not included in monthly slips
        const fine = 0; // Reset fine for new month
        const discount = 0;

        const newTotalAmount =
          monthlyFee +
          transportFee +
          admissionFee +
          arrearsFromCurrentMonth +
          fine -
          discount;
        const newDueDate = new Date(nextYear, nextMonth - 1, 10); // 10th of next month

        const updateQuery = `
          UPDATE fee_slips 
          SET month = ?,
              year = ?,
              monthly_fee = ?,
              transport_fee = ?,
              admission_fee = ?,
              arrears_amount = ?,
              fine_amount = ?,
              discount_amount = ?,
              total_amount = ?,
              due_date = ?,
              status = 'PENDING',
              updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `;

        await new Promise((resolve, reject) => {
          db.query(
            updateQuery,
            [
              nextMonth,
              nextYear,
              monthlyFee,
              transportFee,
              admissionFee,
              arrearsFromCurrentMonth,
              fine,
              discount,
              newTotalAmount,
              newDueDate,
              currentFeeSlip.id,
            ],
            (err, result) => {
              if (err) {
                console.error(
                  `❌ Error updating fee slip for ${student.name}:`,
                  err
                );
                reject(err);
              } else {
                console.log(`✅ Updated fee slip for ${student.name}`);
                console.log(
                  `   FROM: ${currentMonth}/${currentYear} TO: ${nextMonth}/${nextYear}`
                );
                console.log(`   Monthly fee: Rs ${monthlyFee}`);
                console.log(`   Transport fee: Rs ${transportFee}`);
                console.log(
                  `   Total accumulated arrears: Rs ${arrearsFromCurrentMonth}`
                );
                console.log(`   Grand total: Rs ${newTotalAmount}`);
                console.log(
                  `   Formula: ${monthlyFee} + ${transportFee} + ${arrearsFromCurrentMonth} = ${newTotalAmount}`
                );
                resolve(result);
              }
            }
          );
        });

        successCount++;
      } catch (error) {
        console.error(`❌ Error updating fee slip for ${student.name}:`, error);
        errorCount++;
      }
    }

    console.log(`📊 Auto fee slip update completed:`);
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Errors: ${errorCount}`);
    console.log(`   📋 Total: ${students.length}`);
    console.log(
      `   📅 Updated FROM: ${currentMonth}/${currentYear} TO: ${nextMonth}/${nextYear}`
    );
  });
};

// Schedule the auto update to run daily at midnight
const scheduleAutoUpdate = () => {
  // Check every day at midnight
  setInterval(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // Run at 00:00 (midnight)
    if (hours === 0 && minutes === 0) {
      autoUpdateMonthlyFeeSlips();
    }
  }, 60000); // Check every minute
};

// Helper function to get comprehensive arrears report for a student
const getStudentArrearsReport = async (studentId) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        fs.id,
        fs.month,
        fs.year,
        fs.total_amount,
        fs.monthly_fee,
        fs.transport_fee,
        fs.admission_fee,
        fs.arrears_amount,
        fs.fine_amount,
        fs.discount_amount,
        s.name as student_name,
        COALESCE(
          (SELECT SUM(f2.amount) 
           FROM fees f2 
           WHERE f2.student_id = fs.student_id 
           AND f2.month = fs.month 
           AND f2.year = fs.year
           AND f2.fee_type IN ('Monthly Fee', 'Transport Fee', 'Admission Fee', 'Arrears', 'Fine', 'Annual Fee')
          ), 0) as total_paid,
        (fs.total_amount - COALESCE(
          (SELECT SUM(f2.amount) 
           FROM fees f2 
           WHERE f2.student_id = fs.student_id 
           AND f2.month = fs.month 
           AND f2.year = fs.year
           AND f2.fee_type IN ('Monthly Fee', 'Transport Fee', 'Admission Fee', 'Arrears', 'Fine', 'Annual Fee')
          ), 0)) as unpaid_amount
      FROM fee_slips fs
      LEFT JOIN students s ON fs.student_id = s.id
      WHERE fs.student_id = ?
      ORDER BY fs.year DESC, fs.month DESC
    `;

    db.query(query, [studentId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        const report = {
          student_name:
            results.length > 0 ? results[0].student_name : "Unknown",
          total_arrears: 0,
          fee_slips: [],
        };

        results.forEach((slip) => {
          const unpaidAmount = Math.max(0, parseFloat(slip.unpaid_amount) || 0);
          report.total_arrears += unpaidAmount;

          report.fee_slips.push({
            month: slip.month,
            year: slip.year,
            total_amount: parseFloat(slip.total_amount),
            total_paid: parseFloat(slip.total_paid),
            unpaid_amount: unpaidAmount,
            monthly_fee: parseFloat(slip.monthly_fee),
            transport_fee: parseFloat(slip.transport_fee),
            existing_arrears: parseFloat(slip.arrears_amount),
            fine: parseFloat(slip.fine_amount),
          });
        });

        resolve(report);
      }
    });
  });
};

// Start the scheduler
scheduleAutoUpdate();

// Export the auto update function for manual testing
module.exports = {
  generateFeeSlipForStudent,
  generateFeeSlipsForNewMonth,
  autoUpdateMonthlyFeeSlips,
  scheduleAutoUpdate,
  getStudentArrearsReport,
};
