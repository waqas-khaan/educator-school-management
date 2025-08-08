const mysql = require("mysql2");

// Database configuration with defaults for development
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "rootuser",
  database: process.env.DB_NAME || "TheEducatorSchool",
  ssl:
    process.env.DB_SSL === "true"
      ? {
          // Render-managed databases typically require SSL without verification
          rejectUnauthorized: false,
        }
      : undefined,
};

console.log("🔧 Database Config:", {
  host: dbConfig.host,
  user: dbConfig.user,
  database: dbConfig.database,
  port: dbConfig.port,
  ssl: !!dbConfig.ssl,
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
