const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
    getAllBuildings,
    getBuildingById,
    createBuilding,
    updateBuilding,
    deleteBuilding
} = require('../controllers/buildingController');

// Get all buildings
router.get('/', authMiddleware, getAllBuildings);

// Get building by ID
router.get('/:id', authMiddleware, getBuildingById);

// Create building
router.post('/', authMiddleware, createBuilding);

// Update building
router.put('/:id', authMiddleware, updateBuilding);

// Delete building
router.delete('/:id', authMiddleware, deleteBuilding);

module.exports = router;
