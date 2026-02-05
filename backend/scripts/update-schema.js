const { pool } = require('../src/config/database');

const updateDatabaseSchema = async () => {
  try {
    console.log('🔄 Updating database schema for hierarchy system...');
    
    // Disable foreign key checks temporarily
    await pool.execute('SET FOREIGN_KEY_CHECKS = 0');
    
    // Drop all existing tables
    await pool.execute('DROP TABLE IF EXISTS reports');
    await pool.execute('DROP TABLE IF EXISTS survey_responses');
    await pool.execute('DROP TABLE IF EXISTS surveys');
    await pool.execute('DROP TABLE IF EXISTS spaces');
    await pool.execute('DROP TABLE IF EXISTS floors');
    await pool.execute('DROP TABLE IF EXISTS buildings');
    await pool.execute('DROP TABLE IF EXISTS properties');
    await pool.execute('DROP TABLE IF EXISTS users');
    await pool.execute('DROP TABLE IF EXISTS activities');
    await pool.execute('DROP TABLE IF EXISTS system_alerts');
    await pool.execute('DROP TABLE IF EXISTS settings');
    
    // Re-enable foreign key checks
    await pool.execute('SET FOREIGN_KEY_CHECKS = 1');
    
    console.log('🗑️  Dropped existing tables');

    // Create users table with proper roles
    await pool.execute(`
      CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('Admin', 'Project Manager', 'Survey Engineer', 'Viewer') DEFAULT 'Survey Engineer',
        status ENUM('Active', 'Inactive') DEFAULT 'Active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Users table created');

    // Create properties table with proper fields
    await pool.execute(`
      CREATE TABLE properties (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        location TEXT NOT NULL,
        client_name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(50),
        status ENUM('Active', 'Inactive') DEFAULT 'Active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Properties table created');

    // Create buildings table with property relationship
    await pool.execute(`
      CREATE TABLE buildings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        property_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        type ENUM('Office', 'Hospital', 'Academic', 'Residential', 'Industrial', 'Retail') NOT NULL,
        floors INT DEFAULT 1,
        status ENUM('Active', 'Under Installation', 'Maintenance') DEFAULT 'Active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
      )
    `);
    console.log('✅ Buildings table created');

    // Create surveys table with proper hierarchy
    await pool.execute(`
      CREATE TABLE surveys (
        id INT AUTO_INCREMENT PRIMARY KEY,
        property_id INT NOT NULL,
        building_id INT NOT NULL,
        floor VARCHAR(50) NOT NULL,
        assigned_to INT NOT NULL,
        status ENUM('Draft', 'In Progress', 'Review Pending', 'Completed') DEFAULT 'Draft',
        priority ENUM('Low', 'Medium', 'High') DEFAULT 'Medium',
        network_score DECIMAL(5,2) DEFAULT 0,
        power_status ENUM('Good', 'Fair', 'Poor') DEFAULT 'Fair',
        env_status ENUM('Normal', 'Warning') DEFAULT 'Normal',
        equipment_score DECIMAL(5,2) DEFAULT 0,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
        FOREIGN KEY (building_id) REFERENCES buildings(id) ON DELETE CASCADE,
        FOREIGN KEY (assigned_to) REFERENCES users(id)
      )
    `);
    console.log('✅ Surveys table created');

    // Create reports table
    await pool.execute(`
      CREATE TABLE reports (
        id INT AUTO_INCREMENT PRIMARY KEY,
        building_id INT NOT NULL,
        survey_id INT NOT NULL,
        readiness_score DECIMAL(5,2) DEFAULT 0,
        status ENUM('Draft', 'Generated', 'Approved') DEFAULT 'Draft',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (building_id) REFERENCES buildings(id) ON DELETE CASCADE,
        FOREIGN KEY (survey_id) REFERENCES surveys(id) ON DELETE CASCADE
      )
    `);
    console.log('✅ Reports table created');

    console.log('🎉 Database schema updated successfully!');
    
  } catch (error) {
    console.error('❌ Error updating database schema:', error);
  } finally {
    process.exit(0);
  }
};

updateDatabaseSchema();
