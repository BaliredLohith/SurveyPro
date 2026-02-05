// Simple login service for debugging
export const simpleAuthService = {
  async login(email, password) {
    try {
      console.log('🔐 Simple login attempt:', { email, password: password.substring(0, 3) + '***' });
      
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        })
      });

      console.log('📡 Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      console.log('📡 Response data:', data);
      
      // Store tokens
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('userInfo', JSON.stringify(data.userInfo));

      console.log('💾 Tokens stored in localStorage');

      return { success: true, userInfo: data.userInfo };
    } catch (error) {
      console.error('❌ Simple login error:', error);
      throw error;
    }
  }
};
