require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

const app = express();

// Initialize auto fee slip update service
const { scheduleAutoUpdate } = require("./services/autoFeeSlipService");
console.log("🔧 Auto fee slip update service initialized");

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "http://localhost:3000",
      "https://localhost:8080",
      "https://localhost:3000",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files with CORS headers
app.use(
  "/uploads",
  (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
  },
  express.static(path.join(__dirname, "uploads"))
);

// Routes
app.use("/api/status", require("./routes/statusRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/teachers", require("./routes/teacherRoutes"));
app.use("/api/fees", require("./routes/feeRoutes"));
app.use("/api/fee-slips", require("./routes/feeSlipRoutes"));
app.use("/api/admission-slips", require("./routes/admissionSlipRoutes"));
app.use("/api/salaries", require("./routes/salaryRoutes"));
app.use("/api/revenue", require("./routes/revenueRoutes"));
app.use("/api/expenses", require("./routes/expenseRoutes"));
app.use("/api/uploads", require("./routes/uploadRoutes"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, "localhost", () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Server accessible at: http://localhost:${PORT}`);
});
