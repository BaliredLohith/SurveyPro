const http = require('http');

console.log('🔍 DEBUGGING LOGIN ISSUE...\n');

// Test exactly what the frontend would send
const loginData = JSON.stringify({
    email: 'admin@example.com',
    password: 'password123'
});

console.log('📤 Sending login request with:');
console.log('URL: http://localhost:5000/api/auth/login');
console.log('Method: POST');
console.log('Headers: Content-Type: application/json');
console.log('Body:', loginData);
console.log('');

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/login',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': loginData.length,
        'Origin': 'http://localhost:3000',
        'Referer': 'http://localhost:3000/login'
    }
};

const req = http.request(options, (res) => {
    console.log(`📥 Response Status: ${res.statusCode}`);
    console.log('📥 Response Headers:');
    Object.keys(res.headers).forEach(key => {
        console.log(`  ${key}: ${res.headers[key]}`);
    });
    console.log('');
    
    let responseData = '';
    res.on('data', (d) => {
        responseData += d;
    });
    
    res.on('end', () => {
        console.log('📥 Response Body:', responseData);
        console.log('');
        
        try {
            const response = JSON.parse(responseData);
            if (res.statusCode === 200) {
                console.log('✅ LOGIN SUCCESSFUL!');
                console.log('✅ Message:', response.message);
                console.log('✅ Token received:', response.accessToken ? 'YES' : 'NO');
                console.log('✅ User info:', response.userInfo);
                console.log('');
                console.log('🔧 If frontend still fails, check:');
                console.log('1. Browser console for JavaScript errors');
                console.log('2. Network tab for failed requests');
                console.log('3. CORS issues');
                console.log('4. Frontend API configuration');
            } else {
                console.log('❌ LOGIN FAILED!');
                console.log('❌ Error:', response.message);
            }
        } catch (error) {
            console.log('❌ Invalid JSON response:', error.message);
            console.log('❌ Raw response:', responseData);
        }
    });
});

req.on('error', (error) => {
    console.error('❌ REQUEST ERROR:', error.message);
    console.log('🔧 Check if backend is running on port 5000');
});

req.write(loginData);
req.end();
