const express = require('express');
const { authenticate } = require('../middleware/auth');
const { pool } = require('../config/database');

const router = express.Router();

// Get spaces for a floor
router.get('/', authenticate, async (req, res) => {
  try {
    const { floor_id } = req.query;
    
    let query = 'SELECT * FROM spaces';
    let params = [];
    
    if (floor_id) {
      query += ' WHERE floor_id = ?';
      params.push(floor_id);
    }
    
    query += ' ORDER BY name';

    const [spaces] = await pool.execute(query, params);

    res.json({
      success: true,
      data: spaces
    });
  } catch (error) {
    console.error('Get spaces error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get spaces'
    });
  }
});

module.exports = router;
