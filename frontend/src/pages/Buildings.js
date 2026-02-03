import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  FileText, 
  BarChart3,
  Plus,
  Eye,
  Settings,
  Layers,
  Zap,
  Thermometer,
  Activity,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Wifi,
  Server,
  Download,
  UserCheck,
  Search,
  Filter
} from 'lucide-react';

const Buildings = () => {
  const [buildings, setBuildings] = useState([]);
  const [selectedBuildings, setSelectedBuildings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  // Enhanced mock data for all buildings across properties
  const mockBuildings = [
    {
      id: 1,
      name: 'Innovation Tower A',
      propertyId: 1,
      propertyName: 'Tech Park Campus',
      type: 'office',
      floors: 12,
      spaces: 48,
      surveys: 23,
      powerPoints: 96,
      environmentalChecks: 18,
      status: 'active',
      health: {
        networkReadiness: 92,
        powerStability: 'Good',
        environmentalSafety: 'Normal',
        equipmentAvailability: 88,
        surveyCoverage: 75,
        networkPointsInstalled: 64,
        totalNetworkPoints: 80,
        floorsCompleted: 8,
        totalFloors: 12
      },
      lastSurveyDate: '2024-01-15',
      nextSurveyDue: '2024-03-15'
    },
    {
      id: 2,
      name: 'Tech Hub Building B',
      propertyId: 1,
      propertyName: 'Tech Park Campus',
      type: 'academic',
      floors: 8,
      spaces: 32,
      surveys: 18,
      powerPoints: 64,
      environmentalChecks: 12,
      status: 'survey-pending',
      health: {
        networkReadiness: 65,
        powerStability: 'Fair',
        environmentalSafety: 'Warning',
        equipmentAvailability: 45,
        surveyCoverage: 40,
        networkPointsInstalled: 28,
        totalNetworkPoints: 64,
        floorsCompleted: 3,
        totalFloors: 8
      },
      lastSurveyDate: '2023-12-01',
      nextSurveyDue: '2024-02-01'
    },
    {
      id: 3,
      name: 'Research Facility C',
      propertyId: 1,
      propertyName: 'Tech Park Campus',
      type: 'hospital',
      floors: 6,
      spaces: 24,
      surveys: 15,
      powerPoints: 48,
      environmentalChecks: 9,
      status: 'under-installation',
      health: {
        networkReadiness: 78,
        powerStability: 'Good',
        environmentalSafety: 'Normal',
        equipmentAvailability: 82,
        surveyCoverage: 85,
        networkPointsInstalled: 38,
        totalNetworkPoints: 48,
        floorsCompleted: 5,
        totalFloors: 6
      },
      lastSurveyDate: '2024-01-10',
      nextSurveyDue: '2024-04-10'
    },
    {
      id: 4,
      name: 'Data Center D',
      propertyId: 1,
      propertyName: 'Tech Park Campus',
      type: 'industrial',
      floors: 4,
      spaces: 16,
      surveys: 12,
      powerPoints: 32,
      environmentalChecks: 6,
      status: 'issues-found',
      health: {
        networkReadiness: 45,
        powerStability: 'Poor',
        environmentalSafety: 'Critical',
        equipmentAvailability: 30,
        surveyCoverage: 90,
        networkPointsInstalled: 25,
        totalNetworkPoints: 32,
        floorsCompleted: 4,
        totalFloors: 4
      },
      lastSurveyDate: '2024-01-05',
      nextSurveyDue: '2024-01-20'
    },
    {
      id: 5,
      name: 'Residential Block E',
      propertyId: 2,
      propertyName: 'Downtown Office Complex',
      type: 'residential',
      floors: 10,
      spaces: 40,
      surveys: 8,
      powerPoints: 80,
      environmentalChecks: 15,
      status: 'active',
      health: {
        networkReadiness: 88,
        powerStability: 'Excellent',
        environmentalSafety: 'Normal',
        equipmentAvailability: 95,
        surveyCoverage: 60,
        networkPointsInstalled: 48,
        totalNetworkPoints: 80,
        floorsCompleted: 6,
        totalFloors: 10
      },
      lastSurveyDate: '2024-01-12',
      nextSurveyDue: '2024-04-12'
    },
    {
      id: 6,
      name: 'Medical Wing F',
      propertyId: 2,
      propertyName: 'Downtown Office Complex',
      type: 'hospital',
      floors: 5,
      spaces: 20,
      surveys: 6,
      powerPoints: 40,
      environmentalChecks: 8,
      status: 'survey-pending',
      health: {
        networkReadiness: 55,
        powerStability: 'Fair',
        environmentalSafety: 'Warning',
        equipmentAvailability: 60,
        surveyCoverage: 30,
        networkPointsInstalled: 12,
        totalNetworkPoints: 40,
        floorsCompleted: 2,
        totalFloors: 5
      },
      lastSurveyDate: '2023-11-15',
      nextSurveyDue: '2024-02-15'
    }
  ];

  useEffect(() => {
    setBuildings(mockBuildings);
  }, []);

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
        icon: CheckCircle,
        label: 'Active',
        glow: 'shadow-green-200'
      },
      'survey-pending': {
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: AlertTriangle,
        label: 'Survey Pending',
        glow: 'shadow-yellow-200'
      },
      'under-installation': {
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: Server,
        label: 'Under Installation',
        glow: 'shadow-blue-200'
      },
      'issues-found': {
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: XCircle,
        label: 'Issues Found',
        glow: 'shadow-red-200'
      }
    };

    const config = statusConfig[status] || statusConfig['active'];
    const Icon = config.icon;

    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${config.color} text-sm font-medium`}>
        <Icon className="w-3.5 h-3.5" />
        {config.label}
      </div>
    );
  };

  const getStatusGlow = (status) => {
    const glowConfig = {
      'active': 'shadow-green-200',
      'survey-pending': 'shadow-yellow-200',
      'under-installation': 'shadow-blue-200',
      'issues-found': 'shadow-red-200'
    };
    return glowConfig[status] || 'shadow-gray-200';
  };

  const getHealthColor = (value) => {
    if (value >= 80) return 'text-green-600';
    if (value >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressBarColor = (value) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const filteredBuildings = buildings.filter(building => {
    const matchesSearch = building.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         building.propertyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || building.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleBuildingSelection = (buildingId) => {
    setSelectedBuildings(prev => 
      prev.includes(buildingId) 
        ? prev.filter(id => id !== buildingId)
        : [...prev, buildingId]
    );
  };

  const selectAllBuildings = () => {
    setSelectedBuildings(filteredBuildings.map(b => b.id));
  };

  const clearSelection = () => {
    setSelectedBuildings([]);
  };

  const runBulkSurvey = () => {
    alert(`Running survey on ${selectedBuildings.length} selected buildings`);
  };

  const exportBulkReports = () => {
    alert(`Exporting reports for ${selectedBuildings.length} selected buildings`);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 lg:px-10 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Left side - Title and description */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Buildings Management</h1>
              <p className="text-gray-500 mt-1">Monitor and operate all buildings across properties</p>
            </div>
            
            {/* Right side - Actions */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search buildings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="survey-pending">Survey Pending</option>
                <option value="under-installation">Under Installation</option>
                <option value="issues-found">Issues Found</option>
              </select>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Building
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      <div className="bg-gray-50 border-b border-gray-200 px-6 lg:px-10 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedBuildings.length === filteredBuildings.length && filteredBuildings.length > 0}
                onChange={selectedBuildings.length === filteredBuildings.length ? clearSelection : selectAllBuildings}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">
                {selectedBuildings.length === 0 
                  ? 'Select buildings' 
                  : `${selectedBuildings.length} selected`
                }
              </span>
            </label>
            
            {selectedBuildings.length > 0 && (
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={runBulkSurvey}
                  className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-1"
                >
                  <FileText className="w-4 h-4" />
                  Run Survey
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={exportBulkReports}
                  className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-1"
                >
                  <Download className="w-4 h-4" />
                  Export Reports
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-1"
                >
                  <UserCheck className="w-4 h-4" />
                  Assign Engineer
                </motion.button>
              </div>
            )}
          </div>
          
          <div className="text-sm text-gray-500">
            {filteredBuildings.length} buildings found
          </div>
        </div>
      </div>

      {/* Buildings Grid */}
      <div className="px-6 lg:px-10 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBuildings.map((building, index) => (
            <motion.div
              key={building.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-blue-200/50 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${getStatusGlow(building.status)}`}
            >
              {/* Header with selection */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={selectedBuildings.includes(building.id)}
                    onChange={() => toggleBuildingSelection(building.id)}
                    className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{building.name}</h3>
                    <p className="text-sm text-gray-500">{building.propertyName}</p>
                    {getBuildingTypeBadge(building.type)}
                  </div>
                </div>
                {getStatusBadge(building.status)}
              </div>
              
              {/* Building Health Indicators */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Building Health
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600 flex items-center gap-1">
                      <Wifi className="w-3 h-3" />
                      Network Readiness
                    </span>
                    <span className={`text-xs font-semibold ${getHealthColor(building.health.networkReadiness)}`}>
                      {building.health.networkReadiness}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600 flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      Power Stability
                    </span>
                    <span className={`text-xs font-semibold ${
                      building.health.powerStability === 'Excellent' ? 'text-green-600' :
                      building.health.powerStability === 'Good' ? 'text-green-600' :
                      building.health.powerStability === 'Fair' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {building.health.powerStability}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600 flex items-center gap-1">
                      <Thermometer className="w-3 h-3" />
                      Environment
                    </span>
                    <span className={`text-xs font-semibold ${
                      building.health.environmentalSafety === 'Normal' ? 'text-green-600' :
                      building.health.environmentalSafety === 'Warning' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {building.health.environmentalSafety}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600 flex items-center gap-1">
                      <Server className="w-3 h-3" />
                      Equipment
                    </span>
                    <span className={`text-xs font-semibold ${getHealthColor(building.health.equipmentAvailability)}`}>
                      {building.health.equipmentAvailability}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Smart Metrics with Progress Bars */}
              <div className="space-y-3 mb-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600">Survey Coverage</span>
                    <span className="text-xs font-medium text-gray-900">{building.health.surveyCoverage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getProgressBarColor(building.health.surveyCoverage)}`}
                      style={{ width: `${building.health.surveyCoverage}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600">Network Points</span>
                    <span className="text-xs font-medium text-gray-900">
                      {building.health.networkPointsInstalled}/{building.health.totalNetworkPoints}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getProgressBarColor(
                        (building.health.networkPointsInstalled / building.health.totalNetworkPoints) * 100
                      )}`}
                      style={{ 
                        width: `${(building.health.networkPointsInstalled / building.health.totalNetworkPoints) * 100}%` 
                      }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600">Floors Completed</span>
                    <span className="text-xs font-medium text-gray-900">
                      {building.health.floorsCompleted}/{building.health.totalFloors}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getProgressBarColor(
                        (building.health.floorsCompleted / building.health.totalFloors) * 100
                      )}`}
                      style={{ 
                        width: `${(building.health.floorsCompleted / building.health.totalFloors) * 100}%` 
                      }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Overview Actions */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <Link
                  to={`/properties/${building.propertyId}/buildings/${building.id}`}
                  className="text-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-1"
                >
                  <Layers className="w-4 h-4" />
                  View Floors
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center gap-1"
                >
                  <FileText className="w-4 h-4" />
                  Start Survey
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium flex items-center justify-center gap-1"
                >
                  <Activity className="w-4 h-4" />
                  View Health
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-center px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium flex items-center justify-center gap-1"
                >
                  <BarChart3 className="w-4 h-4" />
                  Reports
                </motion.button>
              </div>

              {/* Footer Info */}
              <div className="text-xs text-gray-500 border-t border-gray-100 pt-3">
                <div className="flex justify-between">
                  <span>Last Survey: {building.lastSurveyDate}</span>
                  <span>Next Due: {building.nextSurveyDue}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredBuildings.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No buildings found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Clear Filters
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Buildings;
