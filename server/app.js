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

app.use("/api/links", linkRoutes);
app.listen(PORT, () => {
  console.log("Server is running...");
});
