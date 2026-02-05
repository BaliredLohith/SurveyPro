const { pool } = require('../src/config/database');
const { hashPassword } = require('../src/middleware/auth');

const updateAdminPassword = async () => {
  try {
    console.log('🔧 Updating admin password to password123...');
    
    const adminPassword = await hashPassword('password123');
    
    await pool.execute(`
      UPDATE users SET password = ? WHERE email = 'admin@example.com'
    `, [adminPassword]);

    console.log('✅ Admin password updated successfully!');
    console.log('📧 Email: admin@example.com');
    console.log('🔑 Password: password123');
    
  } catch (error) {
    console.error('❌ Error updating admin password:', error);
  } finally {
    process.exit(0);
  }
};

updateAdminPassword();
