const db = require('./config/db');

// Role-based users to add
const sampleUsers = [
  {
    name: 'System Administrator',
    email: 'admin@surveypro.com',
    role: 'admin',
    status: 'active',
    password: 'admin123'
  },
  {
    name: 'Survey Engineer One',
    email: 'engineer1@surveypro.com',
    role: 'survey_engineer',
    status: 'active',
    password: 'survey123'
  },
  {
    name: 'Project Manager One',
    email: 'pm1@surveypro.com',
    role: 'project_manager',
    status: 'active',
    password: 'project123'
  },
  {
    name: 'Quality Reviewer One',
    email: 'reviewer1@surveypro.com',
    role: 'reviewer',
    status: 'active',
    password: 'review123'
  },
  {
    name: 'Report Viewer One',
    email: 'viewer1@surveypro.com',
    role: 'viewer',
    status: 'active',
    password: 'view123'
  }
];

// Function to add role-based users
const addSampleUsers = () => {
  console.log('🚀 Adding role-based users...');
  
  sampleUsers.forEach((user, index) => {
    const sql = 'INSERT INTO users (name, email, role, status, password) VALUES (?, ?, ?, ?, ?)';
    
    db.query(sql, [user.name, user.email, user.role, user.status, user.password], (err, result) => {
      if (err) {
        console.error(`❌ Error adding user ${user.name}:`, err);
      } else {
        console.log(`✅ Added user: ${user.name} (${user.role}) (ID: ${result.insertId})`);
      }
      
      // Check if this is the last user
      if (index === sampleUsers.length - 1) {
        console.log('🎉 All role-based users added successfully!');
        console.log('📊 You can now test the API at: http://localhost:5000/api/users');
        db.end(); // Close connection
      }
    });
  });
};

// Add the users
addSampleUsers();
