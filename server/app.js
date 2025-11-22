const express = require("express");
const app = express();
const { setupDatabase } = require("./db/db");
const linkRoutes = require("./routes/linkRoutes");
const cors = require("cors");
const { pool } = require("./db/db");

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

setupDatabase()
  .then(() => {
    console.log("DB Initialized.");
  })
  .catch((err) => {
    console.error("DB Initialization failed:", err);
  });

app.get("/healthz", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    return res.json({
      ok: true,
      server: "up",
      database: "connected",
      uptime: process.uptime(),
      version: "1.0.0",
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      server: "up",
      database: "down",
      error: err.message,
      timestamp: new Date().toISOString(),
    });
  }
});

app.use("/api/links", linkRoutes);
app.get("/:code", linkRoutes);
app.get("/code/:code", linkRoutes);
app.listen(PORT, () => {
  console.log("Server is running...");
});
