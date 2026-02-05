import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useDemoMode } from '../../hooks/useDemoMode';
import SurveyModal from '../modals/SurveyModal';
import { 
  Building2, 
  Users, 
  FileText, 
  TrendingUp,
  MapPin,
  CheckCircle,
  Clock,
  AlertCircle,
  Wifi,
  Plus,
  BarChart3,
  Home,
  AlertTriangle,
  Info,
  LogOut,
  ChevronDown,
  User,
  Settings
} from 'lucide-react';

const EnhancedSurveyStats = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { getFallbackData, isDemoMode } = useDemoMode();
  
  // Get demo data for dashboard
  const dashboardStats = getFallbackData('dashboardStats') || {
    totalOrganizations: 0,
    totalProperties: 0,
    totalSurveys: 0,
    completedSurveys: 0,
    pendingReviewSurveys: 0,
    inProgressSurveys: 0
  };

  const handleLogout = () => {
    // Use existing logout function from auth context
    logout();
  };

  // Handle Quick Action buttons
  const handleNewSurvey = () => {
    setIsSurveyModalOpen(true);
  };

  const handleSurveyCreated = (surveyData) => {
    // Show success message or navigate to survey details
    console.log('Survey created:', surveyData);
    // You can add a toast notification here
  };

  const handleAddProperty = () => {
    navigate('/properties?action=new');
  };

  const handleAddBuilding = () => {
    navigate('/buildings?action=new');
  };

  const handleGenerateReport = () => {
    navigate('/reports?action=generate');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">SurveyPro</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user?.name?.charAt(0) || user?.email?.charAt(0) || 'A'}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {user?.name || user?.email || 'Admin'}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.name || 'Admin User'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user?.email || 'admin@example.com'}
                      </p>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <aside className="w-64 bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 shadow-sm">
          <nav className="p-4 space-y-2">
            <Link to="/dashboard" className="sidebar-item active flex items-center space-x-3 bg-blue-50 rounded-xl px-3 py-3 relative group transition-all duration-200 ease-out">
              <div className="absolute left-0 top-2 bottom-2 w-1 bg-blue-500 rounded-r"></div>
              <div className="sidebar-icon bg-blue-100 p-2 rounded-lg">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-blue-600">Dashboard</span>
            </Link>
            
            <div className="border-t border-gray-200 my-3 opacity-30"></div>
            
            <Link to="/properties" className="sidebar-item flex items-center space-x-3 text-gray-600 rounded-xl px-3 py-3 relative group transition-all duration-200 ease-out hover:bg-pink-50 hover:translate-x-1">
              <div className="sidebar-icon bg-gray-100 p-2 rounded-lg group-hover:bg-pink-100 transition-colors">
                <Building2 className="w-5 h-5 text-gray-600 group-hover:text-pink-600 transition-colors" />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-pink-600 transition-colors">Properties</span>
            </Link>
            
            <Link to="/buildings" className="sidebar-item flex items-center space-x-3 text-gray-600 rounded-xl px-3 py-3 relative group transition-all duration-200 ease-out hover:bg-green-50 hover:translate-x-1">
              <div className="sidebar-icon bg-gray-100 p-2 rounded-lg group-hover:bg-green-100 transition-colors">
                <Home className="w-5 h-5 text-gray-600 group-hover:text-green-600 transition-colors" />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors">Buildings</span>
            </Link>
            
            <Link to="/surveys" className="sidebar-item flex items-center space-x-3 text-gray-600 rounded-xl px-3 py-3 relative group transition-all duration-200 ease-out hover:bg-purple-50 hover:translate-x-1">
              <div className="sidebar-icon bg-gray-100 p-2 rounded-lg group-hover:bg-purple-100 transition-colors">
                <FileText className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors" />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors">Surveys</span>
            </Link>
            
            <div className="border-t border-gray-200 my-3 opacity-30"></div>
            
            <Link to="/users" className="sidebar-item flex items-center space-x-3 text-gray-600 rounded-xl px-3 py-3 relative group transition-all duration-200 ease-out hover:bg-orange-50 hover:translate-x-1">
              <div className="sidebar-icon bg-gray-100 p-2 rounded-lg group-hover:bg-orange-100 transition-colors">
                <Users className="w-5 h-5 text-gray-600 group-hover:text-orange-600 transition-colors" />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">Users</span>
            </Link>
            
            <Link to="/reports" className="sidebar-item flex items-center space-x-3 text-gray-600 rounded-xl px-3 py-3 relative group transition-all duration-200 ease-out hover:bg-red-50 hover:translate-x-1">
              <div className="sidebar-icon bg-gray-100 p-2 rounded-lg group-hover:bg-red-100 transition-colors">
                <TrendingUp className="w-5 h-5 text-gray-600 group-hover:text-red-600 transition-colors" />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-red-600 transition-colors">Reports</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Site Survey Tool</h2>
              <p className="text-gray-600">Manage your ISP site surveys efficiently</p>
            </div>

            {/* Quick Actions Bar */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={handleNewSurvey}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-medium">New Survey</span>
                </button>
                <button 
                  onClick={handleAddProperty}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Building2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Add Property</span>
                </button>
                <button 
                  onClick={handleAddBuilding}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Home className="w-4 h-4" />
                  <span className="text-sm font-medium">Add Building</span>
                </button>
                <button 
                  onClick={handleGenerateReport}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-sm font-medium">Generate Report</span>
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow border-2 border-sky-200 hover:border-sky-400 hover:shadow-sky-200/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="bg-blue-100 rounded-lg p-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-sm text-green-600 font-medium">+12%</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {dashboardStats.totalProperties || 0}
                </h3>
                <p className="text-gray-600 text-sm">Total Properties</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow border-2 border-sky-200 hover:border-sky-400 hover:shadow-sky-200/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="bg-green-100 rounded-lg p-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-sm text-green-600 font-medium">+8%</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {dashboardStats.totalSurveys || 0}
                </h3>
                <p className="text-gray-600 text-sm">Total Surveys</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow border-2 border-sky-200 hover:border-sky-400 hover:shadow-sky-200/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="bg-yellow-100 rounded-lg p-2">
                    <Clock className="w-5 h-5 text-yellow-600" />
                  </div>
                  <span className="text-sm text-red-600 font-medium">-3%</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {dashboardStats.inProgressSurveys || 0}
                </h3>
                <p className="text-gray-600 text-sm">Pending Surveys</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow border-2 border-sky-200 hover:border-sky-400 hover:shadow-sky-200/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="bg-red-100 rounded-lg p-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <span className="text-sm text-gray-600 font-medium">0%</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {dashboardStats.pendingReviewSurveys || 0}
                </h3>
                <p className="text-gray-600 text-sm">Issues Found</p>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Line Chart - 70% */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border-2 border-blue-200 hover:border-blue-400 hover:shadow-blue-200/50 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Survey Completion Trend</h3>
                <div className="h-64">
                  <svg viewBox="0 0 400 200" className="w-full h-full">
                    {/* Grid Lines */}
                    <g className="text-gray-200">
                      <line x1="40" y1="20" x2="40" y2="160" stroke="currentColor" strokeWidth="1" />
                      <line x1="40" y1="160" x2="380" y2="160" stroke="currentColor" strokeWidth="1" />
                      <line x1="40" y1="40" x2="380" y2="40" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
                      <line x1="40" y1="80" x2="380" y2="80" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
                      <line x1="40" y1="120" x2="380" y2="120" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
                    </g>
                    
                    {/* Y-axis labels */}
                    <g className="text-xs text-gray-500">
                      <text x="30" y="25" textAnchor="end">150</text>
                      <text x="30" y="45" textAnchor="end">120</text>
                      <text x="30" y="85" textAnchor="end">80</text>
                      <text x="30" y="125" textAnchor="end">40</text>
                      <text x="30" y="165" textAnchor="end">0</text>
                    </g>
                    
                    {/* X-axis labels */}
                    <g className="text-xs text-gray-500">
                      <text x="70" y="180" textAnchor="middle">Jan</text>
                      <text x="130" y="180" textAnchor="middle">Feb</text>
                      <text x="190" y="180" textAnchor="middle">Mar</text>
                      <text x="250" y="180" textAnchor="middle">Apr</text>
                      <text x="310" y="180" textAnchor="middle">May</text>
                      <text x="370" y="180" textAnchor="middle">Jun</text>
                    </g>
                    
                    {/* Line Chart */}
                    <polyline
                      points="70,140 130,120 190,100 250,85 310,60 370,45"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    
                    {/* Area under line */}
                    <polygon
                      points="70,140 130,120 190,100 250,85 310,60 370,45 370,160 70,160"
                      fill="url(#areaGradient)"
                      opacity="0.3"
                    />
                    
                    {/* Data points */}
                    <g className="fill-white stroke-blue-500">
                      <circle cx="70" cy="140" r="4" strokeWidth="2" />
                      <circle cx="130" cy="120" r="4" strokeWidth="2" />
                      <circle cx="190" cy="100" r="4" strokeWidth="2" />
                      <circle cx="250" cy="85" r="4" strokeWidth="2" />
                      <circle cx="310" cy="60" r="4" strokeWidth="2" />
                      <circle cx="370" cy="45" r="4" strokeWidth="2" />
                    </g>
                    
                    {/* Gradients */}
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#10B981" />
                      </linearGradient>
                      <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Donut Chart - 30% */}
              <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-blue-200 hover:border-blue-400 hover:shadow-blue-200/50 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Survey Status Distribution</h3>
                <div className="h-64 flex flex-col items-center justify-center">
                  <div className="relative w-32 h-32 mb-4">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-green-500"></div>
                    <div className="absolute inset-2 rounded-full bg-white"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-900">142</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">Completed (142)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-gray-600">Pending (18)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-gray-600">Issues (3)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Operational Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow border-2 border-sky-200 hover:border-sky-400 hover:shadow-sky-200/50">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 rounded-lg p-2">
                    <Home className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Active Buildings</h4>
                    <p className="text-2xl font-bold text-gray-900">47</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow border-2 border-sky-200 hover:border-sky-400 hover:shadow-sky-200/50">
                <div className="flex items-center space-x-3">
                  <div className="bg-red-100 rounded-lg p-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Buildings with Issues</h4>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow border-2 border-sky-200 hover:border-sky-400 hover:shadow-sky-200/50">
                <div className="flex items-center space-x-3">
                  <div className="bg-yellow-100 rounded-lg p-2">
                    <MapPin className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Properties Without Surveys</h4>
                    <p className="text-2xl font-bold text-gray-900">8</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow border-2 border-sky-200 hover:border-sky-400 hover:shadow-sky-200/50">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 rounded-lg p-2">
                    <Plus className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Recently Added Properties</h4>
                    <p className="text-2xl font-bold text-gray-900">5</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity and System Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity - Timeline Style */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border-2 border-sky-200 hover:border-sky-400 hover:shadow-sky-200/50 transition-all duration-200">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 group hover:bg-gray-50 p-3 rounded-lg transition-colors">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full ring-4 ring-green-50"></div>
                        <div className="w-0.5 h-16 bg-green-100"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <p className="text-sm font-medium text-gray-900">Survey completed at Downtown Office</p>
                        </div>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 group hover:bg-gray-50 p-3 rounded-lg transition-colors">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full ring-4 ring-blue-50"></div>
                        <div className="w-0.5 h-16 bg-blue-100"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <Building2 className="w-4 h-4 text-blue-600" />
                          <p className="text-sm font-medium text-gray-900">New property added: Tech Park Building</p>
                        </div>
                        <p className="text-xs text-gray-500">5 hours ago</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 group hover:bg-gray-50 p-3 rounded-lg transition-colors">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full ring-4 ring-yellow-50"></div>
                        <div className="w-0.5 h-16 bg-yellow-100"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <AlertTriangle className="w-4 h-4 text-yellow-600" />
                          <p className="text-sm font-medium text-gray-900">Network issue detected at Main Street</p>
                        </div>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* System Alerts Panel */}
              <div className="bg-white rounded-xl shadow-sm border-2 border-sky-200 hover:border-sky-400 hover:shadow-sky-200/50 transition-all duration-200">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">3 properties need survey</p>
                      <p className="text-xs text-gray-600">Pending for over 7 days</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">1 building has network issue</p>
                      <p className="text-xs text-gray-600">Critical connectivity problem</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <Clock className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">5 surveys overdue</p>
                      <p className="text-xs text-gray-600">Requires immediate attention</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">System maintenance scheduled</p>
                      <p className="text-xs text-gray-600">Tomorrow 2:00 AM - 4:00 AM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {/* Survey Modal */}
      <SurveyModal
        isOpen={isSurveyModalOpen}
        onClose={() => setIsSurveyModalOpen(false)}
        onSuccess={handleSurveyCreated}
      />
    </div>
  );
};

export default EnhancedSurveyStats;
