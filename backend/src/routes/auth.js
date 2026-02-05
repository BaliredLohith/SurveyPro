const express = require('express');
const { login, getProfile, logout, authenticate } = require('../middleware/auth');

const router = express.Router();

// Login route
router.post('/login', login);

// Get current user profile (protected)
router.get('/profile', authenticate, getProfile);

// Logout route (protected)
router.post('/logout', authenticate, logout);

module.exports = router;
