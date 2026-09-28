const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
 
// Register a new admin (run this once to create your login)
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
 
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
 
    const existing = await Admin.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: 'Username already taken' });
    }
 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
 
    const admin = new Admin({ username, password: hashedPassword });
    await admin.save();
 
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
 
// Login an existing admin
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
 
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
 
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
 
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
 
    res.json({ token, username: admin.username });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
 
module.exports = router;
