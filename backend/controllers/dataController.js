const DataModel = require('../models/dataModel');

class DataController {
  // Existing methods
  async getAllData(req, res) {
    try {
      const monthlyData = await DataModel.getAllMonthlyData();
      const productData = await DataModel.getAllProductData();
      const salesData = await DataModel.getAllSalesData();
      const financialSummary = await DataModel.getFinancialSummary();
      const performanceData = await DataModel.getPerformanceData();
      const tweetStatistics = await DataModel.getTweetStatistics();
      const feedback = await DataModel.getFeedback();
      const graphData = await DataModel.getGraphData();

      res.status(200).json({
        monthlyData: monthlyData.rows,
        productData: productData.rows,
        salesData: salesData.rows,
        financialSummary: financialSummary.rows,
        performanceData: performanceData.rows,
        tweetStatistics: tweetStatistics.rows,
        feedback: feedback.rows,
        graphData: graphData.rows
      });
    } catch (error) {
      console.error('Error getting all data:', error);
      res.status(500).json({ error: error.message });
    }
  }

  // New method for graph data
  async getGraphData(req, res) {
    try {
      const filter = req.query.filter || 'all'; // Default to all if no filter specified
      const graphData = await DataModel.getGraphData(filter);
      
      res.status(200).json({
        graphData: graphData.rows
      });
    } catch (error) {
      console.error('Error getting graph data:', error);
      res.status(500).json({ error: error.message });
    }
  }

  // Add graph data (for testing or admin purposes)
  async addGraphData(req, res) {
    try {
      const { date, visitors, connections, interactions, impressions } = req.body;
      
      if (!date || !visitors || !connections || !interactions || !impressions) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const result = await DataModel.insertGraphData(
        new Date(date),
        visitors,
        connections,
        interactions,
        impressions
      );
      
      res.status(201).json({
        message: 'Graph data added successfully',
        id: result.rows[0].id
      });
    } catch (error) {
      console.error('Error adding graph data:', error);
      res.status(500).json({ error: error.message });
    }
  }

  // New method to get insights
  async getInsights(req, res) {
    try {
      const insights = await DataModel.getInsights();
      res.status(200).json({
        insights: insights.rows
      });
    } catch (error) {
      console.error('Error getting insights:', error);
      res.status(500).json({ error: error.message });
    }
  }

  // New method to add insights
  async addInsight(req, res) {
    try {
      const { founders, investors } = req.body;
      
      if (founders === undefined || investors === undefined) {
        return res.status(400).json({ error: 'Both founders and investors fields are required' });
      }

      const result = await DataModel.insertInsight(founders, investors);
      
      res.status(201).json({
        message: 'Insight added successfully',
        id: result.rows[0].id
      });
    } catch (error) {
      console.error('Error adding insight:', error);
      res.status(500).json({ error: error.message });
    }
  }

  // New controller methods for demographics
  async getDemographics(req, res) {
    try {
      const result = await DataModel.getDemographics();
      res.status(200).json({
        success: true,
        data: result.rows
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async addDemographic(req, res) {
    try {
      const { countryName, percentage } = req.body;
      const result = await DataModel.insertDemographic(countryName, percentage);
      
      res.status(201).json({
        success: true,
        data: result.rows[0]
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // New methods for user experience
  async getUserExperience(req, res) {
    try {
      const { userId } = req.params;
      
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: 'User ID is required'
        });
      }
      
      const result = await DataModel.getExperienceByUserId(userId);
      
      res.status(200).json({
        success: true,
        data: result.rows
      });
    } catch (error) {
      console.error('Error fetching user experience:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async addUserExperience(req, res) {
    try {
      const { userId, companyName, position, startDate, endDate, description } = req.body;
      
      if (!userId || !companyName) {
        return res.status(400).json({
          success: false,
          message: 'User ID and company name are required'
        });
      }
      
      const result = await DataModel.insertExperience(
        userId, 
        companyName, 
        position, 
        startDate, 
        endDate, 
        description
      );
      
      res.status(201).json({
        success: true,
        message: 'Experience added successfully',
        data: {
          id: result.rows[0].id
        }
      });
    } catch (error) {
      console.error('Error adding user experience:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // New methods for companies founded
  async getUserCompanies(req, res) {
    try {
      const { userId } = req.params;
      
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: 'User ID is required'
        });
      }
      
      const result = await DataModel.getCompaniesFoundedByUserId(userId);
      
      res.status(200).json({
        success: true,
        data: result.rows
      });
    } catch (error) {
      console.error('Error fetching user companies:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async addUserCompany(req, res) {
    try {
      const { userId, companyName, foundingDate, industry, description } = req.body;
      
      if (!userId || !companyName) {
        return res.status(400).json({
          success: false,
          message: 'User ID and company name are required'
        });
      }
      
      const result = await DataModel.insertCompanyFounded(
        userId, 
        companyName, 
        foundingDate, 
        industry, 
        description
      );
      
      res.status(201).json({
        success: true,
        message: 'Company added successfully',
        data: {
          id: result.rows[0].id
        }
      });
    } catch (error) {
      console.error('Error adding user company:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new DataController();