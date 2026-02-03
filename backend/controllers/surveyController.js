const db = require('../config/db');

// Get all surveys
const getAllSurveys = (req, res) => {
    const query = `
        SELECT s.*, sp.name as space_name, sp.type as space_type, 
               f.name as floor_name, b.name as building_name, p.name as property_name 
        FROM surveys s 
        LEFT JOIN spaces sp ON s.space_id = sp.id 
        LEFT JOIN floors f ON sp.floor_id = f.id 
        LEFT JOIN buildings b ON f.building_id = b.id 
        LEFT JOIN properties p ON b.property_id = p.id 
        ORDER BY s.created_at DESC
    `;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        res.json(results);
    });
};

// Get survey by ID
const getSurveyById = (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT s.*, sp.name as space_name, sp.type as space_type, 
               f.name as floor_name, b.name as building_name, p.name as property_name 
        FROM surveys s 
        LEFT JOIN spaces sp ON s.space_id = sp.id 
        LEFT JOIN floors f ON sp.floor_id = f.id 
        LEFT JOIN buildings b ON f.building_id = b.id 
        LEFT JOIN properties p ON b.property_id = p.id 
        WHERE s.id = ?
    `;
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Survey not found' });
        }
        res.json(results[0]);
    });
};

// Create survey
const createSurvey = (req, res) => {
    const { space_id, title } = req.body;
    
    if (!space_id || !title) {
        return res.status(400).json({ message: 'Space ID and title are required' });
    }

    const query = 'INSERT INTO surveys (space_id, title) VALUES (?, ?)';
    db.query(query, [space_id, title], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        res.status(201).json({
            message: 'Survey created successfully',
            survey: { id: result.insertId, space_id, title, status: 'pending' }
        });
    });
};

// Update survey status
const updateSurveyStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status || !['pending', 'in_progress', 'completed'].includes(status)) {
        return res.status(400).json({ message: 'Valid status is required (pending, in_progress, completed)' });
    }

    const query = 'UPDATE surveys SET status = ? WHERE id = ?';
    db.query(query, [status, id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Survey not found' });
        }
        res.json({ message: 'Survey status updated successfully' });
    });
};

// Submit survey response
const submitSurveyResponse = (req, res) => {
    const { survey_id } = req.params;
    const { question, answer } = req.body;
    
    if (!question || !answer) {
        return res.status(400).json({ message: 'Question and answer are required' });
    }

    const query = 'INSERT INTO survey_responses (survey_id, question, answer) VALUES (?, ?, ?)';
    db.query(query, [survey_id, question, answer], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        res.status(201).json({
            message: 'Survey response submitted successfully',
            response: { id: result.insertId, survey_id, question, answer }
        });
    });
};

// Get survey responses
const getSurveyResponses = (req, res) => {
    const { survey_id } = req.params;
    const query = 'SELECT * FROM survey_responses WHERE survey_id = ? ORDER BY created_at ASC';
    db.query(query, [survey_id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        res.json(results);
    });
};

// Delete survey
const deleteSurvey = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM surveys WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Survey not found' });
        }
        res.json({ message: 'Survey deleted successfully' });
    });
};

module.exports = {
    getAllSurveys,
    getSurveyById,
    createSurvey,
    updateSurveyStatus,
    submitSurveyResponse,
    getSurveyResponses,
    deleteSurvey
};
