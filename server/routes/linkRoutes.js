const express = require("express");
const router = express.Router();
const {
  createShortLink,
  getLinks,
  deleteLink,
} = require("../controllers/linkController");

router.post("/", createShortLink);
router.get("/", getLinks);
router.delete("/:code", deleteLink);
module.exports = router;