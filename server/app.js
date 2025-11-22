const express = require("express");
const app = express();
const { setupDatabase } = require("./db/db");
const linkRoutes = require("./routes/linkRoutes");

const PORT = process.env.PORT || 5000;
app.use(express.json());

setupDatabase()
  .then(() => {
    console.log("DB Initialized.");
  })
  .catch((err) => {
    console.error("DB Initialization failed:", err);
  });

app.get("/healthz", (req, res) => {
  res.json({
    ok: true,
    version: "1.0",
    uptime: process.uptime(),
  });
});

app.use("/api/links", linkRoutes);
app.get("/:code", linkRoutes);
app.listen(PORT, () => {
  console.log("Server is running...");
});
