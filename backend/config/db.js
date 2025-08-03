const mysql = require("mysql2");

// Database configuration with defaults for development
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "rootuser",
  database: process.env.DB_NAME || "TheEducatorSchool",
};

console.log("🔧 Database Config:", {
  host: dbConfig.host,
  user: dbConfig.user,
  database: dbConfig.database,
  password: dbConfig.password ? "***" : "NO PASSWORD",
});

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error("❌ MySQL Connection Error:", err.message);
    console.log("💡 Please check your .env file or database credentials");
    console.log("📋 Expected .env variables:");
    console.log("   DB_HOST=localhost");
    console.log("   DB_USER=root");
    console.log("   DB_PASSWORD=your_password");
    console.log("   DB_NAME=TheEducatorSchool");
    process.exit(1);
  }
  console.log("✅ MySQL Connected Successfully!");
});

module.exports = connection;
