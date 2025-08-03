const db = require("../config/db");

// Get all salary records
exports.getAllSalaries = (req, res) => {
  const query = `
    SELECT * FROM salaries 
    ORDER BY payment_date DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching salaries:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};

// Get salary by ID
exports.getSalaryById = (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM salaries WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Error fetching salary:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Salary record not found" });
    }
    res.json(results[0]);
  });
};

// Add new salary record
exports.addSalary = (req, res) => {
  console.log("🔧 Received salary data:", req.body);

  const {
    employee_name,
    employee_id,
    phone_number,
    designation,
    basic_salary,
    allowances,
    deductions,
    net_salary,
    payment_date,
    payment_method,
    month,
    year,
    remarks,
  } = req.body;

  const query = `
    INSERT INTO salaries (
      employee_name, employee_id, phone_number, designation, basic_salary, allowances,
      deductions, net_salary, payment_date, payment_method, month, year, remarks
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // Validate required fields
  if (
    !employee_name ||
    !employee_id ||
    !designation ||
    !basic_salary ||
    !net_salary ||
    !payment_date ||
    !payment_method ||
    !month ||
    !year
  ) {
    console.error("❌ Missing required fields:", {
      employee_name: !!employee_name,
      employee_id: !!employee_id,
      designation: !!designation,
      basic_salary: !!basic_salary,
      net_salary: !!net_salary,
      payment_date: !!payment_date,
      payment_method: !!payment_method,
      month: !!month,
      year: !!year,
    });
    return res.status(400).json({ error: "Missing required fields" });
  }

  const values = [
    employee_name,
    employee_id,
    phone_number || "",
    designation,
    basic_salary,
    allowances || 0,
    deductions || 0,
    net_salary,
    payment_date,
    payment_method,
    month,
    year,
    remarks || "",
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error adding salary:", err);
      return res.status(500).json({ error: "Database error" });
    }

    console.log("✅ Salary record added successfully:", {
      salary_id: result.insertId,
      employee_name: employee_name,
      net_salary: net_salary,
    });

    res.status(201).json({
      message: "Salary record added successfully",
      salary_id: result.insertId,
    });
  });
};

// Update salary record
exports.updateSalary = (req, res) => {
  const { id } = req.params;
  const {
    employee_name,
    employee_id,
    phone_number,
    designation,
    basic_salary,
    allowances,
    deductions,
    net_salary,
    payment_date,
    payment_method,
    month,
    year,
    remarks,
  } = req.body;

  console.log("🔧 Update Salary Request:", {
    id: id,
    employee_name,
    employee_id,
    phone_number,
    designation,
    basic_salary,
    allowances,
    deductions,
    net_salary,
    payment_date,
    payment_method,
    month,
    year,
    remarks,
  });

  const query = `
    UPDATE salaries SET
      employee_name = ?, employee_id = ?, phone_number = ?, designation = ?, basic_salary = ?,
      allowances = ?, deductions = ?, net_salary = ?, payment_date = ?,
      payment_method = ?, month = ?, year = ?, remarks = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  const values = [
    employee_name,
    employee_id,
    phone_number || "",
    designation,
    basic_salary,
    allowances || 0,
    deductions || 0,
    net_salary,
    payment_date,
    payment_method,
    month,
    year,
    remarks || "",
    parseInt(id),
  ];

  console.log("🔧 SQL Query:", query);
  console.log("🔧 SQL Values:", values);

  db.query(query, values, async (err, result) => {
    if (err) {
      console.error("❌ Error updating salary:", err);
      return res
        .status(500)
        .json({ error: "Database error", details: err.message });
    }
    console.log("✅ Update result:", result);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Salary record not found" });
    }

    console.log("✅ Salary record updated successfully:", {
      salary_id: id,
      employee_name: employee_name,
      net_salary: net_salary,
    });

    res.json({
      message: "Salary record updated successfully",
    });
  });
};

// Delete salary record
exports.deleteSalary = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM salaries WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error deleting salary:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Salary record not found" });
    }
    res.json({ message: "Salary record deleted successfully" });
  });
};

// Search salaries
exports.searchSalaries = (req, res) => {
  const { query } = req.query;

  const searchQuery = `
    SELECT * FROM salaries 
    WHERE employee_name LIKE ? OR employee_id LIKE ?
    ORDER BY payment_date DESC
  `;

  const searchTerm = `%${query}%`;

  db.query(searchQuery, [searchTerm, searchTerm], (err, results) => {
    if (err) {
      console.error("Error searching salaries:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};

// Get salary statistics
exports.getSalaryStatistics = (req, res) => {
  const { year } = req.query;
  const currentYear = year || new Date().getFullYear();

  const query = `
    SELECT 
      designation,
      COUNT(*) as employee_count,
      SUM(net_salary) as total_paid,
      AVG(net_salary) as avg_salary
    FROM salaries 
    WHERE year = ?
    GROUP BY designation
    ORDER BY total_paid DESC
  `;

  db.query(query, [currentYear], (err, results) => {
    if (err) {
      console.error("Error fetching salary statistics:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};
