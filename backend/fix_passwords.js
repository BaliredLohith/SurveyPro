const { pool } = require('./src/config/database');
const bcrypt = require('bcryptjs');

async function fixPasswords() {
  try {
    console.log('=== FIXING PASSWORD HASHES ===');
    
    // Hash the correct passwords
    const adminHash = await bcrypt.hash('admin123', 12);
    const engineerHash = await bcrypt.hash('engineer123', 12);
    const managerHash = await bcrypt.hash('manager123', 12);
    const reviewerHash = await bcrypt.hash('reviewer123', 12);
    const viewerHash = await bcrypt.hash('viewer123', 12);
    
    console.log('Generated hashes:');
    console.log('Admin:', adminHash);
    console.log('Engineer:', engineerHash);
    console.log('Manager:', managerHash);
    console.log('Reviewer:', reviewerHash);
    console.log('Viewer:', viewerHash);
    
    // Update all passwords
    await pool.execute('UPDATE users SET password = ? WHERE role = ?', [adminHash, 'admin']);
    console.log('✅ Updated admin password');
    
    await pool.execute('UPDATE users SET password = ? WHERE role = ?', [engineerHash, 'survey_engineer']);
    console.log('✅ Updated survey engineer password');
    
    await pool.execute('UPDATE users SET password = ? WHERE role = ?', [managerHash, 'project_manager']);
    console.log('✅ Updated project manager password');
    
    await pool.execute('UPDATE users SET password = ? WHERE role = ?', [reviewerHash, 'reviewer']);
    console.log('✅ Updated reviewer password');
    
    await pool.execute('UPDATE users SET password = ? WHERE role = ?', [viewerHash, 'viewer']);
    console.log('✅ Updated viewer password');
    
    // Verify the updates
    const [users] = await pool.execute('SELECT email, role, LEFT(password, 20) as password_preview FROM users ORDER BY id');
    console.log('\\n=== VERIFIED PASSWORD UPDATES ===');
    users.forEach(user => {
      console.log('Email: ' + user.email + ', Role: ' + user.role + ', Hash Preview: ' + user.password_preview + '...');
    });
    
    console.log('\\n🎉 All passwords fixed successfully!');
    
  } catch (error) {
    console.error('Error:', error.message);
  }
  process.exit(0);
}

fixPasswords();
