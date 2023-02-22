const express = require("express");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const router = express.Router();

const dbfunctions = require("../utils/database");
const sendMail = require("../utils/sendemail");

// /users

router.get("/", async (req, res) => {
  await sendMail("aleksandar@rixner.net", "TEST from app", "This is simple test");
  return res.status(231).json({ message: "Email sent" });
});

router.get("/:user_id", (req, res) => {
  const { user_id } = req.params;
  res.send(`user ${user_id} found`);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await dbfunctions.getSingleUser(username);

  //
  let timeObject = new Date();
  timeObject = new Date(timeObject.getTime() + 1000 * 60 * 60);

  if (user == undefined) {
    return res.status(400).json({ message: "Username not exist." });
  }

  try {
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: `Password is wrong for user: ${username}.` });
    }
    //
    const existingUser = { username: username };
    const accessToken = jwt.sign(existingUser, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
    const refreshToken = jwt.sign(existingUser, process.env.REFRESH_TOKEN_SECRET);
    await dbfunctions.updateRefreshToken(refreshToken, user.uid);

    res.status(200).json({ message: "Login success.", first_name: user.first_name, last_name: user.last_name, email: user.email, accessToken: accessToken, refreshToken: refreshToken, expiresIn: timeObject });
    //
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/logout", async (req, res) => {
  const refreshToken = req.body.refreshToken;
  await dbfunctions.clearRefreshToken(refreshToken);
});

// refresh token
router.post("/refresh_token", async (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (refreshToken === undefined) return res.status(400).json({ message: "Bad refresh token." });

  const existingUser = await dbfunctions.getRefreshToken(refreshToken);
  if (existingUser === undefined) {
    return res.status(400).json({ message: "Refresh token not found." });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403);

    let timeObject = new Date();
    timeObject = new Date(timeObject.getTime() + 1000 * 60 * 60);

    const accessToken = jwt.sign({ username: existingUser.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
    const newRefreshToken = jwt.sign({ username: existingUser.username }, process.env.REFRESH_TOKEN_SECRET);
    await dbfunctions.updateRefreshToken(newRefreshToken, existingUser.uid);
    res.json({ accessToken: accessToken, refreshToken: newRefreshToken, expiresIn: timeObject });
  });
});

module.exports = router;
