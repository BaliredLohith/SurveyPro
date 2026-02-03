const db = require('../config/db');

// Get all floors
const getAllFloors = (req, res) => {
    const query = `
        SELECT f.*, b.name as building_name, p.name as property_name 
        FROM floors f 
        LEFT JOIN buildings b ON f.building_id = b.id 
        LEFT JOIN properties p ON b.property_id = p.id 
        ORDER BY f.created_at DESC
    `;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        res.json(results);
    });
};

// Get floor by ID
const getFloorById = (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT f.*, b.name as building_name, p.name as property_name 
        FROM floors f 
        LEFT JOIN buildings b ON f.building_id = b.id 
        LEFT JOIN properties p ON b.property_id = p.id 
        WHERE f.id = ?
    `;
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Floor not found' });
        }
        res.json(results[0]);
    });
};

// Create floor
const createFloor = (req, res) => {
    const { building_id, name } = req.body;
    
    if (!building_id || !name) {
        return res.status(400).json({ message: 'Building ID and floor name are required' });
    }

    const query = 'INSERT INTO floors (building_id, name) VALUES (?, ?)';
    db.query(query, [building_id, name], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        res.status(201).json({
            message: 'Floor created successfully',
            floor: { id: result.insertId, building_id, name }
        });
    });
};

// Update floor
const updateFloor = (req, res) => {
    const { id } = req.params;
    const { building_id, name } = req.body;

    if (!building_id || !name) {
        return res.status(400).json({ message: 'Building ID and floor name are required' });
    }

    const query = 'UPDATE floors SET building_id = ?, name = ? WHERE id = ?';
    db.query(query, [building_id, name, id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Floor not found' });
        }
        res.json({ message: 'Floor updated successfully' });
    });
};

// Delete floor
const deleteFloor = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM floors WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Floor not found' });
        }
        res.json({ message: 'Floor deleted successfully' });
    });
};

module.exports = {
    getAllFloors,
    getFloorById,
    createFloor,
    updateFloor,
    deleteFloor
};
