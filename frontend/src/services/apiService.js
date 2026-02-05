// Comprehensive API Service for SurveyPro Backend Integration
import api from './api';

// Authentication API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
};

// Dashboard API
export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
  getTrends: (period = '6months') => api.get(`/dashboard/trends?period=${period}`),
  getActivities: (limit = 20) => api.get(`/dashboard/activities?limit=${limit}`),
  getAlerts: (limit = 10, unreadOnly = false) => {
    const params = new URLSearchParams({
      limit: limit.toString(),
      ...(unreadOnly && { unread_only: 'true' }),
    });
    return api.get(`/dashboard/alerts?${params}`);
  },
  markAlertAsRead: (alertId) => api.put(`/dashboard/alerts/${alertId}/read`),
};

// Properties API
export const propertiesAPI = {
  getAll: (params = {}) => {
    const queryParams = new URLSearchParams(params);
    return api.get(`/properties/admin?${queryParams}`);
  },
  getById: (id) => api.get(`/properties/${id}`),
  create: (propertyData) => api.post('/properties', propertyData),
  update: (id, propertyData) => api.put(`/properties/${id}`, propertyData),
  delete: (id) => api.delete(`/properties/${id}`),
  getStats: () => api.get('/properties/stats/overview'),
};

// Buildings API
export const buildingsAPI = {
  getAll: (params = {}) => {
    const queryParams = new URLSearchParams(params);
    return api.get(`/buildings?${queryParams}`);
  },
  getById: (id) => api.get(`/buildings/${id}`),
  create: (buildingData) => api.post('/buildings', buildingData),
  update: (id, buildingData) => api.put(`/buildings/${id}`, buildingData),
  delete: (id) => api.delete(`/buildings/${id}`),
  getByProperty: (propertyId) => api.get(`/buildings/property/${propertyId}`)
};

// Floors API
export const floorsAPI = {
  getAll: (params = {}) => {
    const queryParams = new URLSearchParams(params);
    return api.get(`/floors?${queryParams}`);
  },
  getById: (id) => api.get(`/floors/${id}`),
  create: (floorData) => api.post('/floors', floorData),
  update: (id, floorData) => api.put(`/floors/${id}`, floorData),
  delete: (id) => api.delete(`/floors/${id}`),
};

// Spaces API
export const spacesAPI = {
  getAll: (params = {}) => {
    const queryParams = new URLSearchParams(params);
    return api.get(`/spaces?${queryParams}`);
  },
  getById: (id) => api.get(`/spaces/${id}`),
  create: (spaceData) => api.post('/spaces', spaceData),
  update: (id, spaceData) => api.put(`/spaces/${id}`, spaceData),
  delete: (id) => api.delete(`/spaces/${id}`),
};

// Surveys API
export const surveysAPI = {
  getAll: (params = {}) => {
    const queryParams = new URLSearchParams(params);
    return api.get(`/surveys?${queryParams}`);
  },
  getById: (id) => api.get(`/surveys/${id}`),
  create: (surveyData) => api.post('/surveys', surveyData),
  updateStatus: (id, statusData) => api.put(`/surveys/${id}/status`, statusData),
  update: (id, surveyData) => api.put(`/surveys/${id}`, surveyData),
  delete: (id) => api.delete(`/surveys/${id}`),
  addResponse: (surveyId, responseData) => api.post(`/surveys/${surveyId}/responses`, responseData),
  getStats: () => api.get('/surveys/stats/overview'),
};

// Users API
export const usersAPI = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  create: (userData) => api.post('/users', userData),
  update: (id, userData) => api.put(`/users/${id}`, userData),
  delete: (id) => api.delete(`/users/${id}`),
};

// Reports API
export const reportsAPI = {
  getAll: () => api.get('/reports'),
  generate: (reportConfig) => api.post('/reports/generate', reportConfig),
  export: (type, params = {}) => {
    const queryParams = new URLSearchParams(params);
    return api.get(`/reports/export/${type}?${queryParams}`);
  },
};

// Settings API
export const settingsAPI = {
  getAll: () => api.get('/settings'),
  update: (settings) => api.put('/settings', { settings }),
};

export default {
  authAPI,
  dashboardAPI,
  propertiesAPI,
  buildingsAPI,
  floorsAPI,
  spacesAPI,
  surveysAPI,
  usersAPI,
  reportsAPI,
  settingsAPI,
};
