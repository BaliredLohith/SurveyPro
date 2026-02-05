import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { MapPin, BarChart3, ArrowRight, FileText, CheckCircle, Clock } from 'lucide-react';

const EngineerWelcome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  console.log('=== ENGINEER WELCOME PAGE DEBUG ===');
  console.log('User from context:', user);
  console.log('User role:', user?.role);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section Content */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Main Content */}
          <div className="text-center">
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Survey Smarter,
              <span className="text-blue-600"> Deploy Faster</span>
            </h1>
            
            {/* Subheading */}
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Complete assigned surveys efficiently with our field-optimized tools for ISP site surveys.
            </p>

            {/* Primary CTA Button */}
            <div className="mb-12">
              <button
                onClick={() => navigate('/engineer/dashboard')}
                className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-200 inline-flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span>Go to Engineer Dashboard</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Engineer Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Card 1: Assigned Surveys */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 rounded-lg p-3 mr-4">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Assigned Surveys
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                View and manage all surveys assigned to you with priority levels and due dates.
              </p>
              
              {/* Key Features */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                  Priority-based sorting
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                  Due date tracking
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                  Status updates
                </div>
              </div>
            </div>

            {/* Card 2: Field Tools */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 rounded-lg p-3 mr-4">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Field Tools
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                GPS-enabled tools for accurate location tracking and on-site data collection.
              </p>
              
              {/* Key Features */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>
                  GPS auto-detect
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>
                  Offline mode
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>
                  Auto-save data
                </div>
              </div>
            </div>

            {/* Card 3: Performance Tracking */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 rounded-lg p-3 mr-4">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Performance
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Track your survey completion rates and performance metrics in real-time.
              </p>
              
              {/* Key Features */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                  Completion stats
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                  Time tracking
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                  Performance score
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngineerWelcome;
