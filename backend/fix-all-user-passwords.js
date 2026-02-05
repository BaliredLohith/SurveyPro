const bcrypt = require('bcryptjs');
const db = require('./config/db');

// Fix all non-admin user passwords with proper hashing
const fixAllUserPasswords = async () => {
  console.log('🔧 Fixing all non-admin user passwords...');
  
  // Get all non-admin users
  const getUsers = 'SELECT id, email, password FROM users WHERE role != ?';
  
  db.query(getUsers, ['admin'], async (err, users) => {
    if (err) {
      console.error('❌ Error fetching users:', err);
      return;
    }
    
    console.log(`📊 Found ${users.length} non-admin users to fix`);
    
    // Update each user with hashed password
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const plainPassword = user.password; // Current plain text password
      
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(plainPassword, salt);
      
      // Update user with hashed password
      const updateSql = 'UPDATE users SET password = ? WHERE id = ?';
      
      db.query(updateSql, [hashedPassword, user.id], (updateErr, result) => {
        if (updateErr) {
          console.error(`❌ Error updating ${user.email}:`, updateErr);
        } else {
          console.log(`✅ Fixed ${user.email} (ID: ${user.id})`);
          console.log(`   Password: ${plainPassword} -> hashed`);
        }
        
        // Check if this is the last user
        if (i === users.length - 1) {
          console.log('🎉 All non-admin user passwords fixed successfully!');
          console.log('📊 Login credentials:');
          console.log('   Project Manager: pm1@surveypro.com / project123');
          console.log('   Survey Engineer: engineer1@surveypro.com / survey123');
          console.log('   Reviewer: reviewer1@surveypro.com / review123');
          console.log('   Viewer: viewer1@surveypro.com / view123');
          console.log('📊 You can now test the login at: http://localhost:3000/login');
          db.end(); // Close connection
        }
      });
    }
  });
};

// Fix all non-admin user passwords
fixAllUserPasswords();
