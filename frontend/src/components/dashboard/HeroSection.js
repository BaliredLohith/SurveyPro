import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, BarChart3, Zap } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="text-center mb-12">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Survey Smarter,
            <span className="text-blue-600"> Deploy Faster</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Streamlining ISP site surveys from planning to deployment by capturing accurate location, 
            network feasibility, and infrastructure data.
          </p>
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

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-4 bg-white rounded-full shadow-md px-6 py-3 border border-gray-200">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">
                Ready to streamline your ISP deployments?
              </span>
            </div>
            <Link 
              to="/dashboard" 
              className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors duration-200 inline-block"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-gray-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">500+</div>
            <div className="text-sm text-gray-600">Sites Surveyed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">40%</div>
            <div className="text-sm text-gray-600">Faster Deployment</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">99%</div>
            <div className="text-sm text-gray-600">Data Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">24/7</div>
            <div className="text-sm text-gray-600">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
