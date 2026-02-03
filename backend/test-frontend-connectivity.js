const http = require('http');

console.log('🔍 TESTING FRONTEND CONNECTIVITY...\n');

// Test if frontend can reach backend
const testConnectivity = () => {
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/',
        method: 'GET'
    };

    const req = http.request(options, (res) => {
        console.log(`✅ Frontend reachable on port 3000`);
        console.log(`Status: ${res.statusCode}`);
        
        // Test CORS preflight
        const corsOptions = {
            hostname: 'localhost',
            port: 5000,
            path: '/api/auth/login',
            method: 'OPTIONS',
            headers: {
                'Origin': 'http://localhost:3000',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers': 'Content-Type'
            }
        };

        const corsReq = http.request(corsOptions, (corsRes) => {
            console.log(`\n✅ CORS preflight test:`);
            console.log(`Status: ${corsRes.statusCode}`);
            console.log('CORS Headers:');
            Object.keys(corsRes.headers).forEach(key => {
                if (key.toLowerCase().includes('access-control')) {
                    console.log(`  ${key}: ${corsRes.headers[key]}`);
                }
            });
            
            console.log(`\n🎯 If frontend still can't login, check:`);
            console.log(`1. Browser console (F12) for JavaScript errors`);
            console.log(`2. Network tab for failed requests`);
            console.log(`3. Make sure you're using http://localhost:3000`);
            console.log(`4. Try clearing browser cache and cookies`);
            console.log(`5. Check if browser is blocking requests`);
        });
        
        corsReq.on('error', (error) => {
            console.error('❌ CORS test failed:', error.message);
        });
        
        corsReq.end();
    });

    req.on('error', (error) => {
        console.error('❌ Frontend not reachable:', error.message);
        console.log('🔧 Make sure frontend is running on port 3000');
    });

    req.end();
};

// Also test backend directly
const testBackend = () => {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/auth/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Origin': 'http://localhost:3000'
        }
    };

    const loginData = JSON.stringify({
        email: 'admin@example.com',
        password: 'password123'
    });

    const req = http.request(options, (res) => {
        console.log(`\n✅ Backend direct test:`);
        console.log(`Status: ${res.statusCode}`);
        
        res.on('data', (d) => {
            console.log('Response:', d.toString());
        });
    });

    req.on('error', (error) => {
        console.error('❌ Backend test failed:', error.message);
    });

    req.write(loginData);
    req.end();
};

console.log('🚀 Starting connectivity tests...\n');
testConnectivity();
testBackend();
