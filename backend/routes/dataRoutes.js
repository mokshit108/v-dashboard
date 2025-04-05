const express = require('express');
const router = express.Router();
const DataController = require('../controllers/dataController');

// Get all data
router.get('/all', DataController.getAllData);

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

module.exports = router;


module.exports = router;