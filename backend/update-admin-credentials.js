const db = require('./config/db');

// Update admin credentials
const updateAdminCredentials = () => {
  console.log('🔄 Updating admin credentials...');
  
  const sql = 'UPDATE users SET email = ?, password = ? WHERE role = ?';
  
  db.query(sql, ['admin@example.com', 'admin123', 'admin'], (err, result) => {
    if (err) {
      console.error('❌ Error updating admin credentials:', err);
      return;
    }
    
    if (result.affectedRows === 0) {
      console.log('❌ No admin user found');
    } else {
      console.log(`✅ Admin credentials updated successfully!`);
      console.log(`📧 Email: admin@example.com`);
      console.log(`🔑 Password: admin123`);
      console.log(`🎯 Affected ${result.affectedRows} row(s)`);
    }
    
    console.log('📊 You can now test the login at: http://localhost:3000/login');
    db.end(); // Close connection
  });
};

// Update the admin credentials
updateAdminCredentials();
