const express = require('express');
const router = express.Router();
const { register, login, refreshToken, logout } = require('../controllers/authController');

// Register
router.post('/register', register);

// Login
router.post('/login', login);

// Refresh token
router.post('/refresh', refreshToken);

// Logout
router.post('/logout', logout);

module.exports = router;
