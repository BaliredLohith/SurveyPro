import { useState, useEffect } from 'react';
import { dashboardAPI } from '../services/apiService';

export const useDashboardData = () => {
  const [stats, setStats] = useState(null);
  const [trends, setTrends] = useState([]);
  const [activities, setActivities] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard statistics
  const fetchStats = async () => {
    try {
      const response = await dashboardAPI.getStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
      setError(err.message);
    }
  };

  // Fetch trends data
  const fetchTrends = async (period = '6months') => {
    try {
      const response = await dashboardAPI.getTrends(period);
      if (response.success) {
        setTrends(response.data);
      }
    } catch (err) {
      console.error('Error fetching trends:', err);
    }
  };

  // Fetch activities
  const fetchActivities = async (limit = 20) => {
    try {
      const response = await dashboardAPI.getActivities(limit);
      if (response.success) {
        setActivities(response.data);
      }
    } catch (err) {
      console.error('Error fetching activities:', err);
    }
  };

  // Fetch alerts
  const fetchAlerts = async (limit = 10, unreadOnly = false) => {
    try {
      const response = await dashboardAPI.getAlerts(limit, unreadOnly);
      if (response.success) {
        setAlerts(response.data);
      }
    } catch (err) {
      console.error('Error fetching alerts:', err);
    }
  };

  // Mark alert as read
  const markAlertAsRead = async (alertId) => {
    try {
      await dashboardAPI.markAlertAsRead(alertId);
      // Update local state
      setAlerts(prev => 
        prev.map(alert => 
          alert.id === alertId ? { ...alert, is_read: true } : alert
        )
      );
    } catch (err) {
      console.error('Error marking alert as read:', err);
    }
  };

  // Refresh all data
  const refreshAll = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await Promise.all([
        fetchStats(),
        fetchTrends(),
        fetchActivities(),
        fetchAlerts()
      ]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    refreshAll();
  }, []);

  return {
    stats,
    trends,
    activities,
    alerts,
    loading,
    error,
    refreshAll,
    fetchStats,
    fetchTrends,
    fetchActivities,
    fetchAlerts,
    markAlertAsRead,
  };
};
