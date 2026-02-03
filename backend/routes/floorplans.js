const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { upload, uploadFloorPlan, getAllFloorPlans, deleteFloorPlan } = require('../controllers/floorplanController');

// Upload floor plan
router.post('/upload', authMiddleware, upload.single('floorplan'), uploadFloorPlan);

// Get all floor plans
router.get('/', authMiddleware, getAllFloorPlans);

// Delete floor plan
router.delete('/:filename', authMiddleware, deleteFloorPlan);

module.exports = router;
