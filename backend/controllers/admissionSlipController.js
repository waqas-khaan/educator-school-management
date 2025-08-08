const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const db = require("../config/db");
const JsBarcode = require("jsbarcode");
const { createCanvas } = require("canvas");

// Function to generate barcode as image
const generateBarcode = (text) => {
  const canvas = createCanvas(200, 50);
  JsBarcode(canvas, text, {
    format: "CODE128",
    width: 2,
    height: 40,
    displayValue: true,
    fontSize: 12,
    margin: 5,
  });
  return canvas.toBuffer();
};

// Generate admission slip PDF
exports.generateAdmissionSlip = (req, res) => {
  const { studentId } = req.params;

  // Get student data with fee payment status
  const query = `
    SELECT 
      s.*,
      c.name as class_name,
      COALESCE(SUM(f.amount), 0) as admission_fee_paid
    FROM students s
    LEFT JOIN classes c ON s.class_id = c.id
    LEFT JOIN fees f ON s.id = f.student_id AND f.fee_type = 'Admission Fee'
    WHERE s.id = ?
    GROUP BY s.id
  `;

  db.query(query, [studentId], (err, results) => {
    if (err) {
      console.error("Error fetching student data:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    const student = results[0];

    // Create PDF document
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

    // Set response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="admission-slip-${student.admission_number}.pdf"`
    );

    // Pipe PDF to response
    doc.pipe(res);

    // Helper function to draw admission slip
    const drawAdmissionSlip = (
      x,
      y,
      width,
      height,
      student,
      isParentCopy = false
    ) => {
      // Background
      doc.rect(x, y, width, height).fill("#ffffff");

      // Header section
      const headerHeight = 80;

      // Left logo (The Educators)
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

      // Right logo (Beaconhouse)
      try {
        doc.image(
          path.join(__dirname, "../assets/beaconhouse-school-system-logo.png"),
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

      // School name and details
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

      // Title
      doc
        .fontSize(14)
        .font("Helvetica-Bold")
        .fill("#000")
        .text("ADMISSION SLIP", x + width / 2 - 60, y + 90);

      // Student information section
      const tableY = y + 120;
      const rowHeight = 29;
      const labelX = x + 20;
      const valueX = x + 150;
      const labelWidth = 120;

      // Draw table background
      doc.rect(x + 15, tableY, width - 30, rowHeight * 4).fill("#f8f9fa");

      // Student ID
      doc
        .fontSize(11)
        .font("Helvetica-Bold")
        .fill("#495057")
        .text("Student ID:", labelX, tableY + 8);
      doc
        .fontSize(11)
        .font("Helvetica")
        .fill("#212529")
        .text(student.id.toString(), valueX, tableY + 8);

      // Name
      doc
        .fontSize(11)
        .font("Helvetica-Bold")
        .fill("#495057")
        .text("Name:", labelX, tableY + rowHeight + 8);
      doc
        .fontSize(11)
        .font("Helvetica")
        .fill("#212529")
        .text(student.name, valueX, tableY + rowHeight + 8);

      // Father's Name
      doc
        .fontSize(11)
        .font("Helvetica-Bold")
        .fill("#495057")
        .text("Father's Name:", labelX, tableY + rowHeight * 2 + 8);
      doc
        .fontSize(11)
        .font("Helvetica")
        .fill("#212529")
        .text(student.father_name || "", valueX, tableY + rowHeight * 2 + 8);

      // Admission in Class
      doc
        .fontSize(11)
        .font("Helvetica-Bold")
        .fill("#495057")
        .text("Admitted in Class:", labelX, tableY + rowHeight * 3 + 8);
      doc
        .fontSize(11)
        .font("Helvetica")
        .fill("#212529")
        .text(student.class_name || "", valueX, tableY + rowHeight * 3 + 8);

      // Student image (right side of student information)
      const studentImageSize = 95;
      const studentImageX = x + width - 120;
      const studentImageY = tableY + 8;

      try {
        // Try to load student image from uploads directory using stored filename
        if (student.profile_image) {
          const studentImagePath = path.join(
            __dirname,
            "../uploads/profile-images/",
            student.profile_image
          );
          doc.image(studentImagePath, studentImageX, studentImageY, {
            width: studentImageSize,
            height: studentImageSize,
          });
        } else {
          // If no profile image stored, draw a placeholder
          doc
            .rect(
              studentImageX,
              studentImageY,
              studentImageSize,
              studentImageSize
            )
            .fill("#f0f0f0");
          doc
            .fontSize(8)
            .fill("#666")
            .text("PHOTO", studentImageX + 15, studentImageY + 20);
        }
      } catch (error) {
        // If student image not found, draw a placeholder
        doc
          .rect(
            studentImageX,
            studentImageY,
            studentImageSize,
            studentImageSize
          )
          .fill("#f0f0f0");
        doc
          .fontSize(8)
          .fill("#666")
          .text("PHOTO", studentImageX + 15, studentImageY + 20);
      }

      // Fees section
      const feesY = tableY + 120;
      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .fill("#000")
        .text("PARTICULARS & AMOUNT", x + 20, feesY + 4);

      const feesTableY = feesY + 30;
      const feeRowHeight = 20;

      // Monthly Fee
      const currentMonth = new Date().toLocaleString("en-US", {
        month: "long",
      });
      doc
        .fontSize(10)
        .font("Helvetica")
        .fill("#000")
        .text(`Monthly Fee ${currentMonth}:`, x + 20, feesTableY);
      doc
        .fontSize(10)
        .font("Helvetica")
        .fill("#000")
        .text(
          `Rs. ${(parseFloat(student.monthly_fee) || 0).toFixed(2)}`,
          x + width - 100,
          feesTableY
        );

      // Registration
      doc
        .fontSize(10)
        .font("Helvetica")
        .fill("#000")
        .text("Registration:", x + 20, feesTableY + feeRowHeight);
      doc
        .fontSize(10)
        .font("Helvetica")
        .fill("#000")
        .text(
          `Rs. ${(parseFloat(student.admission_fee_amount) || 0).toFixed(2)}`,
          x + width - 100,
          feesTableY + feeRowHeight
        );

      // Annual
      doc
        .fontSize(10)
        .font("Helvetica")
        .fill("#000")
        .text("Annual:", x + 20, feesTableY + feeRowHeight * 2);
      doc
        .fontSize(10)
        .font("Helvetica")
        .fill("#000")
        .text("Rs. 0.00", x + width - 100, feesTableY + feeRowHeight * 2);

      // Calculate fees first
      const monthlyFee = parseFloat(student.monthly_fee) || 0;
      const registrationFee = parseFloat(student.admission_fee_amount) || 0;
      const transportFee = parseFloat(student.transport_fee) || 0;

      // Transport Fee (only show if > 0)
      if (transportFee > 0) {
        doc
          .fontSize(10)
          .font("Helvetica")
          .fill("#000")
          .text("Transport Fee:", x + 20, feesTableY + feeRowHeight * 3);
        doc
          .fontSize(10)
          .font("Helvetica")
          .fill("#000")
          .text(
            `Rs. ${transportFee.toFixed(2)}`,
            x + width - 100,
            feesTableY + feeRowHeight * 3
          );
      }

      // Books and Stationary
      doc
        .fontSize(10)
        .font("Helvetica")
        .fill("#000")
        .text(
          "Books and Stationary:",
          x + 20,
          feesTableY + feeRowHeight * (transportFee > 0 ? 4 : 3)
        );
      doc
        .fontSize(10)
        .font("Helvetica")
        .fill("#000")
        .text(
          "Rs. 0.00",
          x + width - 100,
          feesTableY + feeRowHeight * (transportFee > 0 ? 4 : 3)
        );

      // Calculate total including registration fee and transport fee
      const totalAmount = monthlyFee + registrationFee + transportFee;

      // Calculate row positions based on whether transport fee is shown
      const totalRow = transportFee > 0 ? 5 : 4;
      const grandTotalRow = transportFee > 0 ? 6 : 5;

      // Total
      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .fill("#000")
        .text("Total:", x + 20, feesTableY + feeRowHeight * totalRow);
      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .fill("#000")
        .text(
          `Rs. ${totalAmount.toFixed(2)}`,
          x + width - 100,
          feesTableY + feeRowHeight * totalRow
        );

      // Grand Total
      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .fill("#000")
        .text(
          "Grand Total:",
          x + 20,
          feesTableY + feeRowHeight * grandTotalRow
        );
      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .fill("#000")
        .text(
          `Rs. ${totalAmount.toFixed(2)}`,
          x + width - 100,
          feesTableY + feeRowHeight * grandTotalRow
        );

      // Generate and add student barcode (only if admission fee is paid)
      const admissionFeePaid = parseFloat(student.admission_fee_paid) || 0;
      const admissionFeeAmount = parseFloat(student.admission_fee_amount) || 0;
      const isAdmissionFeePaid = admissionFeePaid >= admissionFeeAmount;

      if (isAdmissionFeePaid && admissionFeeAmount > 0) {
        try {
          // Use consistent barcode format: FS + StudentID + Admission Number
          const barcodeText = `FS${student.id.toString().padStart(4, "0")}${(
            student.admission_number || ""
          ).replace(/[^A-Z0-9]/g, "")}`;
          const barcodeBuffer = generateBarcode(barcodeText);

          // Add barcode below Grand Total and above signature
          const barcodeY = feesTableY + feeRowHeight * (grandTotalRow + 1) + 20;
          const barcodeWidth = 150;
          const barcodeHeight = 40;
          const barcodeX = x + 20;

          // Add barcode label
          doc
            .fontSize(10)
            .font("Helvetica-Bold")
            .fill("#495057")
            .text("Fee Slip Barcode:", barcodeX, barcodeY - 5);

          // Add barcode image
          doc.image(barcodeBuffer, barcodeX, barcodeY, {
            width: barcodeWidth,
            height: barcodeHeight,
          });

          // Add barcode text below
          doc
            .fontSize(8)
            .font("Helvetica")
            .fill("#666")
            .text(barcodeText, barcodeX, barcodeY + barcodeHeight + 5);
        } catch (error) {
          console.error("Error generating barcode:", error);
          // If barcode generation fails, add a placeholder
          const barcodeY = feesTableY + feeRowHeight * (grandTotalRow + 1) + 20;
          const barcodeX = x + 20;

          doc
            .fontSize(10)
            .font("Helvetica-Bold")
            .fill("#495057")
            .text("Student Barcode:", barcodeX, barcodeY - 5);

          doc.rect(barcodeX, barcodeY, 150, 40).fill("#f0f0f0");
          doc
            .fontSize(8)
            .fill("#666")
            .text("BARCODE ERROR", barcodeX + 50, barcodeY + 20);
        }
      } else {
        // Show fee slip barcode for fee collection when admission fee is not paid
        try {
          // Use consistent barcode format: FS + StudentID + Admission Number
          const feeSlipBarcode = `FS${student.id.toString().padStart(4, "0")}${(
            student.admission_number || ""
          ).replace(/[^A-Z0-9]/g, "")}`;

          const barcodeY = feesTableY + feeRowHeight * (grandTotalRow + 1) + 20;
          const barcodeWidth = 150;
          const barcodeHeight = 40;
          const barcodeX = x + 20;

          // Add fee slip barcode label
          doc
            .fontSize(10)
            .font("Helvetica-Bold")
            .fill("#2196F3")
            .text("", barcodeX, barcodeY - 5);

          // Generate and add fee slip barcode image
          const barcodeBuffer = generateBarcode(feeSlipBarcode);
          doc.image(barcodeBuffer, barcodeX, barcodeY, {
            width: barcodeWidth,
            height: barcodeHeight,
          });

          // Add note about fee collection
          doc
            .fontSize(8)
            .font("Helvetica")
            .fill("#666")
            .text(
              "Scan this barcode for fee collection",
              barcodeX,
              barcodeY + barcodeHeight + 20
            );
        } catch (error) {
          console.error("Error generating fee slip barcode:", error);
          // If barcode generation fails, show a placeholder
          const barcodeY = feesTableY + feeRowHeight * (grandTotalRow + 1) + 20;
          const barcodeX = x + 20;

          doc
            .fontSize(10)
            .font("Helvetica-Bold")
            .fill("#2196F3")
            .text("", barcodeX, barcodeY - 5);

          doc.rect(barcodeX, barcodeY, 150, 40).fill("#f0f0f0");
          doc
            .fontSize(8)
            .fill("#666")
            .text("BARCODE ERROR", barcodeX + 50, barcodeY + 20);
        }
      }

      // Signature and Stamp area
      const signatureY = y + height - 100;
      const signatureBoxWidth = 120;
      const signatureBoxHeight = 40;

      // Draw signature box on the right side
      doc
        .rect(
          x + width - signatureBoxWidth - 20,
          signatureY + 15,
          signatureBoxWidth,
          signatureBoxHeight
        )
        .stroke("#000000");

      // Add signature label at top center of the box
      doc
        .fontSize(9)
        .font("Helvetica")
        .fill("#000")
        .text(
          "Signature & Stamp",
          x + width - signatureBoxWidth - 20 + signatureBoxWidth / 2 - 35,
          signatureY + 5
        );

      // Note
      const noteY = y + height - 30;
      doc
        .fontSize(10)
        .font("Helvetica")
        .fill("#000")
        .text(
          "Note: Payment received on this Receipt is non refundable.",
          x + 20,
          noteY
        );

      // Copy indicator
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

    // Draw both copies
    drawAdmissionSlip(
      20,
      20,
      (doc.page.width - 40) / 2 - 10,
      doc.page.height - 40,
      student,
      true
    );
    drawAdmissionSlip(
      (doc.page.width - 40) / 2 + 10,
      20,
      (doc.page.width - 40) / 2 - 10,
      doc.page.height - 40,
      student,
      false
    );

    // Finalize PDF
    doc.end();
  });
};

// Auto-print admission slip after student admission
exports.autoPrintAdmissionSlip = async (studentId) => {
  try {
    // Generate PDF buffer
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

    const query = `
      SELECT 
        s.*,
        c.name as class_name,
        COALESCE(SUM(f.amount), 0) as admission_fee_paid
      FROM students s
      LEFT JOIN classes c ON s.class_id = c.id
      LEFT JOIN fees f ON s.id = f.student_id AND f.fee_type = 'Admission Fee'
      WHERE s.id = ?
      GROUP BY s.id
    `;

    return new Promise((resolve, reject) => {
      db.query(query, [studentId], (err, results) => {
        if (err) {
          console.error("Error fetching student data:", err);
          reject(err);
          return;
        }

        if (results.length === 0) {
          reject(new Error("Student not found"));
          return;
        }

        const student = results[0];

        // Helper function to draw admission slip with student data
        const drawAdmissionSlip = (
          x,
          y,
          width,
          height,
          student,
          isParentCopy = false
        ) => {
          // Background
          doc.rect(x, y, width, height).fill("#ffffff");

          // Header section
          const headerHeight = 80;

          // Left logo (The Educators)
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

          // Right logo (Beaconhouse)
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

          // School name and details
          doc
            .fontSize(16)
            .font("Helvetica-Bold")
            .fill("#000")
            .text("THE EDUCATORS", x + 100, y + 20);
          doc
            .fontSize(8)
            .font("Helvetica")
            .fill("#666")
            .text("A project of Beaconhouse School System", x + 100, y + 40);
          doc
            .fontSize(8)
            .font("Helvetica")
            .fill("#666")
            .text("Kohat Road Campus", x + 100, y + 55);
          doc
            .fontSize(8)
            .font("Helvetica")
            .fill("#666")
            .text("Session 2025-2026", x + 100, y + 70);

          // Title
          doc
            .fontSize(14)
            .font("Helvetica-Bold")
            .fill("#000")
            .text("ADMISSION SLIP", x + width / 2 - 50, y + 85);

          // Student details table
          const tableY = y + 120;
          const rowHeight = 29;
          const labelX = x + 20;
          const valueX = x + 150;

          // Draw table background
          doc.rect(x + 15, tableY, width - 30, rowHeight * 4).fill("#f8f9fa");

          // Student details
          doc
            .fontSize(11)
            .font("Helvetica-Bold")
            .fill("#495057")
            .text("Student ID:", labelX, tableY + 8);
          doc
            .fontSize(11)
            .font("Helvetica")
            .fill("#212529")
            .text(student.id.toString(), valueX, tableY + 8);

          doc
            .fontSize(11)
            .font("Helvetica-Bold")
            .fill("#495057")
            .text("Name:", labelX, tableY + rowHeight + 8);
          doc
            .fontSize(11)
            .font("Helvetica")
            .fill("#212529")
            .text(student.name, valueX, tableY + rowHeight + 8);

          doc
            .fontSize(11)
            .font("Helvetica-Bold")
            .fill("#495057")
            .text("Father's Name:", labelX, tableY + rowHeight * 2 + 8);
          doc
            .fontSize(11)
            .font("Helvetica")
            .fill("#212529")
            .text(student.father_name, valueX, tableY + rowHeight * 2 + 8);

          doc
            .fontSize(11)
            .font("Helvetica-Bold")
            .fill("#495057")
            .text("Admitted in Class:", labelX, tableY + rowHeight * 3 + 8);
          doc
            .fontSize(11)
            .font("Helvetica")
            .fill("#212529")
            .text(
              student.class_name || "N/A",
              valueX,
              tableY + rowHeight * 3 + 8
            );

          // Student image (right side of student information)
          const studentImageSize = 95;
          const studentImageX = x + width - 100;
          const studentImageY = tableY + 8;

          try {
            // Try to load student image from uploads directory using stored filename
            if (student.profile_image) {
              const studentImagePath = path.join(
                __dirname,
                "../uploads/profile-images/",
                student.profile_image
              );
              // Draw border around image
              doc.image(studentImagePath, studentImageX, studentImageY, {
                width: studentImageSize,
                height: studentImageSize,
              });
            } else {
              // If no profile image stored, draw a placeholder
              doc
                .rect(
                  studentImageX,
                  studentImageY,
                  studentImageSize,
                  studentImageSize
                )
                .fill("#f0f0f0");
              doc
                .fontSize(8)
                .fill("#666")
                .text("PHOTO", studentImageX + 15, studentImageY + 20);
            }
          } catch (error) {
            // If student image not found, draw a placeholder
            doc
              .rect(
                studentImageX,
                studentImageY,
                studentImageSize,
                studentImageSize
              )
              .fill("#f0f0f0");
            doc
              .fontSize(8)
              .fill("#666")
              .text("PHOTO", studentImageX + 15, studentImageY + 20);
          }

          // Generate and add student barcode
          try {
            const barcodeText =
              student.admission_number || student.id.toString();
            const barcodeBuffer = generateBarcode(barcodeText);

            // Add barcode below student information
            const barcodeY = tableY + rowHeight * 4 + 20;
            const barcodeWidth = 150;
            const barcodeHeight = 40;
            const barcodeX = x + 20;

            // Add barcode label
            doc
              .fontSize(10)
              .font("Helvetica-Bold")
              .fill("#495057")
              .text("Student Barcode:", barcodeX, barcodeY - 5);

            // Add barcode image
            doc.image(barcodeBuffer, barcodeX, barcodeY, {
              width: barcodeWidth,
              height: barcodeHeight,
            });

            // Add barcode text below
            doc
              .fontSize(8)
              .font("Helvetica")
              .fill("#666")
              .text(barcodeText, barcodeX, barcodeY + barcodeHeight + 5);
          } catch (error) {
            console.error("Error generating barcode:", error);
            // If barcode generation fails, add a placeholder
            const barcodeY = tableY + rowHeight * 4 + 20;
            const barcodeX = x + 20;

            doc
              .fontSize(10)
              .font("Helvetica-Bold")
              .fill("#495057")
              .text("Student Barcode:", barcodeX, barcodeY - 5);

            doc.rect(barcodeX, barcodeY, 150, 40).fill("#f0f0f0");
            doc
              .fontSize(8)
              .fill("#666")
              .text("BARCODE ERROR", barcodeX + 50, barcodeY + 20);
          }

          // Fees table
          const feesY = tableY + 80;
          doc
            .fontSize(12)
            .font("Helvetica-Bold")
            .fill("#000")
            .text("PARTICULARS & AMOUNT", x + 20, feesY + 4);

          const feesTableY = feesY + 30;
          const feeRowHeight = 20;

          // Monthly Fee
          const currentMonth = new Date().toLocaleString("en-US", {
            month: "long",
          });
          doc
            .fontSize(10)
            .font("Helvetica")
            .fill("#000")
            .text(`Monthly Fee ${currentMonth}:`, x + 20, feesTableY);
          doc
            .fontSize(10)
            .font("Helvetica")
            .fill("#000")
            .text(
              `Rs. ${(parseFloat(student.monthly_fee) || 0).toFixed(2)}`,
              x + width - 100,
              feesTableY
            );

          // Registration
          doc
            .fontSize(10)
            .font("Helvetica")
            .fill("#000")
            .text("Registration:", x + 20, feesTableY + feeRowHeight);
          doc
            .fontSize(10)
            .font("Helvetica")
            .fill("#000")
            .text(
              `Rs. ${(parseFloat(student.admission_fee_amount) || 0).toFixed(
                2
              )}`,
              x + width - 100,
              feesTableY + feeRowHeight
            );

          // Transport Fee (only show if > 0)
          const transportFee = parseFloat(student.transport_fee) || 0;
          if (transportFee > 0) {
            doc
              .fontSize(10)
              .font("Helvetica")
              .fill("#000")
              .text("Transport Fee:", x + 20, feesTableY + feeRowHeight * 2);
            doc
              .fontSize(10)
              .font("Helvetica")
              .fill("#000")
              .text(
                `Rs. ${transportFee.toFixed(2)}`,
                x + width - 100,
                feesTableY + feeRowHeight * 2
              );
          }

          // Annual
          doc
            .fontSize(10)
            .font("Helvetica")
            .fill("#000")
            .text(
              "Annual:",
              x + 20,
              feesTableY + feeRowHeight * (transportFee > 0 ? 3 : 2)
            );
          doc
            .fontSize(10)
            .font("Helvetica")
            .fill("#000")
            .text(
              "Rs. 0.00",
              x + width - 100,
              feesTableY + feeRowHeight * (transportFee > 0 ? 3 : 2)
            );

          // Books and Stationary
          doc
            .fontSize(10)
            .font("Helvetica")
            .fill("#000")
            .text(
              "Books and Stationary:",
              x + 20,
              feesTableY + feeRowHeight * (transportFee > 0 ? 4 : 3)
            );
          doc
            .fontSize(10)
            .font("Helvetica")
            .fill("#000")
            .text(
              "Rs. 0.00",
              x + width - 100,
              feesTableY + feeRowHeight * (transportFee > 0 ? 4 : 3)
            );

          // Calculate total including registration fee and transport fee
          const monthlyFee = parseFloat(student.monthly_fee) || 0;
          const registrationFee = parseFloat(student.admission_fee_amount) || 0;
          const totalAmount = monthlyFee + registrationFee + transportFee;

          // Calculate row positions based on whether transport fee is shown
          const totalRow = transportFee > 0 ? 5 : 4;
          const grandTotalRow = transportFee > 0 ? 6 : 5;

          // Total
          doc
            .fontSize(12)
            .font("Helvetica-Bold")
            .fill("#000")
            .text("Total:", x + 20, feesTableY + feeRowHeight * totalRow);
          doc
            .fontSize(12)
            .font("Helvetica-Bold")
            .fill("#000")
            .text(
              `Rs. ${totalAmount.toFixed(2)}`,
              x + width - 100,
              feesTableY + feeRowHeight * totalRow
            );

          // Grand Total
          doc
            .fontSize(12)
            .font("Helvetica-Bold")
            .fill("#000")
            .text(
              "Grand Total:",
              x + 20,
              feesTableY + feeRowHeight * grandTotalRow
            );
          doc
            .fontSize(12)
            .font("Helvetica-Bold")
            .fill("#000")
            .text(
              `Rs. ${totalAmount.toFixed(2)}`,
              x + width - 100,
              feesTableY + feeRowHeight * grandTotalRow
            );

          // Generate and add student barcode (only if admission fee is paid)
          const admissionFeePaid = parseFloat(student.admission_fee_paid) || 0;
          const admissionFeeAmount =
            parseFloat(student.admission_fee_amount) || 0;
          const isAdmissionFeePaid = admissionFeePaid >= admissionFeeAmount;

          if (isAdmissionFeePaid && admissionFeeAmount > 0) {
            try {
              const barcodeText =
                student.admission_number || student.id.toString();
              const barcodeBuffer = generateBarcode(barcodeText);

              // Add barcode below Grand Total and above signature
              const barcodeY = feesTableY + feeRowHeight * 6 + 20;
              const barcodeWidth = 150;
              const barcodeHeight = 40;
              const barcodeX = x + 20;

              // Add barcode label
              doc
                .fontSize(10)
                .font("Helvetica-Bold")
                .fill("#495057")
                .text("Student Barcode:", barcodeX, barcodeY - 5);

              // Add barcode image
              doc.image(barcodeBuffer, barcodeX, barcodeY, {
                width: barcodeWidth,
                height: barcodeHeight,
              });

              // Add barcode text below
              doc
                .fontSize(8)
                .font("Helvetica")
                .fill("#666")
                .text(barcodeText, barcodeX, barcodeY + barcodeHeight + 5);
            } catch (error) {
              console.error("Error generating barcode:", error);
              // If barcode generation fails, add a placeholder
              const barcodeY = feesTableY + feeRowHeight * 6 + 20;
              const barcodeX = x + 20;

              doc
                .fontSize(10)
                .font("Helvetica-Bold")
                .fill("#495057")
                .text("Student Barcode:", barcodeX, barcodeY - 5);

              doc.rect(barcodeX, barcodeY, 150, 40).fill("#f0f0f0");
              doc
                .fontSize(8)
                .fill("#666")
                .text("BARCODE ERROR", barcodeX + 50, barcodeY + 20);
            }
          } else {
            // Show fee slip barcode for fee collection when admission fee is not paid
            try {
              // Generate fee slip barcode for this student
              const feeSlipBarcode = `FS${student.id
                .toString()
                .padStart(4, "0")}${Date.now().toString().slice(-6)}`;

              const barcodeY = feesTableY + feeRowHeight * 6 + 20;
              const barcodeWidth = 150;
              const barcodeHeight = 40;
              const barcodeX = x + 20;

              // Add fee slip barcode label
              doc
                .fontSize(10)
                .font("Helvetica-Bold")
                .fill("#2196F3")
                .text("", barcodeX, barcodeY - 5);

              // Generate and add fee slip barcode image
              const barcodeBuffer = generateBarcode(feeSlipBarcode);
              doc.image(barcodeBuffer, barcodeX, barcodeY, {
                width: barcodeWidth,
                height: barcodeHeight,
              });

              // Add note about fee collection
              doc
                .fontSize(8)
                .font("Helvetica")
                .fill("#666")
                .text(
                  "Scan this barcode for fee collection",
                  barcodeX,
                  barcodeY + barcodeHeight + 20
                );
            } catch (error) {
              console.error("Error generating fee slip barcode:", error);
              // If barcode generation fails, show a placeholder
              const barcodeY = feesTableY + feeRowHeight * 6 + 20;
              const barcodeX = x + 20;

              doc
                .fontSize(10)
                .font("Helvetica-Bold")
                .fill("#2196F3")
                .text("", barcodeX, barcodeY - 5);

              doc.rect(barcodeX, barcodeY, 150, 40).fill("#f0f0f0");
              doc
                .fontSize(8)
                .fill("#666")
                .text("BARCODE ERROR", barcodeX + 50, barcodeY + 20);
            }
          }

          // Signature and Stamp area
          const signatureY = y + height - 100;
          const signatureBoxWidth = 120;
          const signatureBoxHeight = 40;

          // Draw signature box on the right side
          doc
            .rect(
              x + width - signatureBoxWidth - 20,
              signatureY + 15,
              signatureBoxWidth,
              signatureBoxHeight
            )
            .stroke("#000000");

          // Add signature label at top center of the box
          doc
            .fontSize(9)
            .font("Helvetica")
            .fill("#000")
            .text(
              "Signature & Stamp",
              x + width - signatureBoxWidth - 20 + signatureBoxWidth / 2 - 35,
              signatureY + 5
            );

          // Note
          const noteY = y + height - 30;
          doc
            .fontSize(10)
            .font("Helvetica")
            .fill("#000")
            .text(
              "Note: Payment received on this Receipt is non refundable.",
              x + 20,
              noteY
            );

          // Copy indicator
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

        // Draw both copies
        drawAdmissionSlip(
          20,
          20,
          (doc.page.width - 40) / 2 - 10,
          doc.page.height - 40,
          student,
          true
        );
        drawAdmissionSlip(
          (doc.page.width - 40) / 2 + 10,
          20,
          (doc.page.width - 40) / 2 - 10,
          doc.page.height - 40,
          student,
          false
        );

        // Finalize PDF
        doc.end();
        resolve();
      });
    });
  } catch (error) {
    console.error("Error generating admission slip:", error);
    throw error;
  }
};

// Generate multiple admission slips
exports.generateMultipleAdmissionSlips = (req, res) => {
  const { studentIds } = req.body;

  if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
    return res.status(400).json({ error: "Student IDs are required" });
  }

  // Get student data with fee payment status
  const query = `
    SELECT 
      s.*,
      c.name as class_name,
      COALESCE(SUM(f.amount), 0) as admission_fee_paid
    FROM students s
    LEFT JOIN classes c ON s.class_id = c.id
    LEFT JOIN fees f ON s.id = f.student_id AND f.fee_type = 'Admission Fee'
    WHERE s.id IN (?)
    GROUP BY s.id
  `;

  db.query(query, [studentIds], (err, results) => {
    if (err) {
      console.error("Error fetching student data:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "No students found" });
    }

    // Create PDF document
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

    // Set response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="multiple-admission-slips.pdf"`
    );

    // Pipe PDF to response
    doc.pipe(res);

    // Helper function to draw admission slip
    const drawAdmissionSlip = (
      x,
      y,
      width,
      height,
      student,
      isParentCopy = false
    ) => {
      // Background
      doc.rect(x, y, width, height).fill("#ffffff");

      // Header section
      const headerHeight = 80;

      // Left logo (The Educators)
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

      // Right logo (Beaconhouse)
      try {
        doc.image(
          path.join(__dirname, "../assets/beaconhouse-school-system-logo.png"),
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

      // School name and details
      doc
        .fontSize(16)
        .font("Helvetica-Bold")
        .fill("#000")
        .text("THE EDUCATORS", x + 100, y + 20);
      doc
        .fontSize(8)
        .font("Helvetica")
        .fill("#666")
        .text("A project of Beaconhouse School System", x + 100, y + 40);
      doc
        .fontSize(8)
        .font("Helvetica")
        .fill("#666")
        .text("Kohat Road Campus", x + 100, y + 55);
      doc
        .fontSize(8)
        .font("Helvetica")
        .fill("#666")
        .text("Session 2025-2026", x + 100, y + 70);

      // Title
      doc
        .fontSize(14)
        .font("Helvetica-Bold")
        .fill("#000")
        .text("ADMISSION SLIP", x + width / 2 - 50, y + 85);

      // Student details table
      const tableY = y + 120;
      const tableWidth = width - 40;
      const colWidth = tableWidth / 2;

      // Student details
      doc
        .fontSize(10)
        .font("Helvetica-Bold")
        .fill("#000")
        .text("Student ID:", x + 20, tableY);
      doc
        .fontSize(10)
        .font("Helvetica")
        .fill("#000")
        .text(student.id.toString(), x + 20 + colWidth, tableY);

      doc
        .fontSize(10)
        .font("Helvetica-Bold")
        .fill("#000")
        .text("Name:", x + 20, tableY + 19);
      doc
        .fontSize(10)
        .font("Helvetica")
        .fill("#000")
        .text(student.name, x + 20 + colWidth, tableY + 19);

      doc
        .fontSize(10)
        .font("Helvetica-Bold")
        .fill("#000")
        .text("Father's Name:", x + 20, tableY + 38);
      doc
        .fontSize(10)
        .font("Helvetica")
        .fill("#000")
        .text(student.father_name, x + 20 + colWidth, tableY + 38);

      doc
        .fontSize(10)
        .font("Helvetica-Bold")
        .fill("#000")
        .text("Admitted in Class:", x + 20, tableY + 57);
      doc
        .fontSize(10)
        .font("Helvetica")
        .fill("#000")
        .text(student.class_name || "N/A", x + 20 + colWidth, tableY + 57);

      // Student image (right side of student information)
      const studentImageSize = 95;
      const studentImageX = x + width - 100;
      const studentImageY = tableY + 8;

      try {
        // Try to load student image from uploads directory using stored filename
        if (student.profile_image) {
          const studentImagePath = path.join(
            __dirname,
            "../uploads/profile-images/",
            student.profile_image
          );
          // Draw border around image
          doc;
          doc.image(studentImagePath, studentImageX, studentImageY, {
            width: studentImageSize,
            height: studentImageSize,
          });
        } else {
          // If no profile image stored, draw a placeholder
          doc
            .rect(
              studentImageX,
              studentImageY,
              studentImageSize,
              studentImageSize
            )
            .fill("#f0f0f0");
          doc
            .fontSize(8)
            .fill("#666")
            .text("PHOTO", studentImageX + 15, studentImageY + 20);
        }
      } catch (error) {
        // If student image not found, draw a placeholder
        doc
          .rect(
            studentImageX,
            studentImageY,
            studentImageSize,
            studentImageSize
          )
          .fill("#f0f0f0");
        doc
          .fontSize(8)
          .fill("#666")
          .text("PHOTO", studentImageX + 15, studentImageY + 20);
      }

      // Fees table
      const feesY = tableY + 80;
      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .fill("#000")
        .text("PARTICULARS & AMOUNT", x + 20, feesY + 4);

      const feesTableY = feesY + 30;
      const feeRowHeight = 20;

      // Monthly Fee
      const currentMonth = new Date().toLocaleString("en-US", {
        month: "long",
      });
      doc
        .fontSize(10)
        .font("Helvetica")
        .fill("#000")
        .text(`Monthly Fee ${currentMonth}:`, x + 20, feesTableY);
      doc
        .fontSize(10)
        .font("Helvetica")
        .fill("#000")
        .text(
          `Rs. ${(parseFloat(student.monthly_fee) || 0).toFixed(2)}`,
          x + width - 100,
          feesTableY
        );

      // Registration
      doc
        .fontSize(10)
        .font("Helvetica")
        .fill("#000")
        .text("Registration:", x + 20, feesTableY + feeRowHeight);
      doc
        .fontSize(10)
        .font("Helvetica")
        .fill("#000")
        .text(
          `Rs. ${(parseFloat(student.admission_fee_amount) || 0).toFixed(2)}`,
          x + width - 100,
          feesTableY + feeRowHeight
        );

      // Transport Fee (only show if > 0)
      const transportFee = parseFloat(student.transport_fee) || 0;
      if (transportFee > 0) {
        doc
          .fontSize(10)
          .font("Helvetica")
          .fill("#000")
          .text("Transport Fee:", x + 20, feesTableY + feeRowHeight * 2);
        doc
          .fontSize(10)
          .font("Helvetica")
          .fill("#000")
          .text(
            `Rs. ${transportFee.toFixed(2)}`,
            x + width - 100,
            feesTableY + feeRowHeight * 2
          );
      }

      // Annual
      doc
        .fontSize(10)
        .font("Helvetica")
        .fill("#000")
        .text(
          "Annual:",
          x + 20,
          feesTableY + feeRowHeight * (transportFee > 0 ? 3 : 2)
        );
      doc
        .fontSize(10)
        .font("Helvetica")
        .fill("#000")
        .text(
          "Rs. 0.00",
          x + width - 100,
          feesTableY + feeRowHeight * (transportFee > 0 ? 3 : 2)
        );

      // Books and Stationary
      doc
        .fontSize(10)
        .font("Helvetica")
        .fill("#000")
        .text(
          "Books and Stationary:",
          x + 20,
          feesTableY + feeRowHeight * (transportFee > 0 ? 4 : 3)
        );
      doc
        .fontSize(10)
        .font("Helvetica")
        .fill("#000")
        .text(
          "Rs. 0.00",
          x + width - 100,
          feesTableY + feeRowHeight * (transportFee > 0 ? 4 : 3)
        );

      // Calculate total including registration fee and transport fee
      const monthlyFee = parseFloat(student.monthly_fee) || 0;
      const registrationFee = parseFloat(student.admission_fee_amount) || 0;
      const totalAmount = monthlyFee + registrationFee + transportFee;

      // Calculate row positions based on whether transport fee is shown
      const totalRow = transportFee > 0 ? 5 : 4;
      const grandTotalRow = transportFee > 0 ? 6 : 5;

      // Total
      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .fill("#000")
        .text("Total:", x + 20, feesTableY + feeRowHeight * totalRow);
      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .fill("#000")
        .text(
          `Rs. ${totalAmount.toFixed(2)}`,
          x + width - 100,
          feesTableY + feeRowHeight * totalRow
        );

      // Grand Total
      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .fill("#000")
        .text(
          "Grand Total:",
          x + 20,
          feesTableY + feeRowHeight * grandTotalRow
        );
      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .fill("#000")
        .text(
          `Rs. ${totalAmount.toFixed(2)}`,
          x + width - 100,
          feesTableY + feeRowHeight * grandTotalRow
        );

      // Generate and add student barcode (only if admission fee is paid)
      const admissionFeePaid = parseFloat(student.admission_fee_paid) || 0;
      const admissionFeeAmount = parseFloat(student.admission_fee_amount) || 0;
      const isAdmissionFeePaid = admissionFeePaid >= admissionFeeAmount;

      if (isAdmissionFeePaid && admissionFeeAmount > 0) {
        try {
          // Use consistent barcode format: FS + StudentID + Admission Number
          const barcodeText = `FS${student.id.toString().padStart(4, "0")}${(
            student.admission_number || ""
          ).replace(/[^A-Z0-9]/g, "")}`;
          const barcodeBuffer = generateBarcode(barcodeText);

          // Add barcode below Grand Total and above signature
          const barcodeY = feesTableY + feeRowHeight * (grandTotalRow + 1) + 20;
          const barcodeWidth = 150;
          const barcodeHeight = 40;
          const barcodeX = x + 20;

          // Add barcode label
          doc
            .fontSize(10)
            .font("Helvetica-Bold")
            .fill("#495057")
            .text("Fee Slip Barcode:", barcodeX, barcodeY - 5);

          // Add barcode image
          doc.image(barcodeBuffer, barcodeX, barcodeY, {
            width: barcodeWidth,
            height: barcodeHeight,
          });

          // Add barcode text below
          doc
            .fontSize(8)
            .font("Helvetica")
            .fill("#666")
            .text(barcodeText, barcodeX, barcodeY + barcodeHeight + 5);
        } catch (error) {
          console.error("Error generating barcode:", error);
          // If barcode generation fails, add a placeholder
          const barcodeY = feesTableY + feeRowHeight * (grandTotalRow + 1) + 20;
          const barcodeX = x + 20;

          doc
            .fontSize(10)
            .font("Helvetica-Bold")
            .fill("#495057")
            .text("Student Barcode:", barcodeX, barcodeY - 5);

          doc.rect(barcodeX, barcodeY, 150, 40).fill("#f0f0f0");
          doc
            .fontSize(8)
            .fill("#666")
            .text("BARCODE ERROR", barcodeX + 50, barcodeY + 20);
        }
      } else {
        // Show fee slip barcode for fee collection when admission fee is not paid
        try {
          // Use consistent barcode format: FS + StudentID + Admission Number
          const feeSlipBarcode = `FS${student.id.toString().padStart(4, "0")}${(student.admission_number || "").replace(/[^A-Z0-9]/g, "")}`;

          const barcodeY = feesTableY + feeRowHeight * (grandTotalRow + 1) + 20;
          const barcodeWidth = 150;
          const barcodeHeight = 40;
          const barcodeX = x + 20;

          // Add fee slip barcode label
          doc
            .fontSize(10)
            .font("Helvetica-Bold")
            .fill("#2196F3")
            .text("", barcodeX, barcodeY - 5);

          // Generate and add fee slip barcode image
          const barcodeBuffer = generateBarcode(feeSlipBarcode);
          doc.image(barcodeBuffer, barcodeX, barcodeY, {
            width: barcodeWidth,
            height: barcodeHeight,
          });

          // Add note about fee collection
          doc
            .fontSize(8)
            .font("Helvetica")
            .fill("#666")
            .text(
              "Scan this barcode for fee collection",
              barcodeX,
              barcodeY + barcodeHeight + 20
            );
        } catch (error) {
          console.error("Error generating fee slip barcode:", error);
          // If barcode generation fails, show a placeholder
          const barcodeY = feesTableY + feeRowHeight * 6 + 20;
          const barcodeX = x + 20;

          doc
            .fontSize(10)
            .font("Helvetica-Bold")
            .fill("#2196F3")
            .text("", barcodeX, barcodeY - 5);

          doc.rect(barcodeX, barcodeY, 150, 40).fill("#f0f0f0");
          doc
            .fontSize(8)
            .fill("#666")
            .text("BARCODE ERROR", barcodeX + 50, barcodeY + 20);
        }
      }

      // Signature and Stamp area
      const signatureY = y + height - 100;
      const signatureBoxWidth = 120;
      const signatureBoxHeight = 40;

      // Draw signature box on the right side
      doc
        .rect(
          x + width - signatureBoxWidth - 20,
          signatureY + 15,
          signatureBoxWidth,
          signatureBoxHeight
        )
        .stroke("#000000");

      // Add signature label at top center of the box
      doc
        .fontSize(9)
        .font("Helvetica")
        .fill("#000")
        .text(
          "Signature & Stamp",
          x + width - signatureBoxWidth - 20 + signatureBoxWidth / 2 - 35,
          signatureY + 5
        );

      // Note
      const noteY = y + height - 30;
      doc
        .fontSize(10)
        .font("Helvetica")
        .fill("#000")
        .text(
          "Note: Payment received on this Receipt is non refundable.",
          x + 20,
          noteY
        );

      // Copy indicator
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

    // Draw admission slips for each student
    results.forEach((student, index) => {
      if (index > 0) {
        doc.addPage();
      }

      // Draw both copies for each student
      drawAdmissionSlip(
        20,
        20,
        (doc.page.width - 40) / 2 - 10,
        doc.page.height - 40,
        student,
        true
      );
      drawAdmissionSlip(
        (doc.page.width - 40) / 2 + 10,
        20,
        (doc.page.width - 40) / 2 - 10,
        doc.page.height - 40,
        student,
        false
      );
    });

    // Finalize PDF
    doc.end();
  });
};

// Generate student directory PDF
exports.generateStudentDirectory = async (req, res) => {
  const { studentIds } = req.body;

  if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
    return res.status(400).json({ error: "Student IDs are required" });
  }

  console.log("Generating student directory for students:", studentIds);

  // Get student data
  const query = `
    SELECT 
      s.*,
      c.name as class_name
    FROM students s
    LEFT JOIN classes c ON s.class_id = c.id
    WHERE s.id IN (?)
    ORDER BY s.name
  `;

  db.query(query, [studentIds], (err, results) => {
    if (err) {
      console.error("Error fetching student data:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "No students found" });
    }

    // Create PDF document
    const doc = new PDFDocument({
      size: "A4",
      layout: "portrait",
      margins: {
        top: 60,
        bottom: 60,
        left: 50,
        right: 50,
      },
    });

    // Set response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="student_directory_${
        new Date().toISOString().split("T")[0]
      }.pdf"`
    );

    // Pipe PDF to response
    doc.pipe(res);

    // Add header with school branding
    doc
      .fontSize(28)
      .font("Helvetica-Bold")
      .fill("#1e3a8a")
      .text("THE EDUCATORS", { align: "center" });

    doc
      .fontSize(14)
      .font("Helvetica")
      .fill("#666")
      .text("A project of Beaconhouse School System", { align: "center" });

    doc
      .fontSize(20)
      .font("Helvetica-Bold")
      .fill("#1e3a8a")
      .text("Student Directory", { align: "center" });

    doc
      .fontSize(12)
      .font("Helvetica")
      .fill("#666")
      .text(`Generated on: ${new Date().toLocaleDateString()}`, {
        align: "center",
      });

    doc.moveDown(3);

    // Add student information with better layout
    results.forEach((student, index) => {
      // Check if we need a new page
      if (doc.y > doc.page.height - 250) {
        doc.addPage();
      }

      // Student card background
      const cardStartX = 50;
      const cardWidth = doc.page.width - 100;
      const cardHeight = 120;
      const cardY = doc.y + 10;

      // Card background with border
      doc
        .rect(cardStartX, cardY, cardWidth, cardHeight)
        .fill("#f8f9fa")
        .stroke("#dee2e6");

      // Student name as header with background
      doc.rect(cardStartX, cardY, cardWidth, 30).fill("#1e3a8a");

      doc
        .fontSize(16)
        .font("Helvetica-Bold")
        .fill("#ffffff")
        .text(`${index + 1}. ${student.name}`, cardStartX + 15, cardY + 8);

      // Student details in two columns
      doc.fontSize(10).font("Helvetica").fill("#333");

      const leftColumn = [
        { label: "Student ID", value: student.id },
        { label: "Admission Number", value: student.admission_number },
        { label: "Father's Name", value: student.father_name },
        { label: "Class", value: student.class_name },
        {
          label: "Admission Date",
          value: new Date(student.admission_date).toLocaleDateString(),
        },
      ];

      const rightColumn = [
        { label: "CNIC", value: student.cnic },
        { label: "Phone", value: student.phone },
        { label: "Gender", value: student.gender },
        {
          label: "Date of Birth",
          value: student.date_of_birth
            ? new Date(student.date_of_birth).toLocaleDateString()
            : "N/A",
        },
        {
          label: "Monthly Fee",
          value: student.monthly_fee
            ? `Rs ${parseFloat(student.monthly_fee).toFixed(2)}`
            : "N/A",
        },
      ];

      // Left column
      leftColumn.forEach((detail, i) => {
        const y = cardY + 40 + i * 15;
        doc
          .fontSize(9)
          .font("Helvetica-Bold")
          .fill("#666")
          .text(`${detail.label}:`, cardStartX + 15, y);

        doc
          .fontSize(9)
          .font("Helvetica")
          .fill("#333")
          .text(detail.value.toString(), cardStartX + 80, y);
      });

      // Right column
      rightColumn.forEach((detail, i) => {
        const y = cardY + 40 + i * 15;
        const x = cardStartX + cardWidth / 2 + 15;

        doc
          .fontSize(9)
          .font("Helvetica-Bold")
          .fill("#666")
          .text(`${detail.label}:`, x, y);

        doc
          .fontSize(9)
          .font("Helvetica")
          .fill("#333")
          .text(detail.value.toString(), x + 65, y);
      });

      // Address at bottom
      if (student.address) {
        doc
          .fontSize(9)
          .font("Helvetica-Bold")
          .fill("#666")
          .text("Address:", cardStartX + 15, cardY + cardHeight - 25);

        doc
          .fontSize(9)
          .font("Helvetica")
          .fill("#333")
          .text(student.address, cardStartX + 80, cardY + cardHeight - 25);
      }

      doc.moveDown(3);
    });

    // Add footer
    const footerY = doc.page.height - 40;
    doc
      .fontSize(10)
      .font("Helvetica")
      .fill("#666")
      .text(`Total Students: ${results.length}`, 50, footerY);

    doc
      .fontSize(10)
      .font("Helvetica")
      .fill("#666")
      .text(`Page ${doc.bufferedPageRange().count}`, { align: "right" });

    // Finalize PDF
    doc.end();
  });
};

// Generate custom print PDF with selected fields
exports.generateCustomPrint = async (req, res) => {
  const { studentIds, selectedFields } = req.body;

  if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
    return res.status(400).json({ error: "Student IDs are required" });
  }

  if (
    !selectedFields ||
    !Array.isArray(selectedFields) ||
    selectedFields.length === 0
  ) {
    return res.status(400).json({ error: "Selected fields are required" });
  }

  console.log("Generating custom print for students:", studentIds);
  console.log("Selected fields:", selectedFields);

  // Get student data
  const query = `
    SELECT 
      s.*,
      c.name as class_name
    FROM students s
    LEFT JOIN classes c ON s.class_id = c.id
    WHERE s.id IN (?)
    ORDER BY s.name
  `;

  db.query(query, [studentIds], (err, results) => {
    if (err) {
      console.error("Error fetching student data:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "No students found" });
    }

    // Create PDF document - landscape layout for better column visibility
    const doc = new PDFDocument({
      size: "A4",
      layout: "landscape",
      margins: {
        top: 20,
        bottom: 60,
        left: 40,
        right: 40,
      },
    });

    // Set response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="class_students_report_${
        new Date().toISOString().split("T")[0]
      }.pdf"`
    );

    // Pipe PDF to response
    doc.pipe(res);

    // Add header matching the image design
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    // School branding header - matching the image
    doc
      .fontSize(20)
      .font("Helvetica-Bold")
      .fill("#1e3a8a")
      .text("The Educator School", { align: "center" });

    doc
      .fontSize(16)
      .font("Helvetica-Bold")
      .fill("#333")
      .text(`Class Students Report - ${results[0]?.class_name || "Unknown"}`, {
        align: "center",
      });

    doc
      .fontSize(12)
      .font("Helvetica")
      .fill("#666")
      .text(`Total Students: ${results.length}`, { align: "center" });

    // Table setup - matching the image layout
    const tableStartX = 40;
    const tableWidth = doc.page.width - 80;
    const rowHeight = 22; // Increased to fit exactly 15 students

    // Define headers based on selected fields
    const fieldMappings = {
      name: { header: "Name", width: 180 },
      admission_number: { header: "Admission Number", width: 180 },
      father_name: { header: "Father's Name", width: 180 },
      cnic: { header: "CNIC", width: 180 },
      phone: { header: "Phone", width: 140 },
      gender: { header: "Gender", width: 100 },
      class_name: { header: "Class", width: 120 },
      date_of_birth: { header: "Date of Birth", width: 120 },
      admission_date: { header: "Admission Date", width: 140 },
      monthly_fee: { header: "Monthly Fee", width: 120 },
      address: { header: "Address", width: 150 },
    };

    // Build headers and column widths based on selected fields
    const headers = ["Sr.No"]; // Always include Sr.No
    const columnWidths = [80]; // Sr.No width

    selectedFields.forEach((field) => {
      if (fieldMappings[field]) {
        headers.push(fieldMappings[field].header);
        columnWidths.push(fieldMappings[field].width);
      }
    });
    const totalWidth = columnWidths.reduce((sum, width) => sum + width, 0);

    // Scale column widths to fit page
    const scale = tableWidth / totalWidth;
    const scaledColumnWidths = columnWidths.map((width) => width * scale);

    // Draw table header with light gray background
    let y = doc.y - 10;
    doc.rect(tableStartX, y - 5, tableWidth, rowHeight + 10).fill("#f8f9fa");

    // Header text
    doc.fontSize(10).font("Helvetica-Bold").fill("#333");

    let currentX = tableStartX;
    headers.forEach((header, index) => {
      const cellWidth = scaledColumnWidths[index];

      // Draw header cell border with dark border
      doc.rect(currentX, y - 5, cellWidth, rowHeight + 10).stroke("#333333");

      // Show full header text with responsive sizing
      const headerText = header;
      let headerFontSize = 10;

      // Reduce font size for longer headers
      if (headerText.length > 12) {
        headerFontSize = 8;
      } else if (headerText.length > 8) {
        headerFontSize = 9;
      }

      doc.fontSize(headerFontSize).font("Helvetica-Bold").fill("#333");
      doc.text(headerText, currentX + 3, y + 8);
      currentX += cellWidth;
    });

    y += rowHeight + 10;

    // Draw table rows with alternating colors and borders
    doc.fontSize(10).font("Helvetica").fill("#333");

    // Process all students with proper pagination
    results.forEach((student, rowIndex) => {
      // Check if we need a new page (exactly after 15 students)
      // rowIndex 0-14 = page 1, rowIndex 15-29 = page 2, etc.
      if (rowIndex > 0 && rowIndex % 15 === 0) {
        doc.addPage();
        y = 120; // Start after header

        // Redraw header on new page
        doc
          .rect(tableStartX, y - 5, tableWidth, rowHeight + 10)
          .fill("#f8f9fa");

        doc.fontSize(10).font("Helvetica-Bold").fill("#333");

        currentX = tableStartX;
        headers.forEach((header, index) => {
          const cellWidth = scaledColumnWidths[index];

          doc
            .rect(currentX, y - 5, cellWidth, rowHeight + 10)
            .stroke("#333333");

          // Show full header text with responsive sizing
          const headerText = header;
          let paginationHeaderFontSize = 10;

          // Reduce font size for longer headers
          if (headerText.length > 12) {
            paginationHeaderFontSize = 8;
          } else if (headerText.length > 8) {
            paginationHeaderFontSize = 9;
          }

          doc
            .fontSize(paginationHeaderFontSize)
            .font("Helvetica-Bold")
            .fill("#333");
          doc.text(headerText, currentX + 3, y + 8);
          currentX += cellWidth;
        });

        y += rowHeight + 4;
      }

      // Row background with alternating colors
      const rowColor = rowIndex % 2 === 0 ? "#ffffff" : "#f8f9fa";
      doc.rect(tableStartX, y - 5, tableWidth, rowHeight + 10).fill(rowColor);

      // Draw data cells with proper table structure
      currentX = tableStartX;

      // Sr.No cell - continuous numbering across pages
      doc
        .rect(currentX, y - 5, scaledColumnWidths[0], rowHeight + 10)
        .stroke("#333333");
      doc
        .fontSize(10)
        .font("Helvetica")
        .fill("#333")
        .text((rowIndex + 1).toString(), currentX + 5, y + 8, {
          width: scaledColumnWidths[0] - 10,
          align: "center",
        });
      currentX += scaledColumnWidths[0];

      // Render selected fields dynamically
      selectedFields.forEach((field, index) => {
        const columnIndex = index + 1; // +1 because Sr.No is at index 0
        const cellWidth = scaledColumnWidths[columnIndex];

        // Draw cell border
        doc.rect(currentX, y - 5, cellWidth, rowHeight + 10).stroke("#333333");

        // Get field value
        let fieldValue = "";
        let fontSize = 10;

        switch (field) {
          case "name":
            fieldValue = student.name || "";
            if (fieldValue.length > 15) fontSize = 8;
            else if (fieldValue.length > 10) fontSize = 9;
            break;
          case "admission_number":
            fieldValue = student.admission_number || "";
            if (fieldValue.length > 12) fontSize = 8;
            else if (fieldValue.length > 8) fontSize = 9;
            break;
          case "father_name":
            fieldValue = student.father_name || "";
            break;
          case "cnic":
            fieldValue = student.cnic || "";
            break;
          case "phone":
            fieldValue = student.phone || "";
            break;
          case "gender":
            fieldValue = student.gender || "";
            break;
          case "class_name":
            fieldValue = student.class_name || "";
            break;
          case "date_of_birth":
            fieldValue = student.date_of_birth
              ? new Date(student.date_of_birth).toLocaleDateString()
              : "null";
            break;
          case "admission_date":
            fieldValue = student.admission_date
              ? new Date(student.admission_date).toLocaleDateString()
              : "";
            break;
          case "monthly_fee":
            fieldValue = student.monthly_fee
              ? `Rs${parseFloat(student.monthly_fee).toFixed(2)}`
              : "";
            break;
          case "address":
            fieldValue = student.address || "";
            break;
        }

        // Render field value
        doc.fontSize(fontSize).font("Helvetica").fill("#333");
        doc.text(fieldValue, currentX + 5, y + 8, {
          width: cellWidth - 10,
          align: "center",
        });

        currentX += cellWidth;
      });

      // Move to next row
      y += rowHeight + 4;
    });

    // Footer matching the image
    const totalPages = Math.ceil(results.length / 15);

    // Finalize PDF
    doc.end();
  });
};
