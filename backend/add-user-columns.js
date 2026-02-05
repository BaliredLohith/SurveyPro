const { pool } = require('./src/config/database');

async function addUserColumns() {
  try {
    // Check if status column exists
    const [statusCheck] = await pool.execute(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'users' 
      AND COLUMN_NAME = 'status' 
      AND TABLE_SCHEMA = DATABASE()
    `);
    
    if (statusCheck.length === 0) {
      await pool.execute(`
        ALTER TABLE users 
        ADD COLUMN status ENUM('Active', 'Suspended') DEFAULT 'Active'
      `);
      console.log('✅ Added status column to users table');
    } else {
      console.log('ℹ️ status column already exists');
    }
    
    // Check if isFirstLogin column exists
    const [loginCheck] = await pool.execute(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'users' 
      AND COLUMN_NAME = 'isFirstLogin' 
      AND TABLE_SCHEMA = DATABASE()
    `);
    
    if (loginCheck.length === 0) {
      await pool.execute(`
        ALTER TABLE users 
        ADD COLUMN isFirstLogin BOOLEAN DEFAULT TRUE
      `);
      console.log('✅ Added isFirstLogin column to users table');
    } else {
      console.log('ℹ️ isFirstLogin column already exists');
    }
    
    console.log('✅ Database columns updated successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding columns:', error.message);
    process.exit(1);
  }
}

addUserColumns();
