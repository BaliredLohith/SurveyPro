import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Calendar,
  Award,
  Target,
  Activity,
  BarChart3
} from 'lucide-react';

const EngineerActivity = () => {
  const [stats, setStats] = useState({
    surveysCompleted: 0,
    reportsSubmitted: 0,
    averageCompletionTime: 0,
    performanceScore: 0
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    // Load activity data (mock data for now)
    setStats({
      surveysCompleted: 23,
      reportsSubmitted: 21,
      averageCompletionTime: 2.5, // days
      performanceScore: 92 // percentage
    });

    setRecentActivity([
      {
        id: 1,
        type: 'survey_completed',
        title: 'Network Feasibility Survey',
        location: 'Tech Park Campus - Tower A',
        date: '2024-02-03',
        time: '14:30',
        status: 'completed'
      },
      {
        id: 2,
        type: 'report_submitted',
        title: 'Fiber Installation Report',
        location: 'Corporate Plaza - Tower B',
        date: '2024-02-02',
        time: '11:45',
        status: 'submitted'
      },
      {
        id: 3,
        type: 'survey_completed',
        title: 'Site Survey',
        location: 'Medical Center Plaza',
        date: '2024-02-01',
        time: '16:20',
        status: 'completed'
      },
      {
        id: 4,
        type: 'login',
        title: 'System Login',
        location: 'Hyderabad Zone',
        date: '2024-02-04',
        time: '09:00',
        status: 'login'
      }
    ]);

    setPerformanceData([
      { month: 'Jan', completed: 8, target: 10 },
      { month: 'Feb', completed: 15, target: 12 },
      { month: 'Mar', completed: 12, target: 15 },
      { month: 'Apr', completed: 18, target: 14 },
      { month: 'May', completed: 20, target: 18 },
      { month: 'Jun', completed: 23, target: 20 }
    ]);
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'survey_completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'report_submitted':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case 'login':
        return <Activity className="w-4 h-4 text-gray-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'survey_completed':
        return 'bg-green-50 border-green-200';
      case 'report_submitted':
        return 'bg-blue-50 border-blue-200';
      case 'login':
        return 'bg-gray-50 border-gray-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">My Activity</h1>
            </div>
            <div className="text-sm text-gray-500">
              Performance & Activity Tracking
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="h-full overflow-y-auto pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Surveys Completed</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.surveysCompleted}</p>
                  <p className="text-xs text-green-600 mt-1">+12% this month</p>
                </div>
                <div className="bg-green-100 p-4 rounded-xl">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Reports Submitted</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.reportsSubmitted}</p>
                  <p className="text-xs text-blue-600 mt-1">On time</p>
                </div>
                <div className="bg-blue-100 p-4 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Completion</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.averageCompletionTime}</p>
                  <p className="text-xs text-gray-500 mt-1">days</p>
                </div>
                <div className="bg-orange-100 p-4 rounded-xl">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Performance Score</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.performanceScore}%</p>
                  <p className="text-xs text-green-600 mt-1">Excellent</p>
                </div>
                <div className="bg-purple-100 p-4 rounded-xl">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Performance Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <span>Monthly Performance</span>
            </h3>
            
            <div className="space-y-4">
              {performanceData.map((data, index) => (
                <div key={data.month} className="flex items-center space-x-4">
                  <div className="w-16 text-sm font-medium text-gray-600">{data.month}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                        <div 
                          className="bg-blue-600 h-6 rounded-full flex items-center justify-end pr-2"
                          style={{ width: `${(data.completed / data.target) * 100}%` }}
                        >
                          <span className="text-xs text-white font-medium">{data.completed}</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">/ {data.target}</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {Math.round((data.completed / data.target) * 100)}%
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>Recent Activity</span>
            </h3>
            
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`flex items-center space-x-4 p-4 rounded-lg border ${getActivityColor(activity.type)}`}
                >
                  <div className="flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                    <p className="text-sm text-gray-500">{activity.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-900">{activity.date}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EngineerActivity;
