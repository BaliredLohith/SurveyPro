const http = require('http');

// Test register
const registerData = JSON.stringify({
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin'
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/register',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': registerData.length
    }
};

const req = http.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);
    res.on('data', (d) => {
        console.log('Response:', d.toString());
    });
});

req.on('error', (error) => {
    console.error('Error:', error);
});

req.write(registerData);
req.end();
