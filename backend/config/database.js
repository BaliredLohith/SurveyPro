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
            role ENUM('admin', 'project_manager', 'survey_engineer', 'reviewer', 'viewer') DEFAULT 'survey_engineer',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    // Properties table
    const propertiesTable = `
        CREATE TABLE IF NOT EXISTS properties (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    // Execute table creation
    db.query(usersTable, (err) => {
        if (err) {
            console.error('Error creating users table:', err);
            return;
        }
        console.log('Users table created or already exists');
    });

    db.query(propertiesTable, (err) => {
        if (err) {
            console.error('Error creating properties table:', err);
            return;
        }
        console.log('Properties table created or already exists');
    });
};

module.exports = { createTables };
