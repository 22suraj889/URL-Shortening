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
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    const existing = await findLinkByCode(result);
    if (!existing.length) {
      return result;
    }
  }
};

const createShortLink = async (req, res) => {
  const { originalUrl, shortCode } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: "Original URL is required" });
  }
  console.log("OriginalUrl: ", originalUrl);
  try {
    let code = shortCode;
    if (shortCode) {
      if (shortCode.length > 7) {
        return res
          .status(400)
          .json({ error: "Short code length should be maxmimum 7 character." });
      }

      const existingLink = await findLinkByCode(shortCode);
      console.log("existingLink: ", existingLink);
      if (existingLink.length) {
        return res.status(400).json({
          error:
            "Short Code already exists. Please provide different short code for your url.",
        });
      }
    } else {
      console.log("Generating code...");
      code = await generateShortCode(process.env.CODE_LENGTH);
    }
    console.log(code);
    const shortUrl = process.env.WEBSITE_NAME + code;
    await createLink(originalUrl, shortUrl, code);
    return res.status(201).json({ result: shortUrl });
  } catch (error) {
    console.log("Error while creating short link ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getLinks = async (req, res) => {
  try {
    const links = await getAllLinks();
    return res.status(200).json({ result: links });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getLinksStats = async (req, res) => {
  try {
    const code = req.params.code;
    console.log(code);
    if (!code) {
      return res.status(400).json({ error: "Code Not Found." });
    }

    const [link] = await findLinkByCode(code);
    console.log("Link:", link);
    if (!link) {
      return res.status(400).json({
        error: "Link Not Found.",
      });
    }

    return res.status(200).json({ result: link });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteShortLink = async (req, res) => {
  try {
    const code = req.params.code;
    console.log(code);
    if (!code) {
      return res.status(400).json({ error: "Code Not Found." });
    }

    const link = await findLinkByCode(code);
    console.log(link);
    if (!link.length) {
      return res.status(400).json({
        error: "Link Not Found.",
      });
    }
    await deleteLink(code);
    return res
      .status(200)
      .json({ success: true, message: `Links deleted for short code ${code}` });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const redirectToOriginalUrl = async (req, res) => {
  try {
    const code = req.params.code;
    if (!code) {
      return res.status(400).json({ error: "Code Not Found." });
    }

    const [link] = await findLinkByCode(code);
    console.log("Link: 105", link);
    if (!link) {
      return res.status(400).json({
        error: "Link Not Found",
      });
    }

    await updateClickCount(code);
    res.redirect(link.long_url);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createShortLink,
  getLinks,
  deleteShortLink,
  redirectToOriginalUrl,
  getLinksStats,
};
