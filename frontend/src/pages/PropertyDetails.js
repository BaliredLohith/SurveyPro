import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  FileText, 
  BarChart3,
  ArrowLeft,
  Home,
  Building,
  Factory,
  GraduationCap,
  Plus,
  Eye,
  Settings,
  Layers,
  Zap,
  Thermometer,
  Activity
} from 'lucide-react';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [buildings, setBuildings] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);

  // Mock data for demonstration
  const mockProperty = {
    id: 1,
    name: 'Tech Park Campus',
    type: 'campus',
    buildings: 12,
    floors: 48,
    spaces: 286,
    surveys: 156,
    address: '1234 Innovation Drive, Tech City, TC 12345',
    description: 'A state-of-the-art technology campus housing multiple tech companies and startups.',
    totalArea: '125 acres',
    yearBuilt: '2018',
    lastUpdated: '2024-01-15'
  };

  const mockBuildings = [
    {
      id: 1,
      name: 'Innovation Tower A',
      type: 'office',
      floors: 12,
      spaces: 48,
      surveys: 23,
      powerPoints: 96,
      environmentalChecks: 18,
      status: 'active'
    },
    {
      id: 2,
      name: 'Tech Hub Building B',
      type: 'academic',
      floors: 8,
      spaces: 32,
      surveys: 18,
      powerPoints: 64,
      environmentalChecks: 12,
      status: 'active'
    },
    {
      id: 3,
      name: 'Research Facility C',
      type: 'hospital',
      floors: 6,
      spaces: 24,
      surveys: 15,
      powerPoints: 48,
      environmentalChecks: 9,
      status: 'planning'
    },
    {
      id: 4,
      name: 'Data Center D',
      type: 'industrial',
      floors: 4,
      spaces: 16,
      surveys: 12,
      powerPoints: 32,
      environmentalChecks: 6,
      status: 'active'
    },
    {
      id: 5,
      name: 'Residential Block E',
      type: 'residential',
      floors: 10,
      spaces: 40,
      surveys: 8,
      powerPoints: 80,
      environmentalChecks: 15,
      status: 'planning'
    },
    {
      id: 6,
      name: 'Medical Wing F',
      type: 'hospital',
      floors: 5,
      spaces: 20,
      surveys: 6,
      powerPoints: 40,
      environmentalChecks: 8,
      status: 'planning'
    }
  ];

  useEffect(() => {
    // Use mock data for now
    setProperty(mockProperty);
    setBuildings(mockBuildings);
    
    // Handle hash-based tab navigation
    const hash = window.location.hash.replace('#', '');
    if (hash && ['overview', 'buildings', 'surveys', 'reports'].includes(hash)) {
      setActiveTab(hash);
    }
  }, [id]);

  const getPropertyTypeBadge = (type) => {
    const typeConfig = {
      'residential': {
        label: 'Residential MDU',
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: Home
      },
      'commercial': {
        label: 'Commercial MTU',
        color: 'bg-purple-100 text-purple-800 border-purple-200',
        icon: Building
      },
      'campus': {
        label: 'Campus',
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: GraduationCap
      },
      'industrial': {
        label: 'Industrial Site',
        color: 'bg-orange-100 text-orange-800 border-orange-200',
        icon: Factory
      }
    };

    const config = typeConfig[type] || typeConfig['commercial'];
    const Icon = config.icon;

    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${config.color} text-sm font-medium`}>
        <Icon className="w-3.5 h-3.5" />
        {config.label}
      </div>
    );
  };

  const getBuildingTypeBadge = (type) => {
    const typeConfig = {
      'office': {
        label: 'Office',
        color: 'bg-blue-100 text-blue-800 border-blue-200'
      },
      'residential': {
        label: 'Residential Block',
        color: 'bg-green-100 text-green-800 border-green-200'
      },
      'hospital': {
        label: 'Hospital Wing',
        color: 'bg-red-100 text-red-800 border-red-200'
      },
      'academic': {
        label: 'Academic Block',
        color: 'bg-purple-100 text-purple-800 border-purple-200'
      },
      'industrial': {
        label: 'Industrial Unit',
        color: 'bg-orange-100 text-orange-800 border-orange-200'
      }
    };

    const config = typeConfig[type] || typeConfig['office'];

    return (
      <div className={`inline-flex items-center px-3 py-1.5 rounded-full border ${config.color} text-sm font-medium`}>
        {config.label}
      </div>
    );
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'active': {
        color: 'bg-green-100 text-green-800 border-green-200',
        label: 'Active'
      },
      'planning': {
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        label: 'Planning'
      },
      'inactive': {
        color: 'bg-gray-100 text-gray-800 border-gray-200',
        label: 'Inactive'
      }
    };

    const config = statusConfig[status] || statusConfig['active'];

    return (
      <div className={`inline-flex items-center px-3 py-1.5 rounded-full border ${config.color} text-sm font-medium`}>
        {config.label}
      </div>
    );
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Building2 },
    { id: 'buildings', label: 'Buildings', icon: Building },
    { id: 'surveys', label: 'Surveys', icon: FileText },
    { id: 'reports', label: 'Reports', icon: BarChart3 }
  ];

  if (!property) {
    return <div className="w-full p-8 text-center">Loading...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 lg:px-10 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/properties"
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{property.name}</h1>
                <p className="text-gray-500 mt-1">{property.address}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {getPropertyTypeBadge(property.type)}
              <Link
                to="/properties"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Edit Property
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 lg:px-10">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    window.location.hash = tab.id;
                  }}
                  className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-6 lg:px-10 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Property Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Buildings</p>
                    <p className="text-2xl font-bold text-gray-900">{property.buildings}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Floors</p>
                    <p className="text-2xl font-bold text-gray-900">{property.floors}</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <Building className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Spaces</p>
                    <p className="text-2xl font-bold text-gray-900">{property.spaces}</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Surveys</p>
                    <p className="text-2xl font-bold text-gray-900">{property.surveys}</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <FileText className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-blue-200/50 p-6 hover:shadow-lg transition-all duration-300">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Property Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Description</p>
                  <p className="text-gray-900">{property.description}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Area</p>
                  <p className="text-gray-900">{property.totalArea}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Year Built</p>
                  <p className="text-gray-900">{property.yearBuilt}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Last Updated</p>
                  <p className="text-gray-900">{property.lastUpdated}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'buildings' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Buildings ({buildings.length})</h2>
              <Link
                to="/buildings"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Building
                </motion.button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {buildings.map((building, index) => (
                <motion.div
                  key={building.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-blue-200/50 p-6 hover:shadow-md transition-all duration-200"
                >
                  {/* Top Section - Building Name and Type */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{building.name}</h3>
                      {getBuildingTypeBadge(building.type)}
                    </div>
                  </div>
                  
                  {/* Middle Stats Section - Network Planning Parameters */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <Layers className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Floors</p>
                        <p className="text-sm font-semibold text-gray-900">{building.floors}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <MapPin className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Spaces</p>
                        <p className="text-sm font-semibold text-gray-900">{building.spaces}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <FileText className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Surveys</p>
                        <p className="text-sm font-semibold text-gray-900">{building.surveys}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <Zap className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Power Points</p>
                        <p className="text-sm font-semibold text-gray-900">{building.powerPoints}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <Thermometer className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Env. Checks</p>
                        <p className="text-sm font-semibold text-gray-900">{building.environmentalChecks}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <Activity className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Status</p>
                        {getStatusBadge(building.status)}
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom Buttons */}
                  <div className="space-y-3">
                    <Link
                      to={`/properties/${property.id}/buildings/${building.id}`}
                      className="w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                    >
                      <Layers className="w-4 h-4" />
                      View Floors
                    </Link>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        to="/surveys"
                        className="text-center px-3 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-200 shadow-md hover:shadow-lg text-sm font-medium"
                      >
                        Surveys
                      </Link>
                      <Link
                        to="/reports"
                        className="text-center px-3 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg text-sm font-medium flex items-center justify-center gap-1"
                      >
                        <BarChart3 className="w-4 h-4" />
                        Reports
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'surveys' && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Survey Management</h3>
            <p className="text-gray-500 mb-6">View and manage all surveys for this property</p>
            <Link
              to="/surveys"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Go to Surveys Module
            </Link>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="text-center py-12">
            <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Reports & Analytics</h3>
            <p className="text-gray-500 mb-6">View detailed reports for this property</p>
            <Link
              to="/reports"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
            >
              Go to Reports Module
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;
