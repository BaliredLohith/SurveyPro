const express = require('express');
const { authenticate, hashPassword, comparePassword } = require('../middleware/auth');
const { pool } = require('../config/database');

const router = express.Router();

// Change password (for first login or password reset)
router.post('/change-password', authenticate, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.userId;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long'
      });
    }

    // Get current user data
    const [users] = await pool.execute(
      'SELECT password, isFirstLogin FROM users WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const user = users[0];

    // If it's not first login, verify current password
    if (!user.isFirstLogin) {
      if (!currentPassword) {
        return res.status(400).json({
          success: false,
          message: 'Current password is required'
        });
      }

      const isCurrentPasswordValid = await comparePassword(currentPassword, user.password);
      if (!isCurrentPasswordValid) {
        return res.status(400).json({
          success: false,
          message: 'Current password is incorrect'
        });
      }
    }

    // Hash new password
    const hashedNewPassword = await hashPassword(newPassword);

    // Update password and set isFirstLogin to false
    await pool.execute(
      'UPDATE users SET password = ?, isFirstLogin = false WHERE id = ?',
      [hashedNewPassword, userId]
    );

    // Log activity
    await pool.execute(
      'INSERT INTO activities (user_id, action, entity_type, entity_id, description) VALUES (?, ?, ?, ?, ?)',
      [userId, 'change_password', 'user', userId, user.isFirstLogin ? 'First login password change' : 'Password changed']
    );

    res.json({
      success: true,
      message: user.isFirstLogin ? 'Password set successfully' : 'Password changed successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to change password'
    });
  }
});

module.exports = router;
