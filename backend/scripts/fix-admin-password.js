const { pool } = require('../src/config/database');
const { hashPassword } = require('../src/middleware/auth');

const fixAdminPassword = async () => {
  try {
    console.log('🔧 Fixing admin password...');
    
    const adminPassword = await hashPassword('admin123');
    
    await pool.execute(`
      UPDATE users SET password = ? WHERE email = 'admin@example.com'
    `, [adminPassword]);

    console.log('✅ Admin password fixed successfully!');
    console.log('📧 Email: admin@example.com');
    console.log('🔑 Password: admin123');
    
  } catch (error) {
    console.error('❌ Error fixing admin password:', error);
  } finally {
    process.exit(0);
  }
};

fixAdminPassword();
