const { pool } = require('./src/config/database');

async function checkAdminUsers() {
  try {
    const [users] = await pool.execute(`
      SELECT id, name, email, role, status, isFirstLogin 
      FROM users 
      WHERE role = 'admin'
    `);

    console.log('🔍 Admin users in database:');
    if (users.length === 0) {
      console.log('❌ No admin users found');
    } else {
      users.forEach(user => {
        console.log(`👤 ${user.name} (${user.email}) - Status: ${user.status}`);
      });
    }

    // Check all users
    const [allUsers] = await pool.execute(`
      SELECT id, name, email, role, status 
      FROM users 
      ORDER BY created_at DESC
      LIMIT 5
    `);

    console.log('\n📋 Latest users in database:');
    allUsers.forEach(user => {
      console.log(`👤 ${user.name} (${user.email}) - Role: ${user.role} - Status: ${user.status}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkAdminUsers();
