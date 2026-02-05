const bcrypt = require('bcryptjs');
const db = require('./config/db');

// Fix admin password with proper hashing
const fixAdminPassword = async () => {
  console.log('🔧 Fixing admin password with proper hashing...');
  
  // Hash the password properly
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('admin123', salt);
  
  console.log('🔑 Generated hash:', hashedPassword.substring(0, 20) + '...');
  
  // Update admin user with hashed password
  const sql = 'UPDATE users SET password = ? WHERE email = ?';
  
  db.query(sql, [hashedPassword, 'admin@example.com'], (err, result) => {
    if (err) {
      console.error('❌ Error updating admin password:', err);
      return;
    }
    
    if (result.affectedRows === 0) {
      console.log('❌ No admin user found with email admin@example.com');
    } else {
      console.log(`✅ Admin password fixed successfully!`);
      console.log(`📧 Email: admin@example.com`);
      console.log(`🔑 Password: admin123 (hashed in database)`);
      console.log(`🎯 Affected ${result.affectedRows} row(s)`);
      console.log('🔐 Password is now properly hashed for bcrypt comparison');
    }
    
    console.log('📊 You can now test the login at: http://localhost:3000/login');
    db.end(); // Close connection
  });
};

// Fix the admin password
fixAdminPassword();
