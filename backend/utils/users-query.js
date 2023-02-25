const db = require("./connection");

const getUsers = async () => {
  const [users] = await db.query("SELECT * FROM users");
  return users;
};

const getSingleUser = async (username, user_id) => {
  const [user] = await db.query("SELECT * FROM users WHERE username=? OR uid=?", [username, user_id]);
  return user[0];
};

const createUser = async (user) => {
  const { first_name, last_name, username, password, email, verifedToken } = user;
  await db.query("INSERT INTO users (first_name, last_name, username, password, email,verified,verifedToken) VALUES (?,?,?,?,?,?,?)", [first_name, last_name, username, password, email, 0, verifedToken]);
};

const conformUser = async (user_id) => {
  await db.query("UPDATE users SET verified = 1, verifedToken='' WHERE uid=?", [user_id]);
};

// tokens
const getRefreshToken = async (refToken) => {
  const [refreshTkn] = await db.query("SELECT * FROM users WHERE refreshToken=?", [refToken]);
  return refreshTkn[0];
};

const updateRefreshToken = async (refToken, user_id) => {
  await db.query("UPDATE users SET refreshToken = ? WHERE uid=?", [refToken, user_id]);
};

const clearRefreshToken = async (refToken) => {
  await db.query("UPDATE users SET refreshToken = NULL WHERE refreshToken=?", [refToken]);
};

module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  conformUser,
  getRefreshToken,
  updateRefreshToken,
  clearRefreshToken,
};
