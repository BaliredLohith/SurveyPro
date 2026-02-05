const express = require('express');
const { authenticate } = require('../middleware/auth');
const { pool } = require('../config/database');

const router = express.Router();

// Get floors for a building
router.get('/', authenticate, async (req, res) => {
  try {
    const { building_id } = req.query;
    
    let query = 'SELECT * FROM floors';
    let params = [];
    
    if (building_id) {
      query += ' WHERE building_id = ?';
      params.push(building_id);
    }
    
    query += ' ORDER BY floor_number';

    const [floors] = await pool.execute(query, params);

    res.json({
      success: true,
      data: floors
    });
  } catch (error) {
    console.error('Get floors error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get floors'
    });
  }
});

module.exports = router;
