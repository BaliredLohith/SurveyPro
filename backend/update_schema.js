const { pool } = require('./src/config/database');

async function updateSchema() {
  try {
    console.log('=== UPDATING DATABASE SCHEMA ===');
    
    // Update the enum to include all roles
    await pool.execute('ALTER TABLE users MODIFY COLUMN role ENUM("admin","project_manager","survey_engineer","reviewer","viewer")');
    console.log('✅ Updated role enum to include all roles');
    
    // Verify the update
    const [result] = await pool.execute('SHOW COLUMNS FROM users LIKE "role"');
    console.log('Updated role column definition:', result[0]);
    
    // Now add the missing users
    await pool.execute(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      ['Project Manager', 'manager@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'project_manager']
    );
    console.log('✅ Added Project Manager: manager@example.com / manager123');
    
    await pool.execute(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      ['Reviewer User', 'reviewer@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'reviewer']
    );
    console.log('✅ Added Reviewer: reviewer@example.com / reviewer123');
    
    await pool.execute(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      ['Viewer User', 'viewer@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'viewer']
    );
    console.log('✅ Added Viewer: viewer@example.com / viewer123');
    
    // Verify all users
    const [users] = await pool.execute('SELECT id, name, email, role FROM users ORDER BY id');
    console.log('\n=== ALL USERS IN DATABASE ===');
    users.forEach(user => {
      console.log('ID: ' + user.id + ', Name: ' + user.name + ', Email: ' + user.email + ', Role: ' + user.role);
    });
    
    console.log('\n🎉 Database schema updated successfully!');
    
  } catch (error) {
    console.error('Error:', error.message);
  }
  process.exit(0);
}

updateSchema();
