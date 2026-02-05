const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const { pool } = require('../config/database');

const router = express.Router();

// Get all surveys (with filtering by user role)
router.get('/', authenticate, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, assigned_to } = req.query;
    const offset = (page - 1) * limit;
    const user = req.user;

    let query = `
      SELECT s.*, 
             p.name as property_name, 
             b.name as building_name,
             u.name as assigned_to_name
      FROM surveys s
      LEFT JOIN properties p ON s.property_id = p.id
      LEFT JOIN buildings b ON s.building_id = b.id
      LEFT JOIN users u ON s.assigned_to = u.id
    `;
    let params = [];

    // Add WHERE conditions
    const whereConditions = [];
    
    // If user is survey_engineer, only show their assigned surveys
    if (user.role === 'survey_engineer') {
      whereConditions.push('s.assigned_to = ?');
      params.push(user.userId);
    }
    
    if (status) {
      whereConditions.push('s.status = ?');
      params.push(status);
    }
    
    if (assigned_to) {
      whereConditions.push('s.assigned_to = ?');
      params.push(assigned_to);
    }

    if (whereConditions.length > 0) {
      query += ' WHERE ' + whereConditions.join(' AND ');
    }

    query += ' ORDER BY s.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);

    const [surveys] = await pool.execute(query, params);

    // Get total count
    let countQuery = `
      SELECT COUNT(*) as total 
      FROM surveys s
      LEFT JOIN properties p ON s.property_id = p.id
      LEFT JOIN buildings b ON s.building_id = b.id
      LEFT JOIN users u ON s.assigned_to = u.id
    `;
    
    const countConditions = [];
    const countParams = [];
    
    if (user.role === 'survey_engineer') {
      countConditions.push('s.assigned_to = ?');
      countParams.push(user.userId);
    }
    
    if (status) {
      countConditions.push('s.status = ?');
      countParams.push(status);
    }
    
    if (assigned_to) {
      countConditions.push('s.assigned_to = ?');
      countParams.push(assigned_to);
    }
    
    if (countConditions.length > 0) {
      countQuery += ' WHERE ' + countConditions.join(' AND ');
    }
    
    const [countResult] = await pool.execute(countQuery, countParams);

    res.json({
      success: true,
      data: {
        surveys,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: countResult[0].total,
          totalPages: Math.ceil(countResult[0].total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get surveys error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get surveys'
    });
  }
});

// Create new survey (admin only)
router.post('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { 
      property_id, 
      building_id, 
      assigned_to, 
      survey_type, 
      due_date, 
      priority = 'Medium' 
    } = req.body;

    if (!property_id || !building_id || !assigned_to || !survey_type || !due_date) {
      return res.status(400).json({
        success: false,
        message: 'Property, building, assigned engineer, survey type, and due date are required'
      });
    }

    // Verify property and building exist
    const [properties] = await pool.execute('SELECT id FROM properties WHERE id = ?', [property_id]);
    if (properties.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Property not found'
      });
    }

    const [buildings] = await pool.execute('SELECT id FROM buildings WHERE id = ? AND property_id = ?', [building_id, property_id]);
    if (buildings.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Building not found or does not belong to this property'
      });
    }

    // Verify assigned user exists and is a survey engineer
    const [users] = await pool.execute('SELECT id FROM users WHERE id = ? AND role = ?', [assigned_to, 'survey_engineer']);
    if (users.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Assigned engineer not found or is not a survey engineer'
      });
    }

    const [result] = await pool.execute(`
      INSERT INTO surveys (property_id, building_id, assigned_to, survey_type, due_date, priority, status) 
      VALUES (?, ?, ?, ?, ?, ?, 'Pending')
    `, [property_id, building_id, assigned_to, survey_type, due_date, priority]);

    res.status(201).json({
      success: true,
      message: 'Survey created successfully',
      data: { id: result.insertId }
    });
  } catch (error) {
    console.error('Create survey error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create survey'
    });
  }
});

// Update survey status
router.put('/:id/status', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const user = req.user;

    if (!['Pending', 'In Progress', 'Completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    // Check if user owns this survey (if survey_engineer) or is admin
    let query = 'SELECT * FROM surveys WHERE id = ?';
    let params = [id];
    
    if (user.role === 'survey_engineer') {
      query += ' AND assigned_to = ?';
      params.push(user.userId);
    }

    const [surveys] = await pool.execute(query, params);

    if (surveys.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Survey not found or access denied'
      });
    }

    const [result] = await pool.execute(`
      UPDATE surveys SET status = ? WHERE id = ?
    `, [status, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Survey not found'
      });
    }

    res.json({
      success: true,
      message: 'Survey status updated successfully'
    });
  } catch (error) {
    console.error('Update survey status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update survey status'
    });
  }
});

// Get single survey
router.get('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    
    let query = `
      SELECT s.*, 
             p.name as property_name, 
             p.address as property_address,
             p.city as property_city,
             p.state as property_state,
             b.name as building_name,
             b.floors,
             b.purpose,
             u.name as assigned_to_name,
             u.email as assigned_to_email
      FROM surveys s
      LEFT JOIN properties p ON s.property_id = p.id
      LEFT JOIN buildings b ON s.building_id = b.id
      LEFT JOIN users u ON s.assigned_to = u.id
      WHERE s.id = ?
    `;
    
    let params = [id];
    
    // If user is survey_engineer, only show their assigned surveys
    if (user.role === 'survey_engineer') {
      query += ' AND s.assigned_to = ?';
      params.push(user.userId);
    }
    
    const [surveys] = await pool.execute(query, params);

    if (surveys.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Survey not found or access denied'
      });
    }

    res.json({
      success: true,
      data: surveys[0]
    });
  } catch (error) {
    console.error('Get survey error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get survey'
    });
  }
});

module.exports = router;
