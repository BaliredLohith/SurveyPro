const express = require('express');
const { authenticate, authorize, hashPassword } = require('../middleware/auth');
const { pool } = require('../config/database');
const { generateSecurePassword, validateEmail, validateRole } = require('../utils/passwordGenerator');

const router = express.Router();

// Get all users (admin only)
router.get('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { role } = req.query;
    let query = 'SELECT id, name, email, role, status, isFirstLogin, created_at FROM users';
    let params = [];

    if (role) {
      query += ' WHERE role = ?';
      params.push(role);
    }

    query += ' ORDER BY created_at DESC';

    const [users] = await pool.execute(query, params);

    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get users'
    });
  }
});

// Create new user with system-generated password (admin only)
router.post('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { 
      name, 
      email, 
      role,
      status = 'Active'
    } = req.body;

    // Validate required fields
    if (!name || !email || !role) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and role are required'
      });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Validate role
    if (!validateRole(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Must be one of: admin, project_manager, survey_engineer, reviewer, viewer'
      });
    }

    // Validate status
    if (!['Active', 'Suspended'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be Active or Suspended'
      });
    }

    // Check if email already exists
    const [existingUsers] = await pool.execute('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    // Generate secure password
    const temporaryPassword = generateSecurePassword(10);
    
    // Hash password
    const hashedPassword = await hashPassword(temporaryPassword);

    // Insert new user
    const [result] = await pool.execute(`
      INSERT INTO users (name, email, password, role, status, isFirstLogin) 
      VALUES (?, ?, ?, ?, ?, ?)
    `, [name, email, hashedPassword, role, status, true]);

    // Log activity
    await pool.execute(
      'INSERT INTO activities (user_id, action, entity_type, entity_id, description) VALUES (?, ?, ?, ?, ?)',
      [req.user.userId, 'create_user', 'user', result.insertId, `Created user: ${name} (${email}) with role: ${role}`]
    );

    // Return user details (excluding password) and the temporary password
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        id: result.insertId,
        name,
        email,
        role,
        status,
        isFirstLogin: true,
        temporaryPassword // Include temporary password for admin to share with user
      }
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create user'
    });
  }
});

// Get single user
router.get('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    
    const [users] = await pool.execute(`
      SELECT id, name, email, role, status, isFirstLogin, created_at 
      FROM users 
      WHERE id = ?
    `, [id]);

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: users[0]
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user'
    });
  }
});

// Update user (admin only)
router.put('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;

    // Validate email format if provided
    if (email && !validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Validate role if provided
    if (role && !validateRole(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Must be one of: admin, project_manager, survey_engineer, reviewer, viewer'
      });
    }

    // Check if email already exists (if updating email)
    if (email) {
      const [existingUsers] = await pool.execute('SELECT id FROM users WHERE email = ? AND id != ?', [email, id]);
      if (existingUsers.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Email already exists'
        });
      }
    }

    const [result] = await pool.execute(`
      UPDATE users 
      SET name = COALESCE(?, name), 
          email = COALESCE(?, email), 
          role = COALESCE(?, role)
      WHERE id = ?
    `, [name, email, role, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Log activity
    await pool.execute(
      'INSERT INTO activities (user_id, action, entity_type, entity_id, description) VALUES (?, ?, ?, ?, ?)',
      [req.user.userId, 'update_user', 'user', id, `Updated user ID: ${id}`]
    );

    res.json({
      success: true,
      message: 'User updated successfully'
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user'
    });
  }
});

// Update user status (admin only)
router.patch('/:id/status', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Active', 'Suspended'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be Active or Suspended'
      });
    }

    const [result] = await pool.execute(`
      UPDATE users 
      SET status = ?
      WHERE id = ?
    `, [status, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Log activity
    await pool.execute(
      'INSERT INTO activities (user_id, action, entity_type, entity_id, description) VALUES (?, ?, ?, ?, ?)',
      [req.user.userId, 'update_user_status', 'user', id, `Updated user status to: ${status}`]
    );

    res.json({
      success: true,
      message: 'User status updated successfully'
    });
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user status'
    });
  }
});

// Reset user password (admin only) - generates new temporary password
router.post('/:id/reset-password', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const [users] = await pool.execute('SELECT name, email FROM users WHERE id = ?', [id]);
    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const user = users[0];

    // Generate new secure password
    const temporaryPassword = generateSecurePassword(10);
    
    // Hash password
    const hashedPassword = await hashPassword(temporaryPassword);

    // Update password and set isFirstLogin to true
    await pool.execute(`
      UPDATE users 
      SET password = ?, isFirstLogin = true
      WHERE id = ?
    `, [hashedPassword, id]);

    // Log activity
    await pool.execute(
      'INSERT INTO activities (user_id, action, entity_type, entity_id, description) VALUES (?, ?, ?, ?, ?)',
      [req.user.userId, 'reset_password', 'user', id, `Reset password for user: ${user.name} (${user.email})`]
    );

    res.json({
      success: true,
      message: 'Password reset successfully',
      data: {
        temporaryPassword // Include temporary password for admin to share with user
      }
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reset password'
    });
  }
});

// Delete user (admin only) - soft delete by setting status to Suspended
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if user exists
    const [users] = await pool.execute('SELECT name, email, role FROM users WHERE id = ?', [id]);
    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const user = users[0];

    // Prevent deletion of admin users
    if (user.role === 'admin') {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete admin users'
      });
    }

    // Soft delete by setting status to Suspended
    const [result] = await pool.execute(`
      UPDATE users 
      SET status = 'Suspended'
      WHERE id = ?
    `, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Log activity
    await pool.execute(
      'INSERT INTO activities (user_id, action, entity_type, entity_id, description) VALUES (?, ?, ?, ?, ?)',
      [req.user.userId, 'delete_user', 'user', id, `Suspended user: ${user.name} (${user.email})`]
    );

    res.json({
      success: true,
      message: 'User suspended successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to suspend user'
    });
  }
});

// Get engineers only (admin only)
router.get('/engineers', authenticate, authorize('admin'), async (req, res) => {
  try {
    const [engineers] = await pool.execute(`
      SELECT id, name, email, status, isFirstLogin, created_at 
      FROM users 
      WHERE role = 'survey_engineer' 
      ORDER BY name
    `);

    res.json({
      success: true,
      data: engineers
    });
  } catch (error) {
    console.error('Get engineers error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get engineers'
    });
  }
});

module.exports = router;
