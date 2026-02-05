const { pool } = require('./src/config/database');

async function checkPropertiesTable() {
  try {
    console.log('🏢 Checking properties table...');
    
    // Check if table exists
    const [tables] = await pool.execute("SHOW TABLES LIKE 'properties'");
    console.log('🏢 Tables found:', tables);
    
    if (tables.length === 0) {
      console.log('🏢 Creating properties table...');
      await pool.execute(`
        CREATE TABLE properties (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          address TEXT NOT NULL,
          type VARCHAR(50) NOT NULL,
          city VARCHAR(100),
          state VARCHAR(100),
          owner VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('🏢 Properties table created successfully');
    } else {
      console.log('🏢 Properties table already exists');
      
      // Show table structure
      const [structure] = await pool.execute('DESCRIBE properties');
      console.log('🏢 Properties table structure:');
      console.table(structure);
      
      // Show existing data
      const [data] = await pool.execute('SELECT * FROM properties');
      console.log('🏢 Existing properties:', data.length);
      if (data.length > 0) {
        console.table(data);
      }
    }
    
  } catch (error) {
    console.error('🏢 Database error:', error);
  } finally {
    process.exit();
  }
}

checkPropertiesTable();
