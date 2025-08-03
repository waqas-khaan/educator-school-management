const db = require("../config/db");

// Get all teachers
exports.getAllTeachers = (req, res) => {
  const query = `
    SELECT 
      t.*,
      CONCAT(t.name) as full_name
    FROM teachers t
    ORDER BY t.created_at DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching teachers:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};

// Get teacher by ID
exports.getTeacherById = (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT 
      t.*,
      CONCAT(t.name) as full_name
    FROM teachers t
    WHERE t.id = ?
  `;

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching teacher:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    res.json(results[0]);
  });
};

// Add new teacher
exports.addTeacher = (req, res) => {
  const {
    name,
    email,
    phone,
    subject,
    qualification,
    joining_date,
    salary,
    status,
  } = req.body;

  const query = `
    INSERT INTO teachers (
      name, email, phone, subject, qualification, joining_date, salary, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    name,
    email,
    phone,
    subject,
    qualification,
    joining_date,
    salary,
    status || 'Active',
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error adding teacher:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({
      message: "Teacher added successfully",
      teacher_id: result.insertId,
    });
  });
};

// Update teacher
exports.updateTeacher = (req, res) => {
  const { id } = req.params;
  const {
    name,
    email,
    phone,
    subject,
    qualification,
    joining_date,
    salary,
    status,
  } = req.body;

  const query = `
    UPDATE teachers SET
      name = ?, email = ?, phone = ?, subject = ?, qualification = ?,
      joining_date = ?, salary = ?, status = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  const values = [
    name,
    email,
    phone,
    subject,
    qualification,
    joining_date,
    salary,
    status,
    id,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error updating teacher:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    res.json({ message: "Teacher updated successfully" });
  });
};

// Delete teacher
exports.deleteTeacher = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM teachers WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error deleting teacher:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    res.json({ message: "Teacher deleted successfully" });
  });
};

// Search teachers
exports.searchTeachers = (req, res) => {
  const { query } = req.query;

  const searchQuery = `
    SELECT 
      t.*,
      CONCAT(t.name) as full_name
    FROM teachers t
    WHERE t.name LIKE ? OR t.email LIKE ? OR t.phone LIKE ? OR t.subject LIKE ?
    ORDER BY t.created_at DESC
  `;

  const searchTerm = `%${query}%`;

  db.query(
    searchQuery,
    [searchTerm, searchTerm, searchTerm, searchTerm],
    (err, results) => {
      if (err) {
        console.error("Error searching teachers:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json(results);
    }
  );
}; 