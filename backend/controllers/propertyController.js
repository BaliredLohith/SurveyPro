const db = require('../config/db');

// Get all properties
const getAllProperties = (req, res) => {
    const query = 'SELECT * FROM properties ORDER BY created_at DESC';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        res.json(results);
    });
};

// Get property by ID
const getPropertyById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM properties WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json(results[0]);
    });
};

// Create property
const createProperty = (req, res) => {
    const { name, address } = req.body;
    
    if (!name) {
        return res.status(400).json({ message: 'Property name is required' });
    }

    const query = 'INSERT INTO properties (name, address) VALUES (?, ?)';
    db.query(query, [name, address || null], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        res.status(201).json({
            message: 'Property created successfully',
            property: { id: result.insertId, name, address }
        });
    });
};

// Update property
const updateProperty = (req, res) => {
    const { id } = req.params;
    const { name, address } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Property name is required' });
    }

    const query = 'UPDATE properties SET name = ?, address = ? WHERE id = ?';
    db.query(query, [name, address || null, id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json({ message: 'Property updated successfully' });
    });
};

// Delete property
const deleteProperty = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM properties WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json({ message: 'Property deleted successfully' });
    });
};

module.exports = {
    getAllProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty
};
