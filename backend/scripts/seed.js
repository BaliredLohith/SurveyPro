const { pool } = require('../src/config/database');
const { hashPassword } = require('../src/middleware/auth');

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Create activities table if it doesn't exist
    try {
      await pool.execute(`
        CREATE TABLE IF NOT EXISTS activities (
          id INT PRIMARY KEY AUTO_INCREMENT,
          user_id INT NOT NULL,
          action VARCHAR(100) NOT NULL,
          entity_type ENUM('property', 'building', 'floor', 'space', 'survey', 'user') NOT NULL,
          entity_id INT NOT NULL,
          description TEXT NOT NULL,
          metadata JSON,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id)
        )
      `);
    } catch (error) {
      console.log('Activities table creation skipped (may already exist)');
    }

    // Create system_alerts table if it doesn't exist
    try {
      await pool.execute(`
        CREATE TABLE IF NOT EXISTS system_alerts (
          id INT PRIMARY KEY AUTO_INCREMENT,
          type ENUM('info', 'warning', 'error', 'success') NOT NULL,
          title VARCHAR(200) NOT NULL,
          message TEXT NOT NULL,
          entity_type ENUM('property', 'building', 'floor', 'space', 'survey', 'user', 'system'),
          entity_id INT,
          is_read BOOLEAN DEFAULT FALSE,
          priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          expires_at TIMESTAMP
        )
      `);
    } catch (error) {
      console.log('System alerts table creation skipped (may already exist)');
    }

    // Clear existing data (only if tables exist)
    try {
      await pool.execute('DELETE FROM activities');
    } catch (error) {
      console.log('Activities table cleanup skipped');
    }

    try {
      await pool.execute('DELETE FROM system_alerts');
    } catch (error) {
      console.log('System alerts table cleanup skipped');
    }

    await pool.execute('DELETE FROM survey_responses');
    await pool.execute('DELETE FROM surveys');
    await pool.execute('DELETE FROM spaces');
    await pool.execute('DELETE FROM floors');
    await pool.execute('DELETE FROM buildings');
    await pool.execute('DELETE FROM properties');
    await pool.execute('DELETE FROM users');

    // Insert sample users
    const adminPassword = await hashPassword('admin123');
    const [userResult] = await pool.execute(`
      INSERT INTO users (name, email, password, role) 
      VALUES (?, ?, ?, ?)
    `, ['Admin User', 'admin@surveypro.com', adminPassword, 'admin']);

    const userId = userResult.insertId;

    // Insert sample properties
    const [property1] = await pool.execute(`
      INSERT INTO properties (name, type, address, city, state, postal_code, country, total_area, description, latitude, longitude, owner_name, owner_contact, created_by) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      'Tech Park Building A', 'commercial', '123 Tech Street', 'San Francisco', 'CA', '94105', 
      'USA', 5000.00, 'Modern technology park with high-speed internet requirements', 
      37.7749, -122.4194, 'Tech Corp', '+1234567890', userId
    ]);

    const [property2] = await pool.execute(`
      INSERT INTO properties (name, type, address, city, state, postal_code, country, total_area, description, latitude, longitude, owner_name, owner_contact, created_by) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      'Downtown Office Complex', 'commercial', '456 Business Ave', 'New York', 'NY', '10001', 
      'USA', 7500.00, 'Multi-story office building in downtown area', 
      40.7128, -74.0060, 'Office Properties Inc', '+0987654321', userId
    ]);

    const [property3] = await pool.execute(`
      INSERT INTO properties (name, type, address, city, state, postal_code, country, total_area, description, latitude, longitude, owner_name, owner_contact, created_by) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      'Industrial Warehouse', 'industrial', '789 Factory Road', 'Chicago', 'IL', '60601', 
      'USA', 12000.00, 'Large warehouse facility requiring network infrastructure', 
      41.8781, -87.6298, 'Industrial Co', '+1122334455', userId
    ]);

    // Insert sample buildings
    const [building1] = await pool.execute(`
      INSERT INTO buildings (property_id, name, type, floors_count, total_area, year_built, construction_type, power_availability, fiber_readiness, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [property1.insertId, 'Tower A', 'office', 10, 2500.00, 2020, 'concrete', 'available', 'ready', 'active']);

    const [building2] = await pool.execute(`
      INSERT INTO buildings (property_id, name, type, floors_count, total_area, year_built, construction_type, power_availability, fiber_readiness, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [property2.insertId, 'Main Tower', 'office', 15, 4000.00, 2018, 'steel', 'available', 'ready', 'active']);

    const [building3] = await pool.execute(`
      INSERT INTO buildings (property_id, name, type, floors_count, total_area, year_built, construction_type, power_availability, fiber_readiness, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [property3.insertId, 'Warehouse 1', 'warehouse', 2, 6000.00, 2015, 'concrete', 'limited', 'partial', 'active']);

    // Insert sample floors
    const [floor1] = await pool.execute(`
      INSERT INTO floors (building_id, floor_number, name, total_area, layout_type, ceiling_height, has_elevator, has_stairs, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [building1.insertId, 1, 'Ground Floor', 250.00, 'open', 3.5, true, true, 'active']);

    const [floor2] = await pool.execute(`
      INSERT INTO floors (building_id, floor_number, name, total_area, layout_type, ceiling_height, has_elevator, has_stairs, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [building1.insertId, 2, 'Second Floor', 250.00, 'partitioned', 3.5, true, true, 'active']);

    // Insert sample spaces
    await pool.execute(`
      INSERT INTO spaces (floor_id, name, type, area, capacity, current_usage, network_points, power_outlets, coordinates, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [floor1.insertId, 'Server Room', 'technical', 50.00, 10, 'IT Infrastructure', 20, 15, '{"x": 10, "y": 10, "width": 5, "height": 5}', 'available']);

    await pool.execute(`
      INSERT INTO spaces (floor_id, name, type, area, capacity, current_usage, network_points, power_outlets, coordinates, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [floor1.insertId, 'Open Office', 'office', 150.00, 30, 'General Office', 15, 20, '{"x": 20, "y": 10, "width": 15, "height": 10}', 'occupied']);

    // Insert sample surveys
    const [survey1] = await pool.execute(`
      INSERT INTO surveys (property_id, building_id, floor_id, space_id, survey_type, title, description, assigned_to, assigned_by, status, priority, scheduled_date, estimated_duration, completion_percentage) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      property1.insertId, building1.insertId, floor1.insertId, null, 
      'site_assessment', 'Network Infrastructure Survey', 
      'Complete assessment of network infrastructure for Tower A', 
      userId, userId, 'completed', 'high', '2024-01-15', 4, 100
    ]);

    const [survey2] = await pool.execute(`
      INSERT INTO surveys (property_id, building_id, floor_id, space_id, survey_type, title, description, assigned_to, assigned_by, status, priority, scheduled_date, estimated_duration, completion_percentage) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      property2.insertId, building2.insertId, null, null, 
      'network_survey', 'Fiber Readiness Assessment', 
      'Assess fiber optic readiness for Main Tower', 
      userId, userId, 'in_progress', 'medium', '2024-02-01', 6, 60
    ]);

    const [survey3] = await pool.execute(`
      INSERT INTO surveys (property_id, building_id, floor_id, space_id, survey_type, title, description, assigned_to, assigned_by, status, priority, scheduled_date, estimated_duration, completion_percentage) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      property3.insertId, building3.insertId, null, null, 
      'power_survey', 'Power Availability Check', 
      'Check power availability for warehouse operations', 
      userId, userId, 'pending', 'low', '2024-02-15', 3, 0
    ]);

    // Insert sample activities (only if table exists)
    try {
      await pool.execute(`
        INSERT INTO activities (user_id, action, entity_type, entity_id, description) 
        VALUES (?, ?, ?, ?, ?)
      `, [userId, 'create', 'property', property1.insertId, `Created property: Tech Park Building A`]);

      await pool.execute(`
        INSERT INTO activities (user_id, action, entity_type, entity_id, description) 
        VALUES (?, ?, ?, ?, ?)
      `, [userId, 'create', 'survey', survey1.insertId, `Created survey: Network Infrastructure Survey`]);

      await pool.execute(`
        INSERT INTO activities (user_id, action, entity_type, entity_id, description) 
        VALUES (?, ?, ?, ?, ?)
      `, [userId, 'update', 'survey', survey2.insertId, `Updated survey: Fiber Readiness Assessment`]);
    } catch (error) {
      console.log('Activities insertion skipped');
    }

    // Insert sample alerts (only if table exists)
    try {
      await pool.execute(`
        INSERT INTO system_alerts (type, title, message, entity_type, entity_id, priority) 
        VALUES (?, ?, ?, ?, ?, ?)
      `, ['warning', 'Survey Pending', '3 properties need survey', 'property', property3.insertId, 'medium']);

      await pool.execute(`
        INSERT INTO system_alerts (type, title, message, entity_type, entity_id, priority) 
        VALUES (?, ?, ?, ?, ?, ?)
      `, ['info', 'Survey Completed', 'Network Infrastructure Survey completed successfully', 'survey', survey1.insertId, 'low']);

      await pool.execute(`
        INSERT INTO system_alerts (type, title, message, entity_type, entity_id, priority) 
        VALUES (?, ?, ?, ?, ?, ?)
      `, ['error', 'Network Issue', '1 building has network issue', 'building', building3.insertId, 'high']);
    } catch (error) {
      console.log('Alerts insertion skipped');
    }

    console.log('✅ Database seeded successfully!');
    console.log('📊 Sample data created:');
    console.log(`   - 1 User (admin)`);
    console.log(`   - 3 Properties`);
    console.log(`   - 3 Buildings`);
    console.log(`   - 2 Floors`);
    console.log(`   - 2 Spaces`);
    console.log(`   - 3 Surveys`);
    console.log('');
    console.log('🔑 Login credentials:');
    console.log('   Username: admin');
    console.log('   Password: admin123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    process.exit(0);
  }
};

// Run the seeding
seedDatabase();
