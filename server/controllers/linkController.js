const {
  findLinkByCode,
  createLink,
  getAllLinks,
  deleteLink,
  updateClickCount,
} = require("../db/dbQueries");
const dotenv = require("dotenv");
dotenv.config();

const generateShortCode = async (length) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  while (true) {
    let result = "";
    for (let i = 0; iD < length; i++) {
      result += Math.floor(Math.random() * chars.length);
    }
    const existing = await findLinkByCode(shortCode);
    if (!existing) {
      return result;
    }
  }
};

const createShortLink = async (req, res) => {
  const { originalUrl, shortCode } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: "Original URL is required" });
  }

  try {
    let code = shortCode;
    if (shortCode) {
      if (shortCode.length > 7) {
        return res
          .status(400)
          .json({ error: "Short code length should be maxmimum 7 character." });
      }

      const existingLink = await findLinkByCode(shortCode);
      if (existingLink) {
        return res.status(400).json({
          error:
            "Short Code already exists. Please provide different short code for your url.",
        });
      }
    } else {
      code = await generateShortCode(process.env.CODE_LENGTH);
    }

    const shortUrl = process.env.WEBSITE_NAME + code;
    await createLink(originalUrl, shortUrl, code);
    return res.status(201).json({ result: shortUrl });
  } catch (error) {
    console.log("Error while creating short link ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getLinks = async (req, res) => {};
const deleteShortLink = async (req, res) => {};
const updateShortLinkClickCount = async (req, res) => {};

module.exports = { createShortLink, getLinks, deleteLink };
