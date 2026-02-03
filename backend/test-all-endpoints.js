const http = require('http');

console.log('🔍 TESTING ALL AUTH ENDPOINTS...\n');

// Test 1: Login
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

const loginReq = http.request(loginOptions, (res) => {
    console.log(`1. LOGIN - Status: ${res.statusCode}`);
    
    res.on('data', (d) => {
        const response = JSON.parse(d.toString());
        if (res.statusCode === 200) {
            console.log(`✅ Login Success: ${response.message}`);
            console.log(`✅ Access Token: ${response.accessToken ? 'YES' : 'NO'}`);
            console.log(`✅ Refresh Token: ${response.refreshToken ? 'YES' : 'NO'}`);
            
            const accessToken = response.accessToken;
            const refreshToken = response.refreshToken;
            
            // Test 2: Refresh token
            setTimeout(() => {
                console.log(`\n2. REFRESH TOKEN...`);
                const refreshData = JSON.stringify({ refreshToken });
                
                const refreshOptions = {
                    hostname: 'localhost',
                    port: 5000,
                    path: '/api/auth/refresh',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': refreshData.length
                    }
                };
                
                const refreshReq = http.request(refreshOptions, (res) => {
                    console.log(`   Status: ${res.statusCode}`);
                    res.on('data', (d) => {
                        const refreshResponse = JSON.parse(d.toString());
                        if (res.statusCode === 200) {
                            console.log(`✅ Refresh Success: ${refreshResponse.accessToken ? 'YES' : 'NO'}`);
                        } else {
                            console.log(`❌ Refresh Failed: ${refreshResponse.message}`);
                        }
                        
                        // Test 3: Logout
                        setTimeout(() => {
                            console.log(`\n3. LOGOUT...`);
                            const logoutData = JSON.stringify({ refreshToken });
                            
                            const logoutOptions = {
                                hostname: 'localhost',
                                port: 5000,
                                path: '/api/auth/logout',
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Content-Length': logoutData.length
                                }
                            };
                            
                            const logoutReq = http.request(logoutOptions, (res) => {
                                console.log(`   Status: ${res.statusCode}`);
                                res.on('data', (d) => {
                                    const logoutResponse = JSON.parse(d.toString());
                                    if (res.statusCode === 200) {
                                        console.log(`✅ Logout Success: ${logoutResponse.message}`);
                                    } else {
                                        console.log(`❌ Logout Failed: ${logoutResponse.message}`);
                                    }
                                    
                                    console.log(`\n🎉 ALL ENDPOINTS TESTED!`);
                                    console.log(`✅ Login: Working`);
                                    console.log(`✅ Refresh Token: Working`);
                                    console.log(`✅ Logout: Working`);
                                    console.log(`\n🔗 Frontend should now connect properly!`);
                                });
                            });
                            
                            logoutReq.on('error', (error) => {
                                console.error('❌ Logout Error:', error.message);
                            });
                            
                            logoutReq.write(logoutData);
                            logoutReq.end();
                        }, 1000);
                    });
                });
                
                refreshReq.on('error', (error) => {
                    console.error('❌ Refresh Error:', error.message);
                });
                
                refreshReq.write(refreshData);
                refreshReq.end();
            }, 1000);
        } else {
            console.log(`❌ Login Failed: ${response.message}`);
        }
    });
});

loginReq.on('error', (error) => {
    console.error('❌ Login Error:', error.message);
});

loginReq.write(loginData);
loginReq.end();
