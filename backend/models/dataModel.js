const db = require('../config/database');

class DataModel {

  // Demographics table methods
  async createDemographicsTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS demographics (
        id SERIAL PRIMARY KEY,
        country_name VARCHAR(100) NOT NULL,
        percentage DECIMAL(5,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await db.query(query);
  }

  async insertDemographic(countryName, percentage) {
    const query = `
      INSERT INTO demographics (country_name, percentage)
      VALUES ($1, $2)
      RETURNING id
    `;
    return db.query(query, [countryName, percentage]);
  }

  async getDemographics() {
    const query = 'SELECT * FROM demographics ORDER BY percentage DESC';
    return db.query(query);
  }
  

  // New methods for insights table
  async createInsightsTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS insights (
        id SERIAL PRIMARY KEY,
        founders INTEGER,
        investors DECIMAL(10,5),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await db.query(query);
  }

  async insertInsight(founders, investors) {
    const query = `
      INSERT INTO insights (founders, investors)
      VALUES ($1, $2)
      RETURNING id
    `;
    return db.query(query, [founders, investors]);
  }

  async getInsights() {
    const query = 'SELECT * FROM insights ORDER BY created_at DESC';
    return db.query(query);
  }


  
async createUserTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  await db.query(createTableQuery);
}

async insertUser(username, password) {
  // In a production environment, you should hash the password
  // For this demo, we're storing it as plain text
  const insertQuery = `
    INSERT INTO users (username, password)
    VALUES ($1, $2)
    ON CONFLICT (username) DO NOTHING
    RETURNING id, username, created_at
  `;
  return db.query(insertQuery, [username, password]);
}

async getUserByUsername(username) {
  const query = `
    SELECT * FROM users WHERE username = $1
  `;
  const result = await db.query(query, [username]);
  return result.rows[0];
}

// New methods for experience table
async createExperienceTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS experience (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      company_name VARCHAR(100) NOT NULL,
      position VARCHAR(100),
      start_date DATE,
      end_date DATE,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `;
  await db.query(query);
}

async insertExperience(userId, companyName, position = null, startDate = null, endDate = null, description = null) {
  const query = `
    INSERT INTO experience (user_id, company_name, position, start_date, end_date, description)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id
  `;
  return db.query(query, [userId, companyName, position, startDate, endDate, description]);
}

async getExperienceByUserId(userId) {
  const query = 'SELECT * FROM experience WHERE user_id = $1 ORDER BY start_date DESC';
  return db.query(query, [userId]);
}

// New methods for company_founded table
async createCompanyFoundedTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS company_founded (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      company_name VARCHAR(100) NOT NULL,
      founding_date DATE,
      industry VARCHAR(100),
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `;
  await db.query(query);
}

async insertCompanyFounded(userId, companyName, foundingDate = null, industry = null, description = null) {
  const query = `
    INSERT INTO company_founded (user_id, company_name, founding_date, industry, description)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id
  `;
  return db.query(query, [userId, companyName, foundingDate, industry, description]);
}

async getCompaniesFoundedByUserId(userId) {
  const query = 'SELECT * FROM company_founded WHERE user_id = $1 ORDER BY founding_date DESC';
  return db.query(query, [userId]);
}

// New methods for graph data
async createGraphDataTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS graph_data (
      id SERIAL PRIMARY KEY,
      date TIMESTAMP NOT NULL,
      visitors INTEGER NOT NULL,
      connections INTEGER NOT NULL,
      interactions INTEGER NOT NULL,
      impressions INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  await db.query(query);
}

async insertGraphData(date, visitors, connections, interactions, impressions) {
  const query = `
    INSERT INTO graph_data (date, visitors, connections, interactions, impressions)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id
  `;
  return db.query(query, [date, visitors, connections, interactions, impressions]);
}

// Get graph data with filtering options
async getGraphData(filter) {
  let whereClause = '';
  
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  // Start of current week (Sunday)
  const thisWeekStart = new Date(today);
  thisWeekStart.setDate(today.getDate() - today.getDay());
  
  // Start of last week (Sunday)
  const lastWeekStart = new Date(thisWeekStart);
  lastWeekStart.setDate(lastWeekStart.getDate() - 7);
  
  // End of last week (Saturday)
  const lastWeekEnd = new Date(thisWeekStart);
  lastWeekEnd.setDate(lastWeekEnd.getDate() - 1);
  
  // 7 days ago
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);
  
  // 30 days ago
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);

  switch (filter) {
    case 'today':
      whereClause = `WHERE date >= '${today.toISOString()}'`;
      break;
    case 'yesterday':
      whereClause = `WHERE date >= '${yesterday.toISOString()}' AND date < '${today.toISOString()}'`;
      break;
    case 'this_week':
      whereClause = `WHERE date >= '${thisWeekStart.toISOString()}'`;
      break;
    case 'last_week':
      whereClause = `WHERE date >= '${lastWeekStart.toISOString()}' AND date < '${thisWeekStart.toISOString()}'`;
      break;
    case '7_days':
      whereClause = `WHERE date >= '${sevenDaysAgo.toISOString()}'`;
      break;
    case '30_days':
      whereClause = `WHERE date >= '${thirtyDaysAgo.toISOString()}'`;
      break;
    default:
      // Return all data if no filter specified
      break;
  }

  const query = `
    SELECT * FROM graph_data 
    ${whereClause}
    ORDER BY date ASC
  `;
  return db.query(query);
}
  

}

module.exports = new DataModel();