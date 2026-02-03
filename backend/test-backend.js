const http = require('http');

console.log('🔍 TESTING BACKEND CONNECTION...\n');

// Test backend login
const loginData = JSON.stringify({
    email: 'admin@example.com',
    password: 'password123'
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/login',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': loginData.length
    }
};

const req = http.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    res.on('data', (d) => {
        console.log('Response:', d.toString());
    });
});

req.on('error', (error) => {
    console.error('❌ Backend Error:', error.message);
});

req.write(loginData);
req.end();
