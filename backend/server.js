const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const dataRoutes = require('./routes/dataRoutes');
const authRoutes = require('./routes/authRoutes');
const DataModel = require('./models/dataModel');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ensure the tables are created on startup
(async () => {
  try {
    await DataModel.createUserTable();
    await DataModel.createGraphDataTable();
    await DataModel.createInsightsTable();
    await DataModel.createDemographicsTable();
    await DataModel.createExperienceTable();
    await DataModel.createCompanyFoundedTable();
    console.log('Tables created or already exist.');    
  } catch (error) {
    console.error('Error creating tables or adding initial data:', error.message);
  }
})();

// Routes
app.use('/api', dataRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});