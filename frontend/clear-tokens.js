// Clear old tokens that might be causing login issues
localStorage.removeItem('accessToken');
localStorage.removeItem('refreshToken');
localStorage.removeItem('userInfo');
console.log('🧹 Cleared old tokens from localStorage');

// Test API connection without auth
fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'admin@example.com',
    password: 'admin123'
  })
})
.then(response => response.json())
.then(data => {
  console.log('✅ Direct API test successful:', data);
})
.catch(error => {
  console.error('❌ Direct API test failed:', error);
});
