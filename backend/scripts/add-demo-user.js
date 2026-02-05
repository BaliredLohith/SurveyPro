const { pool } = require('../src/config/database');
const { hashPassword } = require('../src/middleware/auth');

const addDemoUser = async () => {
  try {
    const demoPassword = await hashPassword('password123');
    
    await pool.execute(`
      INSERT INTO users (name, email, password, role) 
      VALUES (?, ?, ?, ?)
    `, ['Admin User', 'admin@example.com', demoPassword, 'admin']);

    console.log('✅ Demo user added successfully!');
    console.log('📧 Email: admin@example.com');
    console.log('🔑 Password: password123');
    
  } catch (error) {
    console.error('❌ Error adding demo user:', error.message);
  } finally {
    process.exit(0);
  }
};

addDemoUser();
