const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const { pool } = require('../config/database');

const router = express.Router();

// Get settings
router.get('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const [settings] = await pool.execute('SELECT * FROM settings ORDER BY key_name');

    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get settings'
    });
  }
});

// Update settings
router.put('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { settings } = req.body;
    
    for (const setting of settings) {
      await pool.execute(`
        INSERT INTO settings (key_name, value, description, type, updated_by)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE value = ?, updated_by = ?
      `, [setting.key_name, setting.value, setting.description, setting.type, req.user.userId, setting.value, req.user.userId]);
    }

    res.json({
      success: true,
      message: 'Settings updated successfully'
    });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update settings'
    });
  }
});

module.exports = router;
