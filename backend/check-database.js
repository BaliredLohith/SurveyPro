const db = require('./config/db');

console.log('🔍 CHECKING DATABASE FOR USER...\n');

// Check if user exists
const checkUser = 'SELECT * FROM users WHERE email = ?';
db.query(checkUser, ['admin@example.com'], (err, results) => {
    if (err) {
        console.error('❌ Database error:', err);
        return;
    }

    if (results.length === 0) {
        console.log('❌ User NOT found in database');
        console.log('📝 Creating user...');
        
        // Create user
        const bcrypt = require('bcryptjs');
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync('password123', salt);
        
        const insertUser = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
        db.query(insertUser, ['Admin User', 'admin@example.com', hashedPassword, 'admin'], (err, result) => {
            if (err) {
                console.error('❌ Error creating user:', err);
                return;
            }
            console.log('✅ User created successfully!');
            console.log(`📋 User ID: ${result.insertId}`);
            console.log('📋 Email: admin@example.com');
            console.log('📋 Password: password123');
            console.log('📋 Role: admin');
        });
    } else {
        console.log('✅ User found in database:');
        console.log(`📋 ID: ${results[0].id}`);
        console.log(`📋 Name: ${results[0].name}`);
        console.log(`📋 Email: ${results[0].email}`);
        console.log(`📋 Role: ${results[0].role}`);
        console.log(`📋 Password: [HASHED]`);
    }
    
    // Check all users
    console.log('\n📊 ALL USERS IN DATABASE:');
    const allUsers = 'SELECT id, name, email, role, created_at FROM users';
    db.query(allUsers, (err, results) => {
        if (err) {
            console.error('❌ Error fetching users:', err);
            return;
        }
        
        if (results.length === 0) {
            console.log('❌ No users found in database');
        } else {
            results.forEach(user => {
                console.log(`👤 ID: ${user.id}, Name: ${user.name}, Email: ${user.email}, Role: ${user.role}`);
            });
        }
        
        console.log('\n🎯 Database check completed!');
        process.exit(0);
    });
});
