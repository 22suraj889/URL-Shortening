const mysql2 = require("mysql2/promise");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
dotenv.config();

const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  multipleStatements: true,
  ssl: {
    rejectUnauthorized: true, // REQUIRED
  },
});

const setupDatabase = async () => {
  const schemaPath = path.join(process.cwd(), "db", "schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf-8");

  await pool.query(schema);
  console.log("Database initialized");
};

module.exports = { pool, setupDatabase };
