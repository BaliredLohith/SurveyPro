const db = require('./config/db');

// Check what's in the database
const checkDatabase = () => {
  console.log('🔍 Checking database contents...');
  
  // Check properties
  db.query('SELECT id, name FROM properties', (err, properties) => {
    if (err) {
      console.error('❌ Error checking properties:', err);
    } else {
      console.log(`📊 Properties found: ${properties.length}`);
      properties.forEach(prop => console.log(`   ID: ${prop.id}, Name: ${prop.name}`));
    }
    
    // Check buildings
    db.query('SELECT id, name, property_id FROM buildings', (err, buildings) => {
      if (err) {
        console.error('❌ Error checking buildings:', err);
      } else {
        console.log(`📊 Buildings found: ${buildings.length}`);
        buildings.forEach(build => console.log(`   ID: ${build.id}, Name: ${build.name}, Property ID: ${build.property_id}`));
      }
      
      // Check surveys
      db.query('SELECT id, survey_type, assigned_to FROM surveys', (err, surveys) => {
        if (err) {
          console.error('❌ Error checking surveys:', err);
        } else {
          console.log(`📊 Surveys found: ${surveys.length}`);
          surveys.forEach(survey => console.log(`   ID: ${survey.id}, Type: ${survey.survey_type}, Assigned to: ${survey.assigned_to}`));
        }
        
        // Check users
        db.query('SELECT id, name, email, role FROM users', (err, users) => {
          if (err) {
            console.error('❌ Error checking users:', err);
          } else {
            console.log(`📊 Users found: ${users.length}`);
            users.forEach(user => console.log(`   ID: ${user.id}, Name: ${user.name}, Role: ${user.role}`));
          }
          
          db.end(); // Close connection
        });
      });
    });
  });
};

// Check the database
checkDatabase();
