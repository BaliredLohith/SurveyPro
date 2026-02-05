const express = require('express');
const { authenticate } = require('../middleware/auth');
const { pool } = require('../config/database');

const router = express.Router();

// Get dashboard statistics
router.get('/stats', authenticate, async (req, res) => {
  try {
    // Get total counts
    const [propertiesCount] = await pool.execute('SELECT COUNT(*) as total FROM properties WHERE status = "active"');
    const [buildingsCount] = await pool.execute('SELECT COUNT(*) as total FROM buildings WHERE status = "active"');
    const [surveysCount] = await pool.execute('SELECT COUNT(*) as total FROM surveys');
    const [usersCount] = await pool.execute('SELECT COUNT(*) as total FROM users WHERE is_active = TRUE');

    // Get survey status distribution
    const [surveyStatus] = await pool.execute(`
      SELECT status, COUNT(*) as count 
      FROM surveys 
      GROUP BY status
    `);

    // Get recent activities
    const [recentActivities] = await pool.execute(`
      SELECT a.*, u.username, u.first_name, u.last_name
      FROM activities a
      JOIN users u ON a.user_id = u.id
      ORDER BY a.created_at DESC
      LIMIT 10
    `);

    // Get system alerts
    const [systemAlerts] = await pool.execute(`
      SELECT * FROM system_alerts 
      WHERE is_read = FALSE AND (expires_at IS NULL OR expires_at > NOW())
      ORDER BY priority DESC, created_at DESC
      LIMIT 5
    `);

    // Get survey completion trends (last 6 months)
    const [surveyTrends] = await pool.execute(`
      SELECT 
        DATE_FORMAT(created_at, '%Y-%m') as month,
        COUNT(*) as total_surveys,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_surveys
      FROM surveys 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
      GROUP BY DATE_FORMAT(created_at, '%Y-%m')
      ORDER BY month
    `);

    // Get operational overview data
    const [operationalData] = await pool.execute(`
      SELECT 
        COUNT(CASE WHEN fiber_readiness = 'ready' THEN 1 END) as fiber_ready,
        COUNT(CASE WHEN power_availability = 'available' THEN 1 END) as power_available,
        COUNT(CASE WHEN last_survey_date >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END) as recently_surveyed,
        COUNT(CASE WHEN next_survey_date <= DATE_ADD(NOW(), INTERVAL 30 DAY) AND next_survey_date >= NOW() THEN 1 END) as pending_surveys
      FROM buildings
      WHERE status = 'active'
    `);

    res.json({
      success: true,
      data: {
        summary: {
          properties: propertiesCount[0].total,
          buildings: buildingsCount[0].total,
          surveys: surveysCount[0].total,
          users: usersCount[0].total
        },
        surveyStatus: surveyStatus,
        recentActivities: recentActivities,
        systemAlerts: systemAlerts,
        surveyTrends: surveyTrends,
        operationalOverview: operationalData[0] || {
          fiber_ready: 0,
          power_available: 0,
          recently_surveyed: 0,
          pending_surveys: 0
        }
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get dashboard statistics'
    });
  }
});

// Get survey completion trends
router.get('/trends', authenticate, async (req, res) => {
  try {
    const { period = '6months' } = req.query;
    
    let interval = '6 MONTH';
    if (period === '1year') interval = '1 YEAR';
    if (period === '3months') interval = '3 MONTH';

    const [trends] = await pool.execute(`
      SELECT 
        DATE_FORMAT(created_at, '%Y-%m-%d') as date,
        COUNT(*) as total_surveys,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_surveys,
        SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) as in_progress_surveys
      FROM surveys 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL ${interval})
      GROUP BY DATE_FORMAT(created_at, '%Y-%m-%d')
      ORDER BY date
    `);

    res.json({
      success: true,
      data: trends
    });
  } catch (error) {
    console.error('Dashboard trends error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get trends data'
    });
  }
});

// Get recent activities
router.get('/activities', authenticate, async (req, res) => {
  try {
    const { limit = 20 } = req.query;
    
    const [activities] = await pool.execute(`
      SELECT a.*, u.username, u.first_name, u.last_name
      FROM activities a
      JOIN users u ON a.user_id = u.id
      ORDER BY a.created_at DESC
      LIMIT ?
    `, [parseInt(limit)]);

    res.json({
      success: true,
      data: activities
    });
  } catch (error) {
    console.error('Dashboard activities error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get activities'
    });
  }
});

// Get system alerts
router.get('/alerts', authenticate, async (req, res) => {
  try {
    const { limit = 10, unread_only = false } = req.query;
    
    let query = `
      SELECT * FROM system_alerts 
      WHERE (expires_at IS NULL OR expires_at > NOW())
    `;
    
    const params = [];
    
    if (unread_only === 'true') {
      query += ' AND is_read = FALSE';
    }
    
    query += ' ORDER BY priority DESC, created_at DESC LIMIT ?';
    params.push(parseInt(limit));

    const [alerts] = await pool.execute(query, params);

    res.json({
      success: true,
      data: alerts
    });
  } catch (error) {
    console.error('Dashboard alerts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get alerts'
    });
  }
});

// Mark alert as read
router.put('/alerts/:id/read', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    
    await pool.execute(
      'UPDATE system_alerts SET is_read = TRUE WHERE id = ?',
      [id]
    );

    res.json({
      success: true,
      message: 'Alert marked as read'
    });
  } catch (error) {
    console.error('Mark alert read error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark alert as read'
    });
  }
});

module.exports = router;
