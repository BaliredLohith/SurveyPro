const db = require('./config/db');

// Check what tables exist in the database
const checkTables = () => {
  console.log('🔍 Checking database tables...');
  
  db.query('SHOW TABLES', (err, results) => {
    if (err) {
      console.error('❌ Error checking tables:', err);
      return;
    }
    
    console.log('📊 Tables in database:');
    results.forEach(row => {
      const tableName = Object.values(row)[0];
      console.log(`   - ${tableName}`);
    });
    
    // Check specifically for spaces table
    db.query('DESCRIBE spaces', (err, result) => {
      if (err) {
        console.log('❌ Spaces table does not exist:', err.message);
      } else {
        console.log('✅ Spaces table exists');
        console.log('Columns:', result.map(col => col.Field));
      }
      
      // Check surveys table structure
      db.query('DESCRIBE surveys', (err, result) => {
        if (err) {
          console.log('❌ Surveys table does not exist:', err.message);
        } else {
          console.log('✅ Surveys table exists');
          console.log('Columns:', result.map(col => col.Field));
        }
        
        db.end(); // Close connection
      });
    });
  });
};

// Check the tables
checkTables();
