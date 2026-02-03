const db = require('./db');

// Create tables
const createTables = () => {
    // Users table
    const usersTable = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            role ENUM('admin', 'user') DEFAULT 'user',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    // Properties table
    const propertiesTable = `
        CREATE TABLE IF NOT EXISTS properties (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    // Buildings table
    const buildingsTable = `
        CREATE TABLE IF NOT EXISTS buildings (
            id INT AUTO_INCREMENT PRIMARY KEY,
            property_id INT,
            name VARCHAR(255) NOT NULL,
            FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    // Floors table
    const floorsTable = `
        CREATE TABLE IF NOT EXISTS floors (
            id INT AUTO_INCREMENT PRIMARY KEY,
            building_id INT,
            name VARCHAR(255) NOT NULL,
            FOREIGN KEY (building_id) REFERENCES buildings(id) ON DELETE CASCADE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    // Spaces table
    const spacesTable = `
        CREATE TABLE IF NOT EXISTS spaces (
            id INT AUTO_INCREMENT PRIMARY KEY,
            floor_id INT,
            name VARCHAR(255) NOT NULL,
            type VARCHAR(100),
            area DECIMAL(10,2),
            FOREIGN KEY (floor_id) REFERENCES floors(id) ON DELETE CASCADE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    // Surveys table
    const surveysTable = `
        CREATE TABLE IF NOT EXISTS surveys (
            id INT AUTO_INCREMENT PRIMARY KEY,
            space_id INT,
            title VARCHAR(255) NOT NULL,
            status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
            FOREIGN KEY (space_id) REFERENCES spaces(id) ON DELETE CASCADE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    // Survey responses table
    const surveyResponsesTable = `
        CREATE TABLE IF NOT EXISTS survey_responses (
            id INT AUTO_INCREMENT PRIMARY KEY,
            survey_id INT,
            question VARCHAR(255) NOT NULL,
            answer TEXT,
            FOREIGN KEY (survey_id) REFERENCES surveys(id) ON DELETE CASCADE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    // Execute table creation
    db.query(usersTable, (err) => {
        if (err) throw err;
        console.log('Users table created');
    });

    db.query(propertiesTable, (err) => {
        if (err) throw err;
        console.log('Properties table created');
    });

    db.query(buildingsTable, (err) => {
        if (err) throw err;
        console.log('Buildings table created');
    });

    db.query(floorsTable, (err) => {
        if (err) throw err;
        console.log('Floors table created');
    });

    db.query(spacesTable, (err) => {
        if (err) throw err;
        console.log('Spaces table created');
    });

    db.query(surveysTable, (err) => {
        if (err) throw err;
        console.log('Surveys table created');
    });

    db.query(surveyResponsesTable, (err) => {
        if (err) throw err;
        console.log('Survey responses table created');
    });
};

module.exports = createTables;
