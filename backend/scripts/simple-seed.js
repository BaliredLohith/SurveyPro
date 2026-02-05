const { pool } = require('../src/config/database');
const { hashPassword } = require('../src/middleware/auth');

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting simple database seeding...');

    // Clear existing data
    await pool.execute('DELETE FROM users');
    await pool.execute('DELETE FROM properties');

    // Insert sample users
    const adminPassword = await hashPassword('admin123');
    const [userResult] = await pool.execute(`
      INSERT INTO users (name, email, password, role) 
      VALUES (?, ?, ?, ?)
    `, ['Admin User', 'admin@surveypro.com', adminPassword, 'admin']);

    const userId = userResult.insertId;

    // Insert sample properties (using existing table structure)
    await pool.execute(`
      INSERT INTO properties (name, address) 
      VALUES (?, ?)
    `, ['Tech Park Building A', '123 Tech Street, San Francisco, CA 94105']);

    await pool.execute(`
      INSERT INTO properties (name, address) 
      VALUES (?, ?)
    `, ['Downtown Office Complex', '456 Business Ave, New York, NY 10001']);

    await pool.execute(`
      INSERT INTO properties (name, address) 
      VALUES (?, ?)
    `, ['Industrial Warehouse', '789 Factory Road, Chicago, IL 60601']);

    console.log('✅ Database seeded successfully!');
    console.log('📊 Sample data created:');
    console.log(`   - 1 User (admin)`);
    console.log(`   - 3 Properties`);
    console.log('');
    console.log('🔑 Login credentials:');
    console.log('   Username: admin@surveypro.com');
    console.log('   Password: admin123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    process.exit(0);
  }
};

// Run the seeding
seedDatabase();
