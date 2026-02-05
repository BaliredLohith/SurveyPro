import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../../context/AuthContext';
import { 
  Eye, 
  Users, 
  Calendar, 
  CheckCircle, 
  Clock,
  TrendingUp,
  Target,
  BarChart3,
  FileText,
  AlertCircle,
  Filter,
  Search
} from 'lucide-react';

const ReviewerActivity = () => {
  const { user, logout } = useAuth();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockActivities = [
        {
          id: 1,
          type: 'review_completed',
          title: 'Completed survey review',
          description: 'Approved Tech Park Building A site survey',
          timestamp: '2024-02-10T14:30:00Z',
          status: 'completed',
          priority: 'high'
        },
        {
          id: 2,
          type: 'review_assigned',
          title: 'Assigned new survey for review',
          description: 'Office Complex B floor plan assigned for review',
          timestamp: '2024-02-10T11:15:00Z',
          status: 'completed',
          priority: 'medium'
        },
        {
          id: 3,
          type: 'review_rejected',
          title: 'Rejected survey submission',
          description: 'Industrial Site C survey rejected due to incomplete data',
          timestamp: '2024-02-09T16:45:00Z',
          status: 'completed',
          priority: 'high'
        },
        {
          id: 4,
          type: 'review_approved',
          title: 'Approved survey submission',
          description: 'Retail Center D floor plan approved with minor corrections',
          timestamp: '2024-02-09T14:20:00Z',
          status: 'completed',
          priority: 'medium'
        },
        {
          id: 5,
          type: 'remarks_added',
          title: 'Added review remarks',
          description: 'Added detailed remarks for Tech Park Building A survey',
          timestamp: '2024-02-09T11:00:00Z',
          status: 'completed',
          priority: 'low'
        },
        {
          id: 6,
          type: 'review_started',
          title: 'Started survey review',
          description: 'Began review process for Office Complex B floor plan',
          timestamp: '2024-02-08T15:30:00Z',
          status: 'completed',
          priority: 'medium'
        }
      ];
      setActivities(mockActivities);
    } catch (error) {
      console.error('Error loading activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredActivities = activities.filter(activity => {
    const matchesFilter = filter === 'all' || activity.type === filter;
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getActivityIcon = (type) => {
    switch (type) {
      case 'review_completed': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'review_assigned': return <Users className="w-5 h-5 text-blue-600" />;
      case 'review_rejected': return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'review_approved': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'remarks_added': return <FileText className="w-5 h-5 text-purple-600" />;
      case 'review_started': return <Eye className="w-5 h-5 text-indigo-600" />;
      default: return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  const stats = {
    totalActivities: activities.length,
    completedToday: activities.filter(a => {
      const date = new Date(a.timestamp);
      const today = new Date();
      return date.toDateString() === today.toDateString();
    }).length,
    highPriority: activities.filter(a => a.priority === 'high').length,
    thisWeek: activities.filter(a => {
      const date = new Date(a.timestamp);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return date >= weekAgo;
    }).length
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Activity Log</h1>
            </div>
            <button
              onClick={() => window.history.back()}
              className="text-gray-600 hover:text-gray-900"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      <main className="h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="p-6">
          <div className="max-w-6xl mx-auto">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Activities</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalActivities}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Completed Today</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.completedToday}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">High Priority</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.highPriority}</p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">This Week</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.thisWeek}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search activities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                  />
                </div>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Activities</option>
                  <option value="review_completed">Reviews Completed</option>
                  <option value="review_assigned">Reviews Assigned</option>
                  <option value="review_rejected">Reviews Rejected</option>
                  <option value="review_approved">Reviews Approved</option>
                  <option value="remarks_added">Remarks Added</option>
                  <option value="review_started">Reviews Started</option>
                </select>
              </div>
            </div>

            {/* Activities List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Review Activities</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {loading ? (
                  <div className="px-6 py-4 text-center text-gray-500">
                    Loading activities...
                  </div>
                ) : filteredActivities.length === 0 ? (
                  <div className="px-6 py-4 text-center text-gray-500">
                    No activities found
                  </div>
                ) : (
                  filteredActivities.map((activity) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="px-6 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(activity.priority)}`}>
                              {activity.priority}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatTime(activity.timestamp)}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReviewerActivity;
