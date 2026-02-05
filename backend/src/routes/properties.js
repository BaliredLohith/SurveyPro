const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const { pool } = require('../config/database');

const router = express.Router();

// Admin-only route to get all properties
router.get('/admin', authenticate, authorize('admin'), async (req, res) => {
  try {
    console.log('🏢 Admin GET properties - User:', req.user);
    
    const [properties] = await pool.execute(`
      SELECT p.*, COUNT(b.id) as buildings_count
      FROM properties p
      LEFT JOIN buildings b ON p.id = b.property_id
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `);

    console.log('🏢 Admin GET properties - Found:', properties.length, 'properties');

    res.json({
      success: true,
      data: {
        properties: properties
      }
    });
  } catch (error) {
    console.error('🏢 Admin GET properties error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get properties'
    });
  }
});

// Get all properties (simple version for frontend)
router.get('/', authenticate, async (req, res) => {
  try {
    console.log('🏢 GET properties - User:', req.user);
    
    const [properties] = await pool.execute(`
      SELECT 
        id,
        name,
        address,
        type as property_type,
        city,
        state,
        owner,
        created_at,
        0 AS buildings,
        0 AS floors,
        0 AS spaces,
        0 AS surveys
      FROM properties
      ORDER BY created_at DESC
    `);

    console.log('🏢 GET properties - Found:', properties.length, 'properties');

    // Return simple array (not nested in data object)
    res.json(properties);
  } catch (error) {
    console.error('🏢 GET properties error:', error);
    res.status(500).json({ message: 'Failed to get properties' });
  }
});

// Get property by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    const [properties] = await pool.execute(`
      SELECT p.*, u.username as created_by_name
      FROM properties p
      LEFT JOIN users u ON p.created_by = u.id
      WHERE p.id = ?
    `, [id]);

    if (properties.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    const property = properties[0];

    // Get buildings for this property
    const [buildings] = await pool.execute(`
      SELECT b.*, 
             COUNT(f.id) as floors_count,
             COUNT(s.id) as surveys_count
      FROM buildings b
      LEFT JOIN floors f ON b.id = f.building_id
      LEFT JOIN surveys s ON b.id = s.building_id
      WHERE b.property_id = ?
      GROUP BY b.id
      ORDER BY b.name
    `, [id]);

    property.buildings = buildings;

    res.json({
      success: true,
      data: property
    });
  } catch (error) {
    console.error('Get property error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get property'
    });
  }
});

// Create new property (simple version for frontend)
router.post('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    console.log('🏢 POST create property - User:', req.user);
    console.log('🏢 POST create property - Data:', req.body);
    
    const { name, address, type, city, state, owner } = req.body;

    if (!name || !address || !type) {
      return res.status(400).json({ message: 'Missing required fields: name, address, type' });
    }

    // Insert property
    const [result] = await pool.execute(`
      INSERT INTO properties (name, address, type, city, state, owner, created_at)
      VALUES (?, ?, ?, ?, ?, ?, NOW())
    `, [name, address, type, city || '', state || '', owner || '']);

    // Get the newly created property
    const [newProperty] = await pool.execute(`
      SELECT 
        id,
        name,
        address,
        type as property_type,
        city,
        state,
        owner,
        created_at,
        0 AS buildings,
        0 AS floors,
        0 AS spaces,
        0 AS surveys
      FROM properties 
      WHERE id = ?
    `, [result.insertId]);

    console.log('🏢 POST create property - Created:', newProperty[0]);

    // Return the created property (not nested in data object)
    res.status(201).json(newProperty[0]);
  } catch (error) {
    console.error('🏢 POST create property error:', error);
    res.status(500).json({ message: 'Failed to create property' });
  }
});

// Update property
router.put('/:id', authenticate, authorize('admin', 'manager'), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, type, address, city, state, postal_code, country,
      total_area, description, latitude, longitude, owner_name, owner_contact, status
    } = req.body;

    // Check if property exists
    const [properties] = await pool.execute('SELECT * FROM properties WHERE id = ?', [id]);
    if (properties.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    await pool.execute(`
      UPDATE properties SET
        name = ?, type = ?, address = ?, city = ?, state = ?, postal_code = ?, country = ?,
        total_area = ?, description = ?, latitude = ?, longitude = ?, owner_name = ?, owner_contact = ?, status = ?
      WHERE id = ?
    `, [
      name, type, address, city, state, postal_code, country,
      total_area, description, latitude, longitude, owner_name, owner_contact, status, id
    ]);

    // Log activity
    await pool.execute(
      'INSERT INTO activities (user_id, action, entity_type, entity_id, description) VALUES (?, ?, ?, ?, ?)',
      [req.user.userId, 'update', 'property', id, `Updated property: ${name}`]
    );

    res.json({
      success: true,
      message: 'Property updated successfully'
    });
  } catch (error) {
    console.error('Update property error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update property'
    });
  }
});

// Delete property
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;

    // Check if property exists
    const [properties] = await pool.execute('SELECT name FROM properties WHERE id = ?', [id]);
    if (properties.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    await pool.execute('DELETE FROM properties WHERE id = ?', [id]);

    // Log activity
    await pool.execute(
      'INSERT INTO activities (user_id, action, entity_type, entity_id, description) VALUES (?, ?, ?, ?, ?)',
      [req.user.userId, 'delete', 'property', id, `Deleted property: ${properties[0].name}`]
    );

    res.json({
      success: true,
      message: 'Property deleted successfully'
    });
  } catch (error) {
    console.error('Delete property error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete property'
    });
  }
});

// Get property statistics
router.get('/stats/overview', authenticate, async (req, res) => {
  try {
    const [stats] = await pool.execute(`
      SELECT 
        COUNT(*) as total_properties,
        COUNT(CASE WHEN type = 'commercial' THEN 1 END) as commercial,
        COUNT(CASE WHEN type = 'residential' THEN 1 END) as residential,
        COUNT(CASE WHEN type = 'industrial' THEN 1 END) as industrial,
        COUNT(CASE WHEN type = 'mixed' THEN 1 END) as mixed,
        COUNT(CASE WHEN status = 'active' THEN 1 END) as active,
        SUM(total_area) as total_area
      FROM properties
    `);

    res.json({
      success: true,
      data: stats[0]
    });
  } catch (error) {
    console.error('Property stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get property statistics'
    });
  }
});

module.exports = router;
