import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, BarChart3 } from 'lucide-react';

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section Content */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Message
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Welcome back!</h2>
            <p className="text-lg text-gray-600">Ready to streamline your ISP site surveys?</p>
          </div> */}

          {/* Main Content */}
          <div className="text-center">
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Survey Smarter,
              <span className="text-blue-600"> Deploy Faster</span>
            </h1>
            
            {/* Subheading */}
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Streamlining ISP site surveys from planning to deployment by capturing accurate location, 
              network feasibility, and infrastructure data.
            </p>

            {/* Primary CTA Button */}
            <div className="mb-12">
              <Link 
                to="/dashboard" 
                className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-200 inline-flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span>Go to Dashboard</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Card 1: Smart Site Surveys */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 rounded-lg p-3 mr-4">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Smart Site Surveys
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Capture location, network feasibility, and infrastructure data accurately through 
                a structured digital survey process.
              </p>
              
              {/* Key Features */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                  GPS-based location tracking
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                  Network feasibility analysis
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                  Infrastructure assessment
                </div>
              </div>
            </div>

            {/* Card 2: Deployment-Ready Insights */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 rounded-lg p-3 mr-4">
                  <BarChart3 className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Deployment-Ready Insights
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Convert survey data into clear, actionable insights for faster planning and 
                ISP network rollout.
              </p>
              
              {/* Key Features */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-3"></div>
                  Automated report generation
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-3"></div>
                  Deployment recommendations
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-3"></div>
                  ROI analysis tools
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
