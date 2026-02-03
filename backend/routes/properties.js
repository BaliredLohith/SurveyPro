const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
    getAllProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty
} = require('../controllers/propertyController');

// Get all properties
router.get('/', authMiddleware, getAllProperties);

// Get property by ID
router.get('/:id', authMiddleware, getPropertyById);

// Create property
router.post('/', authMiddleware, createProperty);

// Update property
router.put('/:id', authMiddleware, updateProperty);

// Delete property
router.delete('/:id', authMiddleware, deleteProperty);

module.exports = router;
