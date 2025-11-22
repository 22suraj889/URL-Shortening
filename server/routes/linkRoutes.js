const express = require("express");
const router = express.Router();
const {
  createShortLink,
  getLinks,
  deleteShortLink,
  redirectToOriginalUrl,
} = require("../controllers/linkController");

router.post("/", createShortLink);
router.get("/", getLinks);
router.delete("/:code", deleteShortLink);
router.get("/:code", redirectToOriginalUrl);
module.exports = router;