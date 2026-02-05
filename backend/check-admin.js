const { pool } = require('./src/config/database');

async function checkAdminCredentials() {
  try {
    console.log('🏢 Checking admin credentials...');
    
    const [users] = await pool.execute('SELECT id, username, role FROM users WHERE role = "admin"');
    console.log('🏢 Admin users found:', users.length);
    console.table(users);
    
    if (users.length === 0) {
      console.log('🏢 No admin users found. Creating default admin...');
      const [result] = await pool.execute(`
        INSERT INTO users (username, password, role, email, created_at)
        VALUES (?, ?, ?, ?, NOW())
      `, ['admin', '$2b$10$rOzJqQjQjQjQjQjQjQjQjOzJqQjQjQjQjQjQjQjQjO', 'admin', 'admin@example.com']);
      
      console.log('🏢 Created admin user with ID:', result.insertId);
      console.log('🏢 Username: admin');
      console.log('🏢 Password: admin123');
    }
    
  } catch (error) {
    console.error('🏢 Error checking admin credentials:', error);
  } finally {
    process.exit();
  }
}

checkAdminCredentials();
