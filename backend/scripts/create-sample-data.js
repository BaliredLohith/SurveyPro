const { pool } = require('../src/config/database');
const { hashPassword } = require('../src/middleware/auth');

const createSampleData = async () => {
  try {
    console.log('🌱 Creating sample data for hierarchy system...');
    
    // Create Admin User
    const adminPassword = await hashPassword('admin123');
    const [adminResult] = await pool.execute(`
      INSERT INTO users (name, email, password, role, status) 
      VALUES (?, ?, ?, ?, ?)
    `, ['Admin User', 'admin@example.com', adminPassword, 'Admin', 'Active']);
    
    console.log('✅ Admin user created');
    
    // Create Survey Engineer
    const engineerPassword = await hashPassword('engineer123');
    const [engineerResult] = await pool.execute(`
      INSERT INTO users (name, email, password, role, status) 
      VALUES (?, ?, ?, ?, ?)
    `, ['Ravi Kumar', 'ravi@example.com', engineerPassword, 'Survey Engineer', 'Active']);
    
    console.log('✅ Survey Engineer created');
    
    // Create Properties
    const [property1] = await pool.execute(`
      INSERT INTO properties (name, location, client_name, email, phone, status) 
      VALUES (?, ?, ?, ?, ?, ?)
    `, ['Tech Park Campus', 'Bangalore, Karnataka', 'Tech Solutions Inc', 'contact@techsolutions.com', '+91-80-12345678', 'Active']);
    
    const [property2] = await pool.execute(`
      INSERT INTO properties (name, location, client_name, email, phone, status) 
      VALUES (?, ?, ?, ?, ?, ?)
    `, ['Corporate Plaza', 'Mumbai, Maharashtra', 'Mumbai Enterprises', 'info@mumbai.com', '+91-22-87654321', 'Active']);
    
    console.log('✅ Properties created');
    
    // Create Buildings
    await pool.execute(`
      INSERT INTO buildings (property_id, name, type, floors, status) 
      VALUES (?, ?, ?, ?, ?)
    `, [property1.insertId, 'Innovation Tower A', 'Office', 12, 'Active']);
    
    await pool.execute(`
      INSERT INTO buildings (property_id, name, type, floors, status) 
      VALUES (?, ?, ?, ?, ?)
    `, [property1.insertId, 'Research Block B', 'Academic', 8, 'Active']);
    
    await pool.execute(`
      INSERT INTO buildings (property_id, name, type, floors, status) 
      VALUES (?, ?, ?, ?, ?)
    `, [property2.insertId, 'Corporate Tower', 'Office', 15, 'Under Installation']);
    
    console.log('✅ Buildings created');
    
    console.log('🎉 Sample data created successfully!');
    console.log('');
    console.log('📋 Login Credentials:');
    console.log('👑 Admin: admin@example.com / admin123');
    console.log('🔧 Engineer: ravi@example.com / engineer123');
    
  } catch (error) {
    console.error('❌ Error creating sample data:', error);
  } finally {
    process.exit(0);
  }
};

createSampleData();
