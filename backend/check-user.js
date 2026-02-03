const http = require('http');

console.log('🔍 CHECKING ADMIN USER CREDENTIALS...\n');

// Test login with password123
const loginData1 = JSON.stringify({
    email: 'admin@example.com',
    password: 'password123'
});

const options1 = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/login',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': loginData1.length
    }
};

const req1 = http.request(options1, (res) => {
    console.log(`Test 1 - Password: password123`);
    console.log(`Status: ${res.statusCode}`);
    
    res.on('data', (d) => {
        const response = JSON.parse(d.toString());
        if (res.statusCode === 200) {
            console.log(`✅ SUCCESS: ${response.message}`);
            console.log(`✅ CORRECT PASSWORD: password123`);
        } else {
            console.log(`❌ FAILED: ${response.message}`);
            
            // Test with 'password'
            console.log(`\nTest 2 - Password: password`);
            testPassword('password');
        }
    });
});

req1.on('error', (error) => {
    console.error('❌ Error:', error.message);
});

req1.write(loginData1);
req1.end();

function testPassword(password) {
    const loginData2 = JSON.stringify({
        email: 'admin@example.com',
        password: password
    });

    const options2 = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/auth/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': loginData2.length
        }
    };

    const req2 = http.request(options2, (res) => {
        console.log(`Status: ${res.statusCode}`);
        
        res.on('data', (d) => {
            const response = JSON.parse(d.toString());
            if (res.statusCode === 200) {
                console.log(`✅ SUCCESS: ${response.message}`);
                console.log(`✅ CORRECT PASSWORD: ${password}`);
            } else {
                console.log(`❌ FAILED: ${response.message}`);
                console.log(`\n🔍 Both passwords failed. Let me check what was actually created...`);
                checkCreatedUser();
            }
        });
    });

    req2.on('error', (error) => {
        console.error('❌ Error:', error.message);
    });

    req2.write(loginData2);
    req2.end();
}

function checkCreatedUser() {
    console.log(`\n📋 ADMIN USER WAS CREATED WITH:`);
    console.log(`Email: admin@example.com`);
    console.log(`Password: password123 (during registration)`);
    console.log(`\n💡 If login fails, the password might be different.`);
    console.log(`Try both: 'password123' and 'password'`);
}
