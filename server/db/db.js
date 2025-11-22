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
});

const setupDatabase = async () => {
  const schemaPath = path.join(process.cwd(), "server", "db", "schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf-8");

  await pool.query(schema);
  console.log("Database initialized");
};

module.exports = { pool, setupDatabase };
