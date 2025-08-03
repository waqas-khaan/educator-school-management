const db = require("../config/db");

// Get all expense records
exports.getAllExpenses = (req, res) => {
  const query = `
    SELECT * FROM expenses 
    ORDER BY date DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching expenses:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};

// Get expense by ID
exports.getExpenseById = (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM expenses WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Error fetching expense:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Expense record not found" });
    }
    res.json(results[0]);
  });
};

// Add new expense record
exports.addExpense = (req, res) => {
  const { category, amount, date, description, payment_method } = req.body;

  const query = `
    INSERT INTO expenses (category, amount, date, description, payment_method)
    VALUES (?, ?, ?, ?, ?)
  `;

  const values = [category, amount, date, description || "", payment_method];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error adding expense:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({
      message: "Expense record added successfully",
      expense_id: result.insertId,
    });
  });
};

// Update expense record
exports.updateExpense = (req, res) => {
  const { id } = req.params;
  const { category, amount, date, description, payment_method } = req.body;

  console.log("Update expense request:", {
    id,
    category,
    amount,
    date,
    description,
    payment_method,
  });

  const query = `
    UPDATE expenses SET
      category = ?, amount = ?, date = ?, description = ?, 
      payment_method = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  const values = [
    category,
    amount,
    date,
    description || "",
    payment_method,
    parseInt(id),
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error updating expense:", err);
      return res.status(500).json({ 
        error: "Database error", 
        details: err.message 
      });
    }
    
    console.log("Update expense result:", result);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Expense record not found" });
    }
    res.json({ message: "Expense record updated successfully" });
  });
};

// Delete expense record
exports.deleteExpense = (req, res) => {
  const { id } = req.params;

  console.log("Delete expense request:", { id });

  db.query("DELETE FROM expenses WHERE id = ?", [parseInt(id)], (err, result) => {
    if (err) {
      console.error("Error deleting expense:", err);
      return res.status(500).json({ 
        error: "Database error", 
        details: err.message 
      });
    }
    
    console.log("Delete expense result:", result);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Expense record not found" });
    }
    res.json({ message: "Expense record deleted successfully" });
  });
};

// Search expenses
exports.searchExpenses = (req, res) => {
  const { query } = req.query;

  const searchQuery = `
    SELECT * FROM expenses 
    WHERE category LIKE ? OR description LIKE ?
    ORDER BY date DESC
  `;

  const searchTerm = `%${query}%`;

  db.query(searchQuery, [searchTerm, searchTerm], (err, results) => {
    if (err) {
      console.error("Error searching expenses:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};

// Get expense statistics
exports.getExpenseStatistics = (req, res) => {
  const { year } = req.query;
  const currentYear = year || new Date().getFullYear();

  const query = `
    SELECT 
      category,
      COUNT(*) as expense_count,
      SUM(amount) as total_amount,
      AVG(amount) as avg_amount
    FROM expenses 
    WHERE YEAR(date) = ?
    GROUP BY category
    ORDER BY total_amount DESC
  `;

  db.query(query, [currentYear], (err, results) => {
    if (err) {
      console.error("Error fetching expense statistics:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};
