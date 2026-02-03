const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
    getAllFloors,
    getFloorById,
    createFloor,
    updateFloor,
    deleteFloor
} = require('../controllers/floorController');

// Get all floors
router.get('/', authMiddleware, getAllFloors);

// Get floor by ID
router.get('/:id', authMiddleware, getFloorById);

// Create floor
router.post('/', authMiddleware, createFloor);

// Update floor
router.put('/:id', authMiddleware, updateFloor);

// Delete floor
router.delete('/:id', authMiddleware, deleteFloor);

module.exports = router;
