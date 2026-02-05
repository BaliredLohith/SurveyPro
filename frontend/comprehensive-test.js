// Comprehensive connection test
console.log('🔍 COMPREHENSIVE CONNECTION TEST');
console.log('================================');

// Test 1: Basic connectivity
fetch('http://localhost:5000/health')
  .then(response => response.json())
  .then(data => {
    console.log('✅ Health Check:', data);
  })
  .catch(error => {
    console.error('❌ Health Check Failed:', error);
  });

// Test 2: Login endpoint accessibility
fetch('http://localhost:5000/api/auth/login', {
  method: 'OPTIONS' // Test preflight
})
  .then(response => {
    console.log('✅ CORS Preflight:', response.status, response.headers);
  })
  .catch(error => {
    console.error('❌ CORS Preflight Failed:', error);
  });

// Test 3: Actual login attempt
fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({
    email: 'admin@example.com',
    password: 'admin123'
  })
})
  .then(response => {
    console.log('✅ Login Response Status:', response.status);
    console.log('✅ Login Response Headers:', response.headers);
    return response.json();
  })
  .then(data => {
    console.log('✅ Login Response Data:', data);
    
    // Test if we can extract the token
    if (data.accessToken) {
      console.log('✅ Token Extracted:', data.accessToken.substring(0, 20) + '...');
      
      // Test protected endpoint with token
      fetch('http://localhost:5000/api/users', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + data.accessToken,
          'Content-Type': 'application/json'
        }
      })
      .then(usersResponse => usersResponse.json())
      .then(usersData => {
        console.log('✅ Protected API Success:', usersData);
      })
      .catch(usersError => {
        console.error('❌ Protected API Failed:', usersError);
      });
    } else {
      console.error('❌ No token in response');
    }
  })
  .catch(error => {
    console.error('❌ Login Failed:', error);
  });

console.log('================================');
console.log('🔍 END COMPREHENSIVE TEST');
