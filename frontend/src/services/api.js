import axios from 'axios';
import { handleGlobalError, retryRequest } from '../utils/errorHandler';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    // Don't add token for login requests
    if (config.url?.includes('/auth/login')) {
      return config;
    }
    
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh and global errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle authentication errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          });

          const { accessToken } = response.data;
          localStorage.setItem('accessToken', accessToken);

          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh token failed, handle globally
        handleGlobalError(error);
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors globally
    if (error.response) {
      handleGlobalError(error);
    }

    return Promise.reject(error);
  }
);

// Enhanced API methods with retry mechanism
const apiWithRetry = {
  get: (url, config, maxRetries = 3) => 
    retryRequest(() => api.get(url, config), maxRetries),
  
  post: (url, data, config, maxRetries = 1) => 
    retryRequest(() => api.post(url, data, config), maxRetries),
  
  put: (url, data, config, maxRetries = 1) => 
    retryRequest(() => api.put(url, data, config), maxRetries),
  
  delete: (url, config, maxRetries = 1) => 
    retryRequest(() => api.delete(url, config), maxRetries),
  
  patch: (url, data, config, maxRetries = 1) => 
    retryRequest(() => api.patch(url, data, config), maxRetries),
};

// Enhanced API methods with retry mechanism
export const usersAPI = {
  // Get all users
  getUsers: (filters = {}) => {
    const params = new URLSearchParams(filters);
    console.log('🔍 API Call: GET /users?' + params.toString());
    return apiWithRetry.get(`/users?${params}`);
  },

  // Create new user
  createUser: (userData) => {
    return apiWithRetry.post('/users', userData);
  },

  // Update user
  updateUser: (id, userData) => {
    return apiWithRetry.put(`/users/${id}`, userData);
  },

  // Delete user
  deleteUser: (id) => {
    return apiWithRetry.delete(`/users/${id}`);
  },

  // Update user status
  updateUserStatus: (id, status) => {
    return apiWithRetry.patch(`/users/${id}/status`, { status });
  },

  // Reset user password
  resetUserPassword: (id) => {
    return apiWithRetry.post(`/users/${id}/reset-password`);
  },

  // Delete user
  deleteUser: (id) => {
    return apiWithRetry.delete(`/users/${id}`);
  },

  // Get user by ID
  getUserById: (id) => {
    return apiWithRetry.get(`/users/${id}`);
  },
};

// Auth API
export const authAPI = {
  login: (credentials) => {
    return apiWithRetry.post('/auth/login', credentials);
  },

  getProfile: () => {
    return apiWithRetry.get('/auth/profile');
  },

  logout: () => {
    return apiWithRetry.post('/auth/logout');
  },
};

// Password API
export const passwordAPI = {
  changePassword: (passwordData) => {
    return apiWithRetry.post('/password/change-password', passwordData);
  },
};

export default apiWithRetry;
