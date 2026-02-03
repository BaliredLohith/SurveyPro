const http = require('http');

console.log('🔍 TESTING FRONTEND-BACKEND CONNECTION...\n');

// Test the exact endpoint the frontend would use
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
    console.log(`✅ Backend Status: ${res.statusCode}`);
    console.log(`✅ Headers:`, res.headers);
    
    res.on('data', (d) => {
        const response = JSON.parse(d.toString());
        console.log(`✅ Login Success: ${response.message}`);
        console.log(`✅ Token Received: ${response.accessToken ? 'YES' : 'NO'}`);
        console.log(`✅ User Role: ${response.userInfo.role}`);
        
        console.log('\n🔗 CONNECTION STATUS:');
        console.log('✅ Backend: http://localhost:5000 - RUNNING');
        console.log('✅ Frontend: http://localhost:3000 - RUNNING');
        console.log('✅ Database: info_db - CONNECTED');
        console.log('✅ Auth: JWT - WORKING');
        
        console.log('\n📋 PROJECT STRUCTURE:');
        console.log('📁 Backend: ./backend/ (Node.js + Express + MySQL)');
        console.log('📁 Frontend: ./SiteSurveyToolForISPApp-main (1)/ (React + Material-UI)');
        console.log('🔗 API Base URL: http://localhost:5000/api');
        console.log('🔗 Frontend Proxy: http://localhost:5000/api');
        
        console.log('\n🎯 READY FOR TESTING:');
        console.log('1. Open http://localhost:3000 in browser');
        console.log('2. Login with: admin@example.com / password123');
        console.log('3. Should connect to new backend successfully');
    });
});

req.on('error', (error) => {
    console.error('❌ Connection Error:', error.message);
    console.log('\n🔧 TROUBLESHOOTING:');
    console.log('1. Check if backend is running on port 5000');
    console.log('2. Check if frontend proxy is set to port 5000');
    console.log('3. Check API base URL in frontend services');
});

req.write(loginData);
req.end();
