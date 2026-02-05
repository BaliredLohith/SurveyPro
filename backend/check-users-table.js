const { pool } = require('./src/config/database');

async function checkUsersTable() {
  try {
    console.log('🏢 Checking users table structure...');
    
    // Check if table exists
    const [tables] = await pool.execute("SHOW TABLES LIKE 'users'");
    console.log('🏢 Users table found:', tables.length > 0);
    
    if (tables.length > 0) {
      // Show table structure
      const [structure] = await pool.execute('DESCRIBE users');
      console.log('🏢 Users table structure:');
      console.table(structure);
      
      // Show existing users
      const [users] = await pool.execute('SELECT * FROM users');
      console.log('🏢 Existing users:', users.length);
      if (users.length > 0) {
        console.table(users);
      }
    } else {
      console.log('🏢 Users table does not exist');
    }
    
  } catch (error) {
    console.error('🏢 Error checking users table:', error);
  } finally {
    process.exit();
  }
}

checkUsersTable();
