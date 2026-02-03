const http = require('http');

// First login to get token
const loginData = JSON.stringify({
    email: 'admin@example.com',
    password: 'password123'
});

const loginOptions = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/login',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': loginData.length
    }
};

const loginReq = http.request(loginOptions, (loginRes) => {
    let loginData = '';
    loginRes.on('data', (chunk) => {
        loginData += chunk;
    });
    
    loginRes.on('end', () => {
        const response = JSON.parse(loginData);
        const token = response.token;
        console.log('Login successful, token:', token.substring(0, 50) + '...');
        
        // Now create a property
        const propertyData = JSON.stringify({
            name: 'Test Property',
            address: '123 Test Street, Test City'
        });

        const propertyOptions = {
            hostname: 'localhost',
            port: 5000,
            path: '/api/properties',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Content-Length': propertyData.length
            }
        };

        const propertyReq = http.request(propertyOptions, (propertyRes) => {
            console.log(`Property creation statusCode: ${propertyRes.statusCode}`);
            propertyRes.on('data', (d) => {
                console.log('Property Response:', d.toString());
            });
        });

        propertyReq.on('error', (error) => {
            console.error('Property Error:', error);
        });

        propertyReq.write(propertyData);
        propertyReq.end();
    });
});

loginReq.on('error', (error) => {
    console.error('Login Error:', error);
});

loginReq.write(loginData);
loginReq.end();
