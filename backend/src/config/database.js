const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'amreen',
  database: 'info_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// Test connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully to info_db');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
};

// Initialize database with tables
const initializeDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    
    // Create tables if they don't exist
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role ENUM('admin', 'manager', 'surveyor') DEFAULT 'surveyor',
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        phone VARCHAR(20),
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS properties (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(200) NOT NULL,
        type ENUM('commercial', 'residential', 'industrial', 'mixed') NOT NULL,
        address TEXT NOT NULL,
        city VARCHAR(100),
        state VARCHAR(100),
        postal_code VARCHAR(20),
        country VARCHAR(100),
        total_area DECIMAL(10,2),
        description TEXT,
        latitude DECIMAL(10,8),
        longitude DECIMAL(11,8),
        owner_name VARCHAR(100),
        owner_contact VARCHAR(20),
        status ENUM('active', 'inactive', 'under_maintenance') DEFAULT 'active',
        created_by INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users(id)
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS buildings (
        id INT PRIMARY KEY AUTO_INCREMENT,
        property_id INT NOT NULL,
        name VARCHAR(200) NOT NULL,
        type ENUM('office', 'residential', 'warehouse', 'retail', 'mixed') NOT NULL,
        floors_count INT DEFAULT 1,
        total_area DECIMAL(10,2),
        year_built INT,
        construction_type ENUM('concrete', 'steel', 'wood', 'mixed'),
        power_availability ENUM('available', 'limited', 'unavailable') DEFAULT 'unavailable',
        fiber_readiness ENUM('ready', 'partial', 'not_ready') DEFAULT 'not_ready',
        last_survey_date DATE,
        next_survey_date DATE,
        status ENUM('active', 'inactive', 'under_construction') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS floors (
        id INT PRIMARY KEY AUTO_INCREMENT,
        building_id INT NOT NULL,
        floor_number INT NOT NULL,
        name VARCHAR(100),
        total_area DECIMAL(10,2),
        layout_type ENUM('open', 'partitioned', 'mixed') DEFAULT 'open',
        ceiling_height DECIMAL(5,2),
        has_elevator BOOLEAN DEFAULT FALSE,
        has_stairs BOOLEAN DEFAULT TRUE,
        floor_plan_image VARCHAR(255),
        status ENUM('active', 'inactive') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (building_id) REFERENCES buildings(id) ON DELETE CASCADE,
        UNIQUE KEY unique_floor (building_id, floor_number)
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS spaces (
        id INT PRIMARY KEY AUTO_INCREMENT,
        floor_id INT NOT NULL,
        name VARCHAR(200) NOT NULL,
        type ENUM('office', 'retail', 'storage', 'common', 'technical') NOT NULL,
        area DECIMAL(8,2),
        capacity INT,
        current_usage VARCHAR(100),
        network_points INT DEFAULT 0,
        power_outlets INT DEFAULT 0,
        coordinates JSON,
        status ENUM('available', 'occupied', 'maintenance') DEFAULT 'available',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (floor_id) REFERENCES floors(id) ON DELETE CASCADE
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS surveys (
        id INT PRIMARY KEY AUTO_INCREMENT,
        property_id INT NOT NULL,
        building_id INT,
        floor_id INT,
        space_id INT,
        survey_type ENUM('site_assessment', 'network_survey', 'power_survey', 'comprehensive') NOT NULL,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        assigned_to INT,
        assigned_by INT,
        status ENUM('pending', 'in_progress', 'completed', 'cancelled', 'issues_found') DEFAULT 'pending',
        priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
        scheduled_date DATE,
        start_date DATETIME,
        completion_date DATETIME,
        estimated_duration INT,
        actual_duration INT,
        findings JSON,
        recommendations JSON,
        attachments JSON,
        completion_percentage INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (property_id) REFERENCES properties(id),
        FOREIGN KEY (building_id) REFERENCES buildings(id),
        FOREIGN KEY (floor_id) REFERENCES floors(id),
        FOREIGN KEY (space_id) REFERENCES spaces(id),
        FOREIGN KEY (assigned_to) REFERENCES users(id),
        FOREIGN KEY (assigned_by) REFERENCES users(id)
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS survey_responses (
        id INT PRIMARY KEY AUTO_INCREMENT,
        survey_id INT NOT NULL,
        question_id VARCHAR(50) NOT NULL,
        question_text TEXT NOT NULL,
        response_type ENUM('text', 'number', 'boolean', 'choice', 'file') NOT NULL,
        response_value TEXT,
        response_file VARCHAR(255),
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (survey_id) REFERENCES surveys(id) ON DELETE CASCADE
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS activities (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        action VARCHAR(100) NOT NULL,
        entity_type ENUM('property', 'building', 'floor', 'space', 'survey', 'user') NOT NULL,
        entity_id INT NOT NULL,
        description TEXT NOT NULL,
        metadata JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS system_alerts (
        id INT PRIMARY KEY AUTO_INCREMENT,
        type ENUM('info', 'warning', 'error', 'success') NOT NULL,
        title VARCHAR(200) NOT NULL,
        message TEXT NOT NULL,
        entity_type ENUM('property', 'building', 'floor', 'space', 'survey', 'user', 'system'),
        entity_id INT,
        is_read BOOLEAN DEFAULT FALSE,
        priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS settings (
        id INT PRIMARY KEY AUTO_INCREMENT,
        key_name VARCHAR(100) UNIQUE NOT NULL,
        value TEXT,
        description TEXT,
        type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
        is_public BOOLEAN DEFAULT FALSE,
        updated_by INT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (updated_by) REFERENCES users(id)
      )
    `);

    console.log('✅ Database tables initialized successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    return false;
  }
};

module.exports = {
  pool,
  testConnection,
  initializeDatabase
};
