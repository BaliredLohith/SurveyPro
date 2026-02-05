const { pool } = require('../src/config/database');

const updateISPDatabaseSchema = async () => {
  try {
    console.log('🔄 Updating database schema for ISP workflow...');
    
    // Disable foreign key checks temporarily
    await pool.execute('SET FOREIGN_KEY_CHECKS = 0');
    
    // Drop all existing tables to start fresh
    await pool.execute('DROP TABLE IF EXISTS survey_data');
    await pool.execute('DROP TABLE IF EXISTS surveys');
    await pool.execute('DROP TABLE IF EXISTS buildings');
    await pool.execute('DROP TABLE IF EXISTS properties');
    await pool.execute('DROP TABLE IF EXISTS users');
    await pool.execute('DROP TABLE IF EXISTS activities');
    await pool.execute('DROP TABLE IF EXISTS system_alerts');
    await pool.execute('DROP TABLE IF EXISTS settings');
    
    // Re-enable foreign key checks
    await pool.execute('SET FOREIGN_KEY_CHECKS = 1');
    
    console.log('🗑️  Dropped existing tables');

    // Create users table with ISP roles
    await pool.execute(`
      CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'survey_engineer') DEFAULT 'survey_engineer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Users table created with ISP roles');

    // Create properties table with ISP fields
    await pool.execute(`
      CREATE TABLE properties (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address TEXT NOT NULL,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        type ENUM('Commercial', 'Campus', 'Mall', 'Residential', 'Industrial') NOT NULL,
        owner VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Properties table created with ISP fields');

    // Create buildings table with ISP fields
    await pool.execute(`
      CREATE TABLE buildings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        property_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        floors INT DEFAULT 1,
        purpose ENUM('Office', 'Hospital Wing', 'Data Center', 'Retail', 'Residential') NOT NULL,
        status ENUM('Active', 'Under Installation', 'Maintenance') DEFAULT 'Active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
      )
    `);
    console.log('✅ Buildings table created with ISP fields');

    // Create surveys table with ISP workflow
    await pool.execute(`
      CREATE TABLE surveys (
        id INT AUTO_INCREMENT PRIMARY KEY,
        property_id INT NOT NULL,
        building_id INT NOT NULL,
        assigned_to INT NOT NULL,
        survey_type ENUM('Network Feasibility', 'Fiber Check', 'Site Survey') NOT NULL,
        due_date DATE NOT NULL,
        priority ENUM('Low', 'Medium', 'High') DEFAULT 'Medium',
        status ENUM('Pending', 'In Progress', 'Completed') DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
        FOREIGN KEY (building_id) REFERENCES buildings(id) ON DELETE CASCADE,
        FOREIGN KEY (assigned_to) REFERENCES users(id)
      )
    `);
    console.log('✅ Surveys table created with ISP workflow');

    // Create survey_data table for engineer responses
    await pool.execute(`
      CREATE TABLE survey_data (
        id INT AUTO_INCREMENT PRIMARY KEY,
        survey_id INT NOT NULL,
        gps_location VARCHAR(100),
        signal_strength VARCHAR(20),
        cable_distance VARCHAR(50),
        obstacles TEXT,
        fiber_feasible BOOLEAN DEFAULT FALSE,
        photos TEXT, -- JSON array of photo URLs
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (survey_id) REFERENCES surveys(id) ON DELETE CASCADE
      )
    `);
    console.log('✅ Survey Data table created for engineer responses');

    console.log('🎉 ISP Database schema updated successfully!');
    console.log('');
    console.log('📋 New Database Structure:');
    console.log('🏠 Properties: name, address, city, state, type, owner');
    console.log('🏢 Buildings: property_id, name, floors, purpose, status');
    console.log('👤 Users: name, email, password, role (admin/survey_engineer)');
    console.log('📋 Surveys: property_id, building_id, assigned_to, survey_type, due_date, priority, status');
    console.log('📊 Survey Data: survey_id, gps_location, signal_strength, cable_distance, obstacles, fiber_feasible, photos, notes');
    
  } catch (error) {
    console.error('❌ Error updating ISP database schema:', error);
  } finally {
    process.exit(0);
  }
};

updateISPDatabaseSchema();
