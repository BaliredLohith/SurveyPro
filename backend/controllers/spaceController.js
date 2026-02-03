const db = require('../config/db');

// Get all spaces
const getAllSpaces = (req, res) => {
    const query = `
        SELECT s.*, f.name as floor_name, b.name as building_name, p.name as property_name 
        FROM spaces s 
        LEFT JOIN floors f ON s.floor_id = f.id 
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

// Get space by ID
const getSpaceById = (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT s.*, f.name as floor_name, b.name as building_name, p.name as property_name 
        FROM spaces s 
        LEFT JOIN floors f ON s.floor_id = f.id 
        LEFT JOIN buildings b ON f.building_id = b.id 
        LEFT JOIN properties p ON b.property_id = p.id 
        WHERE s.id = ?
    `;
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Space not found' });
        }
        res.json(results[0]);
    });
};

// Create space
const createSpace = (req, res) => {
    const { floor_id, name, type, area } = req.body;
    
    if (!floor_id || !name) {
        return res.status(400).json({ message: 'Floor ID and space name are required' });
    }

    const query = 'INSERT INTO spaces (floor_id, name, type, area) VALUES (?, ?, ?, ?)';
    db.query(query, [floor_id, name, type || null, area || null], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        res.status(201).json({
            message: 'Space created successfully',
            space: { id: result.insertId, floor_id, name, type, area }
        });
    });
};

// Update space
const updateSpace = (req, res) => {
    const { id } = req.params;
    const { floor_id, name, type, area } = req.body;

    if (!floor_id || !name) {
        return res.status(400).json({ message: 'Floor ID and space name are required' });
    }

    const query = 'UPDATE spaces SET floor_id = ?, name = ?, type = ?, area = ? WHERE id = ?';
    db.query(query, [floor_id, name, type || null, area || null, id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Space not found' });
        }
        res.json({ message: 'Space updated successfully' });
    });
};

// Delete space
const deleteSpace = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM spaces WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Space not found' });
        }
        res.json({ message: 'Space deleted successfully' });
    });
};

module.exports = {
    getAllSpaces,
    getSpaceById,
    createSpace,
    updateSpace,
    deleteSpace
};
