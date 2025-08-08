const db = require("../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
// Removed auto-print import - no longer needed

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = "";
    if (file.fieldname === "profile_image") {
      uploadPath = "uploads/profile-images/";
    } else if (file.fieldname === "admission_form") {
      uploadPath = "uploads/admission-forms/";
    }

    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.fieldname === "profile_image") {
      // Allow only images
      if (file.mimetype.startsWith("image/")) {
        cb(null, true);
      } else {
        cb(new Error("Only image files are allowed for profile image"), false);
      }
    } else if (file.fieldname === "admission_form") {
      // Allow only PDFs
      if (file.mimetype === "application/pdf") {
        cb(null, true);
      } else {
        cb(new Error("Only PDF files are allowed for admission form"), false);
      }
    } else {
      cb(null, true);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Export upload configuration
exports.upload = upload;

// Get all students
exports.getAllStudents = (req, res) => {
  const query = `
    SELECT 
      s.*,
      c.name as class_name,
      CONCAT(s.name) as full_name,
      COALESCE(s.admission_number, CONCAT('ADM-', YEAR(s.created_at), '-', s.id)) as admission_number
    FROM students s
    LEFT JOIN classes c ON s.class_id = c.id
    ORDER BY s.created_at DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching students:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};

// Get student by ID
exports.getStudentById = (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT 
      s.*,
      c.name as class_name,
      CONCAT(s.name) as full_name
    FROM students s
    LEFT JOIN classes c ON s.class_id = c.id
    WHERE s.id = ?
  `;

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching student:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(results[0]);
  });
};

// Get student by admission number
exports.getStudentByAdmissionNumber = (req, res) => {
  const { admissionNumber } = req.params;

  const query = `
    SELECT 
      s.*,
      c.name as class_name,
      CONCAT(s.name) as full_name,
      COALESCE(s.admission_number, CONCAT('ADM-', YEAR(s.created_at), '-', s.id)) as admission_number
    FROM students s
    LEFT JOIN classes c ON s.class_id = c.id
    WHERE s.admission_number = ? OR CONCAT('ADM-', YEAR(s.created_at), '-', s.id) = ?
  `;

  db.query(query, [admissionNumber, admissionNumber], (err, results) => {
    if (err) {
      console.error("Error fetching student by admission number:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(results[0]);
  });
};

// Generate EDU admission number
const generateEDUAdmissionNumber = () => {
  return new Promise((resolve, reject) => {
    const currentYear = new Date().getFullYear();

    // Get the highest admission number for the current year
    const query = `
      SELECT admission_number 
      FROM students 
      WHERE admission_number LIKE 'EDU-${currentYear}-%' 
      ORDER BY admission_number DESC 
      LIMIT 1
    `;

    db.query(query, (err, results) => {
      if (err) {
        reject(err);
        return;
      }

      let nextNumber = 1;
      if (results.length > 0) {
        // Extract the number from the highest admission number
        const lastAdmissionNumber = results[0].admission_number;
        const match = lastAdmissionNumber.match(/EDU-\d{4}-(\d{4})/);
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }

      const admissionNumber = `EDU-${currentYear}-${nextNumber
        .toString()
        .padStart(4, "0")}`;
      console.log("Generated admission number:", admissionNumber);
      resolve(admissionNumber);
    });
  });
};

// Add new student
exports.addStudent = async (req, res) => {
  console.log("Received student data:", req.body);
  console.log("Files received:", req.files);
  console.log("Admission fee from form:", req.body.admission_fee);
  console.log("Admission fee type:", typeof req.body.admission_fee);

  const {
    name,
    father_name,
    cnic,
    phone,
    gender,
    date_of_birth,
    admission_date,
    class_id,
    admission_fee,
    monthly_fee,
    transport_fee,
    address,
    admission_number,
  } = req.body;

  // Validate required fields
  if (
    !name ||
    !father_name ||
    !cnic ||
    !phone ||
    !gender ||
    !admission_date ||
    !address
  ) {
    return res.status(400).json({
      error: "Missing required fields",
      required: [
        "name",
        "father_name",
        "cnic",
        "phone",
        "gender",
        "admission_date",
        "address",
      ],
    });
  }

  console.log("Extracted values:", {
    name,
    father_name,
    cnic,
    phone,
    gender,
    date_of_birth,
    admission_date,
    class_id,
    admission_fee,
    monthly_fee,
    transport_fee,
    address,
  });

  // CNIC can be shared by multiple students (same parent)
  // No validation needed - proceed directly with insertion

  // Use admission number from form or generate if not provided
  const finalAdmissionNumber =
    admission_number || (await generateEDUAdmissionNumber());

  // Proceed with insertion (allowing duplicate CNICs)
  const query = `
    INSERT INTO students (
      admission_number, name, father_name, cnic, phone, gender, date_of_birth, admission_date,
      class_id, admission_fee_amount, monthly_fee, transport_fee, address, profile_image, admission_form
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // Get file paths if files were uploaded
  const profileImagePath =
    req.files && req.files.profile_image
      ? req.files.profile_image[0].filename
      : null;
  const admissionFormPath =
    req.files && req.files.admission_form
      ? req.files.admission_form[0].filename
      : null;

  const values = [
    finalAdmissionNumber,
    name,
    father_name,
    cnic,
    phone,
    gender,
    date_of_birth,
    admission_date,
    class_id,
    parseFloat(admission_fee) || 0, // Use 0 as default registration fee
    parseFloat(monthly_fee) || 0,
    parseFloat(transport_fee) || 0, // Use 0 as default transport fee
    address,
    profileImagePath,
    admissionFormPath,
  ];

  console.log("SQL Query:", query);
  console.log("Raw form data:", {
    admission_fee: admission_fee,
    monthly_fee: monthly_fee,
    admission_fee_type: typeof admission_fee,
    monthly_fee_type: typeof monthly_fee,
  });
  console.log("Values being inserted:", values);
  console.log(
    "Admission fee value being saved:",
    parseFloat(admission_fee) || 0
  );
  console.log("Values:", values);

  db.query(query, values, async (err, result) => {
    if (err) {
      console.error("Error adding student:", err);
      console.error("Error details:", err.message);
      return res
        .status(500)
        .json({ error: "Database error", details: err.message });
    }

    console.log("Student added successfully:", result);

    // Return success response without auto-printing
    res.status(201).json({
      message: "Student added successfully",
      student_id: result.insertId,
      admission_number: finalAdmissionNumber,
    });
  });
};

// Update student
exports.updateStudent = (req, res) => {
  console.log("=== UPDATE STUDENT ===");
  console.log("Student ID:", req.params.id);
  console.log("Request body:", req.body);

  const { id } = req.params;
  console.log("=== UPDATE STUDENT ===");
  console.log("Student ID:", id);
  console.log("Request body:", req.body);

  const {
    name,
    father_name,
    cnic,
    phone,
    gender,
    date_of_birth,
    admission_date,
    class_id,
    admission_fee_amount: admission_fee,
    monthly_fee,
    transport_fee,
    address,
  } = req.body;

  // Format dates properly for MySQL
  let formattedDateOfBirth = null;
  let formattedAdmissionDate = null;

  if (date_of_birth && date_of_birth.trim() !== "") {
    // If it's already in YYYY-MM-DD format, use it as is
    if (date_of_birth.includes("T")) {
      formattedDateOfBirth = date_of_birth.split("T")[0];
    } else {
      formattedDateOfBirth = date_of_birth;
    }
  }

  if (admission_date && admission_date.trim() !== "") {
    // If it's already in YYYY-MM-DD format, use it as is
    if (admission_date.includes("T")) {
      formattedAdmissionDate = admission_date.split("T")[0];
    } else {
      formattedAdmissionDate = admission_date;
    }
  }

  const query = `
    UPDATE students SET
      name = ?, father_name = ?, cnic = ?, phone = ?, gender = ?, date_of_birth = ?,
      admission_date = ?, class_id = ?, admission_fee_amount = ?, monthly_fee = ?, transport_fee = ?, address = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  const values = [
    name,
    father_name,
    cnic,
    phone,
    gender,
    formattedDateOfBirth,
    formattedAdmissionDate,
    class_id,
    admission_fee,
    monthly_fee,
    transport_fee || 0,
    address,
    id,
  ];

  console.log("Query values:", values);

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error updating student:", err);
      console.error("SQL Query:", query);
      console.error("SQL Values:", values);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    console.log("Update successful, affected rows:", result.affectedRows);
    res.json({ message: "Student updated successfully" });
  });
};

// Delete student
exports.deleteStudent = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM students WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error deleting student:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({ message: "Student deleted successfully" });
  });
};

// Get classes for dropdown
exports.getClasses = (req, res) => {
  db.query("SELECT id, name FROM classes ORDER BY name", (err, results) => {
    if (err) {
      console.error("Error fetching classes:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};

// Get class by ID
exports.getClassById = (req, res) => {
  const { classId } = req.params;

  db.query(
    "SELECT id, name, description, capacity FROM classes WHERE id = ?",
    [classId],
    (err, results) => {
      if (err) {
        console.error("Error fetching class:", err);
        return res.status(500).json({ error: "Database error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Class not found" });
      }
      res.json(results[0]);
    }
  );
};

// Search students
exports.searchStudents = (req, res) => {
  const { query } = req.query;

  const searchQuery = `
    SELECT 
      s.*,
      c.name as class_name,
      CONCAT(s.name) as full_name,
      COALESCE(s.admission_number, CONCAT('ADM-', YEAR(s.created_at), '-', s.id)) as admission_number
    FROM students s
    LEFT JOIN classes c ON s.class_id = c.id
    WHERE s.name LIKE ? 
       OR s.cnic LIKE ? 
       OR s.phone LIKE ? 
       OR s.admission_number LIKE ?
       OR CONCAT('ADM-', YEAR(s.created_at), '-', s.id) LIKE ?
       OR c.name LIKE ?
    ORDER BY s.created_at DESC
  `;

  const searchTerm = `%${query}%`;

  db.query(
    searchQuery,
    [searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm],
    (err, results) => {
      if (err) {
        console.error("Error searching students:", err);
        return res.status(500).json({ error: "Database error" });
      }
      console.log(
        `🔍 Search query: "${query}" returned ${results.length} results`
      );
      res.json(results);
    }
  );
};

// Add new class
exports.addClass = (req, res) => {
  const { name, description, capacity } = req.body;

  const query = `
    INSERT INTO classes (name, description, capacity) VALUES (?, ?, ?)
  `;

  const values = [name, description || null, capacity || 100];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error adding class:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({
      message: "Class added successfully",
      class_id: result.insertId,
    });
  });
};

// Add multiple classes
exports.addMultipleClasses = (req, res) => {
  const classes = [
    { name: "PG Blue", description: "Play Group Blue Section", capacity: 30 },
    { name: "PG Red", description: "Play Group Red Section", capacity: 30 },
    { name: "Nursery Blue", description: "Nursery Blue Section", capacity: 30 },
    { name: "Nursery Red", description: "Nursery Red Section", capacity: 30 },
    { name: "KG Blue", description: "Kindergarten Blue Section", capacity: 30 },
    { name: "KG Red", description: "Kindergarten Red Section", capacity: 30 },
    { name: "1 Blue", description: "Class 1 Blue Section", capacity: 30 },
    { name: "1 Red", description: "Class 1 Red Section", capacity: 30 },
    { name: "2 Blue", description: "Class 2 Blue Section", capacity: 30 },
    { name: "2 Red", description: "Class 2 Red Section", capacity: 30 },
    { name: "3 Blue", description: "Class 3 Blue Section", capacity: 30 },
    { name: "3 Red", description: "Class 3 Red Section", capacity: 30 },
    { name: "4 Blue", description: "Class 4 Blue Section", capacity: 30 },
    { name: "4 Red", description: "Class 4 Red Section", capacity: 30 },
    { name: "5", description: "Class 5", capacity: 30 },
    { name: "6", description: "Class 6", capacity: 30 },
    { name: "7", description: "Class 7", capacity: 30 },
  ];

  const query = `
    INSERT INTO classes (name, description, capacity) VALUES (?, ?, ?)
  `;

  let successCount = 0;
  let errorCount = 0;

  classes.forEach((classData, index) => {
    const values = [classData.name, classData.description, classData.capacity];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error(`Error adding class ${classData.name}:`, err);
        errorCount++;
      } else {
        successCount++;
      }

      // If this is the last class, send the response
      if (index === classes.length - 1) {
        res.status(201).json({
          message: `Classes added successfully. ${successCount} added, ${errorCount} failed.`,
          success_count: successCount,
          error_count: errorCount,
        });
      }
    });
  });
};

// Promote students to new class
exports.promoteStudents = (req, res) => {
  const { studentIds, newClassId } = req.body;

  if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
    return res.status(400).json({ error: "Student IDs array is required" });
  }

  if (!newClassId) {
    return res.status(400).json({ error: "New class ID is required" });
  }

  console.log("=== PROMOTE STUDENTS ===");
  console.log("Student IDs:", studentIds);
  console.log("New Class ID:", newClassId);

  // First, verify the target class exists
  const classCheckQuery = "SELECT id, name FROM classes WHERE id = ?";

  db.query(classCheckQuery, [newClassId], (err, classResults) => {
    if (err) {
      console.error("Error checking class:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (classResults.length === 0) {
      return res.status(404).json({ error: "Target class not found" });
    }

    const targetClassName = classResults[0].name;
    console.log("Target class:", targetClassName);

    // Update all students to the new class
    const updateQuery = `
      UPDATE students 
      SET class_id = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id IN (${studentIds.map(() => "?").join(",")})
    `;

    const queryValues = [newClassId, ...studentIds];

    db.query(updateQuery, queryValues, (err, result) => {
      if (err) {
        console.error("Error promoting students:", err);
        return res.status(500).json({ error: "Database error" });
      }

      console.log("Promote result:", result);
      console.log("Affected rows:", result.affectedRows);

      res.json({
        message: `Successfully promoted ${result.affectedRows} students to ${targetClassName}`,
        promoted_count: result.affectedRows,
        target_class: targetClassName,
      });
    });
  });
};

// Mark students as left
exports.markStudentsLeft = (req, res) => {
  const { studentIds } = req.body;

  if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
    return res.status(400).json({ error: "Student IDs array is required" });
  }

  console.log("=== MARK STUDENTS LEFT ===");
  console.log("Student IDs:", studentIds);

  // Update students status to left
  const updateQuery = `
    UPDATE students 
    SET status = 'Left', updated_at = CURRENT_TIMESTAMP 
    WHERE id IN (${studentIds.map(() => "?").join(",")})
  `;

  db.query(updateQuery, studentIds, (err, result) => {
    if (err) {
      console.error("Error marking students left:", err);
      return res.status(500).json({ error: "Database error" });
    }

    console.log("Mark left result:", result);
    console.log("Affected rows:", result.affectedRows);

    res.json({
      message: `Successfully marked ${result.affectedRows} students as left`,
      left_count: result.affectedRows,
    });
  });
};

// Reactivate a student (change status from 'Left' to 'Active')
exports.reactivateStudent = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Student ID is required" });
  }

  console.log("=== REACTIVATE STUDENT ===");
  console.log("Student ID:", id);

  // Update student status to active
  const updateQuery =
    "UPDATE students SET status = 'Active', updated_at = CURRENT_TIMESTAMP WHERE id = ?";

  db.query(updateQuery, [id], (err, result) => {
    if (err) {
      console.error("Error reactivating student:", err);
      return res.status(500).json({ error: "Database error" });
    }

    console.log("Reactivate result:", result);
    console.log("Affected rows:", result.affectedRows);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({
      message: "Student reactivated successfully",
      affected_rows: result.affectedRows,
    });
  });
};

// Delete a student permanently
exports.deleteStudent = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Student ID is required" });
  }

  console.log("=== DELETE STUDENT ===");
  console.log("Student ID:", id);

  // First, get the student details to delete associated files
  const getStudentQuery =
    "SELECT profile_image, admission_form FROM students WHERE id = ?";

  db.query(getStudentQuery, [id], (err, studentResult) => {
    if (err) {
      console.error("Error fetching student details:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (studentResult.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    const student = studentResult[0];

    // Delete associated files if they exist
    const deleteFiles = [];

    if (student.profile_image) {
      const profileImagePath = path.join(
        __dirname,
        "..",
        "uploads",
        "profile-images",
        student.profile_image
      );
      if (fs.existsSync(profileImagePath)) {
        try {
          fs.unlinkSync(profileImagePath);
          console.log("Deleted profile image:", student.profile_image);
        } catch (fileError) {
          console.error("Error deleting profile image:", fileError);
        }
      }
    }

    if (student.admission_form) {
      const admissionFormPath = path.join(
        __dirname,
        "..",
        "uploads",
        "admission-forms",
        student.admission_form
      );
      if (fs.existsSync(admissionFormPath)) {
        try {
          fs.unlinkSync(admissionFormPath);
          console.log("Deleted admission form:", student.admission_form);
        } catch (fileError) {
          console.error("Error deleting admission form:", fileError);
        }
      }
    }

    // Delete the student from database
    const deleteQuery = "DELETE FROM students WHERE id = ?";

    db.query(deleteQuery, [id], (err, result) => {
      if (err) {
        console.error("Error deleting student:", err);
        return res.status(500).json({ error: "Database error" });
      }

      console.log("Delete result:", result);
      console.log("Affected rows:", result.affectedRows);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Student not found" });
      }

      res.json({
        message: "Student deleted successfully",
        affected_rows: result.affectedRows,
        deleted_files: deleteFiles,
      });
    });
  });
};

// Get fee status for students in a class
exports.getClassStudentsFeeStatus = (req, res) => {
  const { classId } = req.params;
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const query = `
    SELECT 
      s.id,
      s.name as student_name,
      s.admission_number,
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
    WHERE s.status = 'Active' AND s.class_id = ?
    GROUP BY s.id, s.name, s.admission_number, s.monthly_fee, s.transport_fee, c.name
    ORDER BY s.name
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
      classId,
    ],
    (err, results) => {
      if (err) {
        console.error("Error fetching class students fee status:", err);
        return res.status(500).json({ error: "Database error" });
      }

      // Transform results to include comprehensive pending fees
      const transformedResults = results.map((student) => {
        const monthlyFeePending = Math.max(0, student.monthly_fee_pending);
        const transportFeePending = Math.max(0, student.transport_fee_pending);
        const admissionFeePending = Math.max(0, student.admission_fee_pending);
        const arrearsPending = student.arrears_pending;
        const finePending = student.fine_pending;
        const annualFeePending = student.annual_fee_pending;

        const totalPending =
          monthlyFeePending +
          transportFeePending +
          admissionFeePending +
          arrearsPending +
          finePending +
          annualFeePending;

        // Determine fee status based on total pending
        let feeStatus = "unpaid";
        if (totalPending === 0) {
          feeStatus = "paid";
        } else if (
          monthlyFeePending < student.monthly_fee ||
          transportFeePending < student.transport_fee
        ) {
          feeStatus = "partial";
        }

        return {
          ...student,
          total_pending_this_month: totalPending,
          fee_status: feeStatus,
        };
      });

      // Calculate summary statistics
      const totalStudents = transformedResults.length;
      const paidStudents = transformedResults.filter(
        (r) => r.fee_status === "paid"
      ).length;
      const partialStudents = transformedResults.filter(
        (r) => r.fee_status === "partial"
      ).length;
      const unpaidStudents = transformedResults.filter(
        (r) => r.fee_status === "unpaid"
      ).length;
      const totalPending = transformedResults.reduce(
        (sum, r) => sum + parseFloat(r.total_pending_this_month || 0),
        0
      );

      res.json({
        students: transformedResults,
        summary: {
          total: totalStudents,
          paid: paidStudents,
          partial: partialStudents,
          unpaid: unpaidStudents,
          totalPending: totalPending,
        },
      });
    }
  );
};
