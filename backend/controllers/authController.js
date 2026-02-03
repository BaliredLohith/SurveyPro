const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
require('dotenv').config();

// Register user
const register = (req, res) => {
    const { name, email, password, role = 'user' } = req.body;

    // Validate input
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide name, email, and password' });
    }

    // Check if user exists
    const checkUser = 'SELECT * FROM users WHERE email = ?';
    db.query(checkUser, [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert user
        const insertUser = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
        db.query(insertUser, [name, email, hashedPassword, role], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Database error' });
            }

            // Generate JWT
            const token = jwt.sign(
                { id: result.insertId, email, role },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRE }
            );

            res.status(201).json({
                message: 'User registered successfully',
                accessToken: token,
                refreshToken: token, // Using same token for simplicity
                userInfo: { id: result.insertId, name, email, role }
            });
        });
    });
};

// Login user
const login = (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Check user
    const checkUser = 'SELECT * FROM users WHERE email = ?';
    db.query(checkUser, [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const user = results[0];

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );

        res.json({
            message: 'Login successful',
            accessToken: token,
            refreshToken: token, // Using same token for simplicity
            userInfo: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    });
};

// Refresh token
const refreshToken = (req, res) => {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
    }

    try {
        // Verify refresh token (using same JWT for simplicity)
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        
        // Generate new access token
        const newAccessToken = jwt.sign(
            { id: decoded.id, email: decoded.email, role: decoded.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );

        res.json({
            accessToken: newAccessToken
        });
    } catch (error) {
        res.status(401).json({ message: 'Invalid refresh token' });
    }
};

// Logout
const logout = (req, res) => {
    // In a real implementation, you would invalidate the token
    // For now, just return success
    res.json({ message: 'Logout successful' });
};

module.exports = { register, login, refreshToken, logout };
