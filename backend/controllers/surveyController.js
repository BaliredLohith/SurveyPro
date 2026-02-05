const db = require('../config/db');

// Get all surveys
const getAllSurveys = (req, res) => {
    try {
        const userRole = req.user?.role;
        const userId = req.user?.id;
        
        console.log('🔍 Fetching surveys for user:', { userId, userRole });
        
        let query;
        let params = [];
        
        if (userRole === 'admin' || userRole === 'project_manager') {
            // Admin and Project Manager can see all surveys
            query = `
                SELECT s.*, 
                       b.name as building_name, p.name as property_name,
                       u.name as assigned_to_name, u.email as assigned_to_email
                FROM surveys s 
                LEFT JOIN buildings b ON s.building_id = b.id 
                LEFT JOIN properties p ON s.property_id = p.id
                LEFT JOIN users u ON s.assigned_to = u.id
                ORDER BY s.created_at DESC
            `;
        } else if (userRole === 'survey_engineer') {
            // Survey Engineer can only see surveys assigned to them
            query = `
                SELECT s.*, 
                       b.name as building_name, p.name as property_name,
                       u.name as assigned_to_name, u.email as assigned_to_email
                FROM surveys s 
                LEFT JOIN buildings b ON s.building_id = b.id 
                LEFT JOIN properties p ON s.property_id = p.id
                LEFT JOIN users u ON s.assigned_to = u.id
                WHERE s.assigned_to = ?
                ORDER BY s.created_at DESC
            `;
            params = [userId];
        } else {
            // Reviewer and Viewer can see all surveys (read-only)
            query = `
                SELECT s.*, 
                       b.name as building_name, p.name as property_name,
                       u.name as assigned_to_name, u.email as assigned_to_email
                FROM surveys s 
                LEFT JOIN buildings b ON s.building_id = b.id 
                LEFT JOIN properties p ON s.property_id = p.id
                LEFT JOIN users u ON s.assigned_to = u.id
                ORDER BY s.created_at DESC
            `;
        }
        
        db.query(query, params, (err, results) => {
            if (err) {
                console.error('❌ Database error in getAllSurveys:', err);
                return res.status(500).json({ 
                    success: false, 
                    message: 'Database error',
                    error: err.message 
                });
            }
            
            console.log(`✅ Successfully fetched ${results.length} surveys for ${userRole}`);
            res.json({ 
                success: true, 
                data: results,
                count: results.length
            });
        });
        
    } catch (error) {
        console.error('❌ Unexpected error in getAllSurveys:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error',
            error: error.message 
        });
    }
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
