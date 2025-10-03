const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../database');

// REGISTER STUDENT
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.json({ success: false, message: "All fields are required." });

  try {
    const hash = await bcrypt.hash(password, 10);
    const [existing] = await db.query("SELECT * FROM users WHERE username=? OR email=?", [username, email]);
    if (existing.length) return res.json({ success: false, message: "Username or email already exists." });

    await db.query("INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, 'student')", [username, email, hash]);
    return res.json({ success: true, message: "Registration successful." });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) return res.json({ success: false, message: "All fields are required." });

  try {
    const [user] = await db.query("SELECT * FROM users WHERE username=? AND role=?", [username, role]);
    if (!user.length) return res.json({ success: false, message: "Invalid username or role." });

    const match = await bcrypt.compare(password, user[0].password);
    if (!match) return res.json({ success: false, message: "Invalid password." });

    return res.json({ success: true, user: { id: user[0].id, role: user[0].role } });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
});

module.exports = router;
