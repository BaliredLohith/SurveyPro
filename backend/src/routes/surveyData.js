const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const { pool } = require('../config/database');

const router = express.Router();

// Submit survey data (engineer only)
router.post('/', authenticate, authorize('survey_engineer'), async (req, res) => {
  try {
    const { 
      survey_id, 
      gps_location, 
      signal_strength, 
      cable_distance, 
      obstacles, 
      fiber_feasible, 
      photos, 
      notes 
    } = req.body;

    if (!survey_id) {
      return res.status(400).json({
        success: false,
        message: 'Survey ID is required'
      });
    }

    // Verify survey exists and is assigned to this engineer
    const [surveys] = await pool.execute(
      'SELECT id FROM surveys WHERE id = ? AND assigned_to = ?',
      [survey_id, req.user.userId]
    );

    if (surveys.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Survey not found or access denied'
      });
    }

    // Check if survey data already exists for this survey
    const [existingData] = await pool.execute(
      'SELECT id FROM survey_data WHERE survey_id = ?',
      [survey_id]
    );

    if (existingData.length > 0) {
      // Update existing survey data
      await pool.execute(`
        UPDATE survey_data 
        SET gps_location = ?, signal_strength = ?, cable_distance = ?, 
            obstacles = ?, fiber_feasible = ?, photos = ?, notes = ?
        WHERE survey_id = ?
      `, [gps_location, signal_strength, cable_distance, obstacles, fiber_feasible, photos, notes, survey_id]);
    } else {
      // Insert new survey data
      await pool.execute(`
        INSERT INTO survey_data (survey_id, gps_location, signal_strength, cable_distance, obstacles, fiber_feasible, photos, notes) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [survey_id, gps_location, signal_strength, cable_distance, obstacles, fiber_feasible, photos, notes]);
    }

    // Update survey status to Completed
    await pool.execute(
      'UPDATE surveys SET status = ? WHERE id = ?',
      ['Completed', survey_id]
    );

    res.status(201).json({
      success: true,
      message: 'Survey data submitted successfully'
    });
  } catch (error) {
    console.error('Submit survey data error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit survey data'
    });
  }
});

// Get survey data for a specific survey
router.get('/:surveyId', authenticate, async (req, res) => {
  try {
    const { surveyId } = req.params;
    const user = req.user;

    // Verify survey exists and user has access
    let surveyQuery = 'SELECT * FROM surveys WHERE id = ?';
    let surveyParams = [surveyId];
    
    if (user.role === 'survey_engineer') {
      surveyQuery += ' AND assigned_to = ?';
      surveyParams.push(user.userId);
    }

    const [surveys] = await pool.execute(surveyQuery, surveyParams);

    if (surveys.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Survey not found or access denied'
      });
    }

    // Get survey data
    const [surveyData] = await pool.execute(
      'SELECT * FROM survey_data WHERE survey_id = ?',
      [surveyId]
    );

    res.json({
      success: true,
      data: surveyData.length > 0 ? surveyData[0] : null
    });
  } catch (error) {
    console.error('Get survey data error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get survey data'
    });
  }
});

// Update survey data (engineer only)
router.put('/:surveyId', authenticate, authorize('survey_engineer'), async (req, res) => {
  try {
    const { surveyId } = req.params;
    const { 
      gps_location, 
      signal_strength, 
      cable_distance, 
      obstacles, 
      fiber_feasible, 
      photos, 
      notes 
    } = req.body;

    // Verify survey exists and is assigned to this engineer
    const [surveys] = await pool.execute(
      'SELECT id FROM surveys WHERE id = ? AND assigned_to = ?',
      [surveyId, req.user.userId]
    );

    if (surveys.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Survey not found or access denied'
      });
    }

    // Update survey data
    const [result] = await pool.execute(`
      UPDATE survey_data 
      SET gps_location = ?, signal_strength = ?, cable_distance = ?, 
          obstacles = ?, fiber_feasible = ?, photos = ?, notes = ?
      WHERE survey_id = ?
    `, [gps_location, signal_strength, cable_distance, obstacles, fiber_feasible, photos, notes, surveyId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Survey data not found'
      });
    }

    res.json({
      success: true,
      message: 'Survey data updated successfully'
    });
  } catch (error) {
    console.error('Update survey data error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update survey data'
    });
  }
});

module.exports = router;
