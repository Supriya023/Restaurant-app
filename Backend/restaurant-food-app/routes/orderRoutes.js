const express = require('express');
const router = express.Router();

// Register API
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  res.json({
    message: "User registered successfully",
    data: { name, email, password }
  });
});

// Login API
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  res.json({
    message: "Login successful",
    data: { email, password }
  });
});

module.exports = router;