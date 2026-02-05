const { pool } = require('../src/config/database');
const { hashPassword } = require('../src/middleware/auth');

const createISPTestData = async () => {
  try {
    console.log('🌱 Creating ISP test data...');
    
    // Create Admin User
    const adminPassword = await hashPassword('password123');
    const [adminResult] = await pool.execute(`
      INSERT INTO users (name, email, password, role) 
      VALUES (?, ?, ?, ?)
    `, ['Admin User', 'admin@example.com', adminPassword, 'admin']);
    
    console.log('✅ Admin user created');
    
    // Create Survey Engineer (Rahul Verma)
    const engineerPassword = await hashPassword('rahul123');
    const [engineerResult] = await pool.execute(`
      INSERT INTO users (name, email, password, role) 
      VALUES (?, ?, ?, ?)
    `, ['Rahul Verma', 'rahul@isp.com', engineerPassword, 'survey_engineer']);
    
    console.log('✅ Survey Engineer Rahul Verma created');
    
    // Create Property: Tech Park Campus - Hyderabad
    const [property1] = await pool.execute(`
      INSERT INTO properties (name, address, city, state, type, owner) 
      VALUES (?, ?, ?, ?, ?, ?)
    `, ['Tech Park Campus', 'HITEC City, Hyderabad', 'Hyderabad', 'Telangana', 'Commercial', 'TechPark Pvt Ltd']);
    
    console.log('✅ Property created: Tech Park Campus - Hyderabad');
    
    // Create Building: Tower A under Tech Park Campus
    await pool.execute(`
      INSERT INTO buildings (property_id, name, floors, purpose, status) 
      VALUES (?, ?, ?, ?, ?)
    `, [property1.insertId, 'Tower A', 8, 'Office', 'Active']);
    
    console.log('✅ Building created: Tower A - 8 floors');
    
    // Create Survey: Network Feasibility Survey assigned to Rahul
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7); // Due in 7 days
    
    const [surveyResult] = await pool.execute(`
      INSERT INTO surveys (property_id, building_id, assigned_to, survey_type, due_date, priority, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [property1.insertId, 1, engineerResult.insertId, 'Network Feasibility', dueDate, 'High', 'Pending']);
    
    console.log('✅ Survey created: Network Feasibility Survey - Assigned to Rahul');
    
    console.log('🎉 ISP test data created successfully!');
    console.log('');
    console.log('📋 Login Credentials:');
    console.log('👑 Admin: admin@example.com / password123');
    console.log('👷 Engineer: rahul@isp.com / rahul123');
    console.log('');
    console.log('🏗 ISP Workflow Ready:');
    console.log('🏠 Property: Tech Park Campus, Hyderabad');
    console.log('🏢 Building: Tower A (8 floors)');
    console.log('👤 Engineer: Rahul Verma');
    console.log('📋 Survey: Network Feasibility (High Priority, Due in 7 days)');
    console.log('');
    console.log('🚀 System is now ready for ISP workflow testing!');
    
  } catch (error) {
    console.error('❌ Error creating ISP test data:', error);
  } finally {
    process.exit(0);
  }
};

createISPTestData();
