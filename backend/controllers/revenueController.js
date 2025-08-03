const db = require("../config/db");

// Get all revenue records
exports.getAllRevenue = (req, res) => {
  const query = `
    SELECT * FROM revenue 
    ORDER BY date DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching revenue:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};

// Add new revenue record
exports.addRevenue = (req, res) => {
  const { source, amount, date, description, category } = req.body;

  const query = `
    INSERT INTO revenue (source, amount, date, description, category)
    VALUES (?, ?, ?, ?, ?)
  `;

  const values = [source, amount, date, description, category];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error adding revenue:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({
      message: "Revenue record added successfully",
      revenue_id: result.insertId,
    });
  });
};

// Update revenue record
exports.updateRevenue = (req, res) => {
  const { id } = req.params;
  const { source, amount, date, description, category } = req.body;

  console.log("Update revenue request:", {
    id,
    source,
    amount,
    date,
    description,
    category,
  });

  const query = `
    UPDATE revenue 
    SET source = ?, amount = ?, date = ?, description = ?, category = ?
    WHERE id = ?
  `;

  const values = [source, amount, date, description, category, parseInt(id)];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error updating revenue:", err);
      return res
        .status(500)
        .json({ error: "Database error", details: err.message });
    }

    console.log("Update result:", result);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Revenue record not found" });
    }

    res.json({
      message: "Revenue record updated successfully",
      revenue_id: id,
    });
  });
};

// Delete revenue record
exports.deleteRevenue = (req, res) => {
  const { id } = req.params;

  console.log("Delete revenue request:", { id });

  const query = `
    DELETE FROM revenue 
    WHERE id = ?
  `;

  db.query(query, [parseInt(id)], (err, result) => {
    if (err) {
      console.error("Error deleting revenue:", err);
      return res
        .status(500)
        .json({ error: "Database error", details: err.message });
    }

    console.log("Delete result:", result);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Revenue record not found" });
    }

    res.json({
      message: "Revenue record deleted successfully",
      revenue_id: id,
    });
  });
};
