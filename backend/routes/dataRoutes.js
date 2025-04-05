const express = require('express');
const router = express.Router();
const DataController = require('../controllers/dataController');

// Get all data
router.get('/all', DataController.getAllData);

// User routes (protected by auth middleware)
// Get graph data with optional filter
router.get('/graph', DataController.getGraphData);

// Add graph data (for testing or admin purposes)
router.post('/graph', DataController.addGraphData);

// Get insights data
router.get('/insights', DataController.getInsights);

// Add insight data
router.post('/insights', DataController.addInsight);

// Demographics routes
router.get('/demographics', DataController.getDemographics);
router.post('/demographics', DataController.addDemographic);

// Experience routes
router.get('/experience/:userId', DataController.getUserExperience);
router.post('/experience', DataController.addUserExperience);

// Company founded routes
router.get('/companies-founded/:userId', DataController.getUserCompanies);
router.post('/companies-founded', DataController.addUserCompany);

module.exports = router;


module.exports = router;