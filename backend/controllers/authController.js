const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register new user
exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Database error" });
        }

        if (results.length > 0) {
          return res.status(400).json({ error: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user
        const query =
          "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
        db.query(query, [name, email, hashedPassword, role], (err, result) => {
          if (err) {
            console.error("Error creating user:", err);
            return res.status(500).json({ error: "Error creating user" });
          }

          res.status(201).json({ message: "User created successfully" });
        });
      }
    );
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Database error" });
        }

        if (results.length === 0) {
          return res.status(401).json({ error: "Invalid credentials" });
        }

        const user = results[0];

        // For development, allow specific credentials without hashing
        let isPasswordValid = false;

        if (email === "admin@school.com" && password === "schooladmin") {
          isPasswordValid = true;
        } else if (
          email === "account@school.com" &&
          password === "schoolaccounts"
        ) {
          isPasswordValid = true;
        } else {
          // For other users, use bcrypt comparison
          isPasswordValid = await bcrypt.compare(password, user.password);
        }

        if (!isPasswordValid) {
          return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate JWT token (no expiration)
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            role: user.role,
          },
          process.env.JWT_SECRET || "your-secret-key"
        );

        res.json({
          message: "Login successful",
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get current user
exports.getCurrentUser = (req, res) => {
  const userId = req.user.id;

  db.query(
    "SELECT id, name, email, role FROM users WHERE id = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ user: results[0] });
    }
  );
};
