const DataModel = require('../models/dataModel');

const seedData = async () => {

  const generateDates = (days) => {
    const dates = [];
    const today = new Date();
    
    for (let i = days; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(date);
    }
    
    return dates;
  };

  const generateGraphData = () => {
    const dates = generateDates(30);
    const graphData = [];
    
    // Base values for each metric
    let baseVisitors = 1000;
    let baseConnections = 750;
    let baseInteractions = 500;
    let baseImpressions = 2000;
    
    // Growth factor for natural-looking increases
    const growthFactor = 1.02;
    
    // Randomization factor to add variation
    const randomFactor = () => 0.9 + Math.random() * 0.2; // Between 0.9 and 1.1
    
    dates.forEach((date, index) => {
      // Apply growth and randomization
      baseVisitors *= growthFactor * randomFactor();
      baseConnections *= growthFactor * randomFactor();
      baseInteractions *= growthFactor * randomFactor();
      baseImpressions *= growthFactor * randomFactor();
      
      // Add weekend effect (reduce values on weekends)
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const weekendFactor = isWeekend ? 0.7 : 1;
      
      graphData.push({
        date,
        visitors: Math.round(baseVisitors * weekendFactor),
        connections: Math.round(baseConnections * weekendFactor),
        interactions: Math.round(baseInteractions * weekendFactor),
        impressions: Math.round(baseImpressions * weekendFactor)
      });
    });
    return graphData;
  };

  try {
    console.log('Creating tables if not exist...');
    await DataModel.createGraphDataTable();
    await DataModel.createInsightsTable();
    await DataModel.createDemographicsTable();

    console.log('Inserting graph data...');
    const graphData = generateGraphData();
    for (const item of graphData) {
      await DataModel.insertGraphData(
        item.date,
        item.visitors,
        item.connections,
        item.interactions,
        item.impressions
      );
    }

    console.log('Creating user table...');
    await DataModel.createUserTable();

    // After inserting other data:
    console.log('Inserting user data...');
    await DataModel.insertUser('trial', 'assignment123');

    // Insert insights data with the specified values
    console.log('Inserting insights data...');
    await DataModel.insertInsight(74000, 6.09000);

    // Insert demographics data
    console.log('Inserting demographics data...');
    await DataModel.insertDemographic('India', 40.00);
    await DataModel.insertDemographic('USA', 25.00);
    await DataModel.insertDemographic('CANADA', 10.00);
    await DataModel.insertDemographic('UAE', 7.00);

    console.log('✅ Data inserted successfully!');
    process.exit(); // Exit after execution
  } catch (error) {
    console.error('❌ Error seeding data:', error.message);
    process.exit(1); // Exit with failure code
  }
};

// Run the seed function
seedData();

