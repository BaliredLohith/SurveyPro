const db = require('../config/db');

// Get all buildings
const getAllBuildings = (req, res) => {
    const query = `
        SELECT b.*, p.name as property_name 
        FROM buildings b 
        LEFT JOIN properties p ON b.property_id = p.id 
        ORDER BY b.created_at DESC
    `;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        res.json(results);
    });
};

// Get building by ID
const getBuildingById = (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT b.*, p.name as property_name 
        FROM buildings b 
        LEFT JOIN properties p ON b.property_id = p.id 
        WHERE b.id = ?
    `;
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Building not found' });
        }
        res.json(results[0]);
    });
};

// Create building
const createBuilding = (req, res) => {
    const { property_id, name } = req.body;
    
    if (!property_id || !name) {
        return res.status(400).json({ message: 'Property ID and building name are required' });
    }

    const query = 'INSERT INTO buildings (property_id, name) VALUES (?, ?)';
    db.query(query, [property_id, name], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        res.status(201).json({
            message: 'Building created successfully',
            building: { id: result.insertId, property_id, name }
        });
    });
};

// Update building
const updateBuilding = (req, res) => {
    const { id } = req.params;
    const { property_id, name } = req.body;

    if (!property_id || !name) {
        return res.status(400).json({ message: 'Property ID and building name are required' });
    }

    const query = 'UPDATE buildings SET property_id = ?, name = ? WHERE id = ?';
    db.query(query, [property_id, name, id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Building not found' });
        }
        res.json({ message: 'Building updated successfully' });
    });
};

// Delete building
const deleteBuilding = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM buildings WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Building not found' });
        }
        res.json({ message: 'Building deleted successfully' });
    });
};

module.exports = {
    getAllBuildings,
    getBuildingById,
    createBuilding,
    updateBuilding,
    deleteBuilding
};
