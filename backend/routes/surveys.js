const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
    getAllSurveys,
    getSurveyById,
    createSurvey,
    updateSurveyStatus,
    submitSurveyResponse,
    getSurveyResponses,
    deleteSurvey
} = require('../controllers/surveyController');

// Get all surveys
router.get('/', authMiddleware, getAllSurveys);

// Get survey by ID
router.get('/:id', authMiddleware, getSurveyById);

// Create survey
router.post('/', authMiddleware, createSurvey);

// Update survey status
router.put('/:id/status', authMiddleware, updateSurveyStatus);

// Submit survey response
router.post('/:survey_id/responses', authMiddleware, submitSurveyResponse);

// Get survey responses
router.get('/:survey_id/responses', authMiddleware, getSurveyResponses);

// Delete survey
router.delete('/:id', authMiddleware, deleteSurvey);

module.exports = router;
