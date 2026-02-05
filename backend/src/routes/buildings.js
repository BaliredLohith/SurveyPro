const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const { pool } = require('../config/database');

const router = express.Router();

// Get all buildings (with optional property filtering)
router.get('/', authenticate, async (req, res) => {
  try {
    const { page = 1, limit = 10, search, property_id } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT b.*, p.name as property_name, p.location as property_location
      FROM buildings b
      LEFT JOIN properties p ON b.property_id = p.id
    `;
    let params = [];

    // Add WHERE conditions
    const whereConditions = [];
    if (search) {
      whereConditions.push('(b.name LIKE ? OR p.name LIKE ?)');
      params.push(`%${search}%`, `%${search}%`);
    }
    if (property_id) {
      whereConditions.push('b.property_id = ?');
      params.push(property_id);
    }

    if (whereConditions.length > 0) {
      query += ' WHERE ' + whereConditions.join(' AND ');
    }

    query += ' ORDER BY b.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);

    const [buildings] = await pool.execute(query, params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM buildings b LEFT JOIN properties p ON b.property_id = p.id';
    if (whereConditions.length > 0) {
      countQuery += ' WHERE ' + whereConditions.join(' AND ');
    }
    const [countResult] = await pool.execute(countQuery, params.slice(0, -2));

    res.json({
      success: true,
      data: {
        buildings,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: countResult[0].total,
          totalPages: Math.ceil(countResult[0].total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get buildings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get buildings'
    });
  }
});

// Get single building with property details
router.get('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    
    const [buildings] = await pool.execute(`
      SELECT b.*, p.name as property_name, p.location as property_location, p.client_name
      FROM buildings b
      LEFT JOIN properties p ON b.property_id = p.id
      WHERE b.id = ?
    `, [id]);

    if (buildings.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Building not found'
      });
    }

    res.json({
      success: true,
      data: buildings[0]
    });
  } catch (error) {
    console.error('Get building error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get building'
    });
  }
});

// Create new building
router.post('/', authenticate, authorize('Admin', 'Project Manager'), async (req, res) => {
  try {
    const { 
      property_id, 
      name, 
      floors = 1, 
      purpose, 
      status = 'Active' 
    } = req.body;

    if (!property_id || !name || !purpose) {
      return res.status(400).json({
        success: false,
        message: 'Property, name, and purpose are required'
      });
    }

    // Verify property exists
    const [properties] = await pool.execute('SELECT id FROM properties WHERE id = ?', [property_id]);
    if (properties.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Property not found'
      });
    }

    const [result] = await pool.execute(`
      INSERT INTO buildings (property_id, name, floors, purpose, status) 
      VALUES (?, ?, ?, ?, ?)
    `, [property_id, name, floors, purpose, status]);

    res.status(201).json({
      success: true,
      message: 'Building created successfully',
      data: { id: result.insertId }
    });
  } catch (error) {
    console.error('Create building error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create building'
    });
  }
});

// Update building
router.put('/:id', authenticate, authorize('Admin', 'Project Manager'), async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      property_id, 
      name, 
      type, 
      floors, 
      status 
    } = req.body;

    const [result] = await pool.execute(`
      UPDATE buildings 
      SET property_id = ?, name = ?, type = ?, floors = ?, status = ?
      WHERE id = ?
    `, [property_id, name, type, floors, status, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Building not found'
      });
    }

    res.json({
      success: true,
      message: 'Building updated successfully'
    });
  } catch (error) {
    console.error('Update building error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update building'
    });
  }
});

// Delete building
router.delete('/:id', authenticate, authorize('Admin'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const [result] = await pool.execute('DELETE FROM buildings WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Building not found'
      });
    }

    res.json({
      success: true,
      message: 'Building deleted successfully'
    });
  } catch (error) {
    console.error('Delete building error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete building'
    });
  }
});

// Get buildings by property ID
router.get('/property/:propertyId', authenticate, async (req, res) => {
  try {
    const { propertyId } = req.params;
    
    const [buildings] = await pool.execute(`
      SELECT id, name, type, floors, status
      FROM buildings 
      WHERE property_id = ?
      ORDER BY name
    `, [propertyId]);

    res.json({
      success: true,
      data: buildings
    });
  } catch (error) {
    console.error('Get buildings by property error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get buildings'
    });
  }
});

module.exports = router;
