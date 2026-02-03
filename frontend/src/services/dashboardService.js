import api from './api';

export const dashboardService = {
  // Get dashboard statistics
  async getDashboardStats(organizationId = null) {
    const params = organizationId ? { organizationId } : {};
    const response = await api.get('/dashboard/stats', { params });
    return response.data;
  },

  // Get survey status breakdown
  async getSurveyStatuses(organizationId = null) {
    const params = organizationId ? { organizationId } : {};
    const response = await api.get('/dashboard/surveys/status', { params });
    return response.data;
  },

  // Get user activity statistics
  async getUserActivityStats(organizationId = null) {
    const params = organizationId ? { organizationId } : {};
    const response = await api.get('/dashboard/users/activity', { params });
    return response.data;
  },

  // Get property statistics
  async getPropertyStats(organizationId = null) {
    const params = organizationId ? { organizationId } : {};
    const response = await api.get('/dashboard/properties/stats', { params });
    return response.data;
  },

  // Helper method to get all dashboard data
  async getAllDashboardData(organizationId = null) {
    const [stats, surveyStatuses, userActivity, propertyStats] = await Promise.all([
      this.getDashboardStats(organizationId),
      this.getSurveyStatuses(organizationId),
      this.getUserActivityStats(organizationId),
      this.getPropertyStats(organizationId),
    ]);

    return {
      stats,
      surveyStatuses,
      userActivity,
      propertyStats,
    };
  },

  // Get recent activity (placeholder - would need backend implementation)
  async getRecentActivity(limit = 10) {
    // This would need to be implemented in the backend
    const response = await api.get('/dashboard/recent-activity', {
      params: { limit },
    });
    return response.data;
  },

  // Get performance metrics
  async getPerformanceMetrics(organizationId = null, timeRange = '30d') {
    const params = { timeRange };
    if (organizationId) params.organizationId = organizationId;
    
    const response = await api.get('/dashboard/performance', { params });
    return response.data;
  },

  // Get survey completion trends
  async getSurveyTrends(organizationId = null, timeRange = '30d') {
    const params = { timeRange };
    if (organizationId) params.organizationId = organizationId;
    
    const response = await api.get('/dashboard/survey-trends', { params });
    return response.data;
  },
};
