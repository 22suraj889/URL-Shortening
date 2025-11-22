const { pool } = require("./db");

const findLinkByCode = async (code) => {
  const sql = "SELECT * FROM links WHERE short_code=?";
  const result = await pool.query(sql, [code]);
  return result[0];
};

const createLink = async (originalUrl, shortUrl, shortCode) => {
  const sql =
    "INSERT INTO links (short_code, long_url, short_url) VALUES (?, ?, ?)";
  await pool.query(sql, [shortCode, originalUrl, shortUrl]);
};

const getAllLinks = async () => {
  const sql = "SELECT * FROM links ORDER BY created_at DESC";
  const [result] = await pool.query(sql);
  return result;
};

const deleteLink = async (code) => {
  const sql = "DELETE FROM links WHERE short_code=?";
  await pool.query(sql, [code]);
};

const updateClickCount = async (code) => {
  const sql =
    "UPDATE links SET clicks = clicks+1, last_clicked = NOW() WHERE short_code=?";
  await pool.query(sql, [code]);
};

module.exports = {
  findLinkByCode,
  createLink,
  getAllLinks,
  deleteLink,
  updateClickCount,
};
