const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  })
  .promise();

const getUsers = async () => {
  const [users] = await pool.query("SELECT * FROM users");
  return users;
};

const getSingleUser = async (username) => {
  const [user] = await pool.query("SELECT * FROM users WHERE username=?", [username]);
  return user[0];
};

const getRefreshToken = async (refToken) => {
  const [refreshTkn] = await pool.query("SELECT * FROM users WHERE refreshToken=?", [refToken]);
  return refreshTkn[0];
};

const updateRefreshToken = async (refToken, user_id) => {
  await pool.query("UPDATE users SET refreshToken = ? WHERE uid=?", [refToken, user_id]);
};

const clearRefreshToken = async (refToken) => {
  await pool.query("UPDATE users SET refreshToken = '' WHERE refreshToken=?", [refToken]);
};

module.exports = {
  getUsers,
  getSingleUser,
  updateRefreshToken,
  clearRefreshToken,
  getRefreshToken,
};
