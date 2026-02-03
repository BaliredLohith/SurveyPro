const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
    getAllSpaces,
    getSpaceById,
    createSpace,
    updateSpace,
    deleteSpace
} = require('../controllers/spaceController');
const { upload, importSpaces, getTemplate } = require('../controllers/csvImportController');

// Get all spaces
router.get('/', authMiddleware, getAllSpaces);

// Get space by ID
router.get('/:id', authMiddleware, getSpaceById);

// Create space
router.post('/', authMiddleware, createSpace);

// Update space
router.put('/:id', authMiddleware, updateSpace);

// Delete space
router.delete('/:id', authMiddleware, deleteSpace);

// Import spaces from CSV
router.post('/import', authMiddleware, upload.single('csv'), importSpaces);

// Get CSV import template
router.get('/import/template', authMiddleware, getTemplate);

module.exports = router;
