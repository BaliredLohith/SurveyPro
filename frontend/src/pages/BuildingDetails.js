import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  FileText, 
  ArrowLeft,
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
  BarChart3,
  Server,
  Wifi,
  Cable
} from 'lucide-react';

const BuildingDetails = () => {
  const { propertyId, buildingId } = useParams();
  const [building, setBuilding] = useState(null);
  const [floors, setFloors] = useState([]);
  const [activeTab, setActiveTab] = useState('floors');
  const [loading, setLoading] = useState(false);

  // Mock data for demonstration
  const mockBuilding = {
    id: 1,
    name: 'Innovation Tower A',
    propertyId: 1,
    propertyName: 'Tech Park Campus',
    floors: 12,
    spaces: 48,
    surveys: 23,
    status: 'active',
    description: 'Main technology tower housing startup companies and innovation labs.',
    yearBuilt: '2019',
    totalArea: '450,000 sq ft',
    totalSurveyedSpaces: 35,
    powerAvailability: 'suitable',
    coolingSuitability: 'needs-attention',
    accessibilityRating: 'suitable'
  };

  const mockFloors = [
    { id: 1, name: 'Ground Floor', spaces: 8, surveys: 3, status: 'completed' },
    { id: 2, name: 'Floor 1', spaces: 4, surveys: 2, status: 'completed' },
    { id: 3, name: 'Floor 2', spaces: 4, surveys: 2, status: 'completed' },
    { id: 4, name: 'Floor 3', spaces: 4, surveys: 2, status: 'in-progress' },
    { id: 5, name: 'Floor 4', spaces: 4, surveys: 1, status: 'in-progress' },
    { id: 6, name: 'Floor 5', spaces: 4, surveys: 1, status: 'planned' },
    { id: 7, name: 'Floor 6', spaces: 4, surveys: 1, status: 'planned' },
    { id: 8, name: 'Floor 7', spaces: 4, surveys: 1, status: 'planned' },
    { id: 9, name: 'Floor 8', spaces: 4, surveys: 1, status: 'planned' },
    { id: 10, name: 'Floor 9', spaces: 4, surveys: 1, status: 'planned' },
    { id: 11, name: 'Floor 10', spaces: 4, surveys: 1, status: 'planned' },
    { id: 12, name: 'Floor 11', spaces: 4, surveys: 1, status: 'planned' }
  ];

  useEffect(() => {
    // Use mock data for now
    setBuilding(mockBuilding);
    setFloors(mockFloors);
  }, [propertyId, buildingId]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      'completed': {
        color: 'bg-green-100 text-green-800 border-green-200',
        label: 'Completed'
      },
      'in-progress': {
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        label: 'In Progress'
      },
      'planned': {
        color: 'bg-gray-100 text-gray-800 border-gray-200',
        label: 'Planned'
      }
    };

    const config = statusConfig[status] || statusConfig['planned'];

    return (
      <div className={`inline-flex items-center px-3 py-1.5 rounded-full border ${config.color} text-sm font-medium`}>
        {config.label}
      </div>
    );
  };

  const getReadinessBadge = (status) => {
    const statusConfig = {
      'suitable': {
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: CheckCircle,
        label: 'Suitable'
      },
      'needs-attention': {
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: AlertTriangle,
        label: 'Needs Attention'
      },
      'not-suitable': {
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: XCircle,
        label: 'Not Suitable'
      }
    };

    const config = statusConfig[status] || statusConfig['needs-attention'];
    const Icon = config.icon;

    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${config.color} text-sm font-medium`}>
        <Icon className="w-3.5 h-3.5" />
        {config.label}
      </div>
    );
  };

  const tabs = [
    { id: 'floors', label: 'Floors', icon: Layers },
    { id: 'infrastructure', label: 'Infrastructure', icon: Server },
    { id: 'surveys', label: 'Surveys', icon: FileText },
    { id: 'reports', label: 'Reports', icon: BarChart3 }
  ];

  if (!building) {
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
                to={`/properties/${propertyId}`}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{building.name}</h1>
                <p className="text-gray-500 mt-1">{building.propertyName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {getStatusBadge(building.status)}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Edit Building
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Building Overview */}
      <div className="px-6 lg:px-10 py-8">
        {/* Technical Summary Panel */}
        <div className="bg-white rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-blue-200/50 p-6 mb-8 hover:shadow-lg transition-all duration-300">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Building Technical Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">{building.totalSurveyedSpaces}</div>
              <p className="text-sm text-gray-500">Total Surveyed Spaces</p>
            </div>
            
            <div className="text-center">
              <div className="mb-2">{getReadinessBadge(building.powerAvailability)}</div>
              <p className="text-sm text-gray-500">Power Availability</p>
            </div>
            
            <div className="text-center">
              <div className="mb-2">{getReadinessBadge(building.coolingSuitability)}</div>
              <p className="text-sm text-gray-500">Cooling Suitability</p>
            </div>
            
            <div className="text-center">
              <div className="mb-2">{getReadinessBadge(building.accessibilityRating)}</div>
              <p className="text-sm text-gray-500">Accessibility Rating</p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">{building.totalArea}</div>
              <p className="text-sm text-gray-500">Total Area</p>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-blue-200/50 overflow-hidden hover:shadow-lg transition-all duration-300">
          <div className="border-b border-gray-200">
            <div className="flex">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 bg-blue-50'
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

          {/* Tab Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === 'floors' && (
                <motion.div
                  key="floors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Floor
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Spaces
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Surveys
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {floors.map((floor, index) => (
                          <motion.tr
                            key={floor.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="hover:bg-gray-50 transition-colors duration-150"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{floor.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{floor.spaces}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{floor.surveys}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {getStatusBadge(floor.status)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <Link
                                to={`/properties/${propertyId}/buildings/${buildingId}/floors/${floor.id}/plan`}
                                className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                              >
                                Open Floor Plan
                              </Link>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === 'infrastructure' && (
                <motion.div
                  key="infrastructure"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Zap className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Power Source Availability</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Main Power</span>
                          <span className="text-sm font-medium text-green-600">Available</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Backup Generator</span>
                          <span className="text-sm font-medium text-green-600">Installed</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">UPS Systems</span>
                          <span className="text-sm font-medium text-yellow-600">Partial</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Server className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Equipment Rack Space</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Available Racks</span>
                          <span className="text-sm font-medium text-gray-900">8 units</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Rack Height</span>
                          <span className="text-sm font-medium text-gray-900">42U</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Cooling Type</span>
                          <span className="text-sm font-medium text-gray-900">HVAC</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <Cable className="w-6 h-6 text-orange-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Cable Routing Paths</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Vertical Conduits</span>
                          <span className="text-sm font-medium text-green-600">Available</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Horizontal Paths</span>
                          <span className="text-sm font-medium text-green-600">Clear</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Cable Trays</span>
                          <span className="text-sm font-medium text-yellow-600">Limited</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Wifi className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Network Infrastructure</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Fiber Entry Points</span>
                          <span className="text-sm font-medium text-green-600">2 points</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Distribution Frames</span>
                          <span className="text-sm font-medium text-green-600">Available</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Antenna Mounting</span>
                          <span className="text-sm font-medium text-green-600">Rooftop</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'surveys' && (
                <motion.div
                  key="surveys"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center py-12"
                >
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Building Surveys</h3>
                  <p className="text-gray-500 mb-6">View and manage all surveys for this building</p>
                  <Link
                    to="/surveys"
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                  >
                    Go to Surveys Module
                  </Link>
                </motion.div>
              )}

              {activeTab === 'reports' && (
                <motion.div
                  key="reports"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center py-12"
                >
                  <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Building Reports</h3>
                  <p className="text-gray-500 mb-6">Generate detailed reports for this building</p>
                  <Link
                    to="/reports"
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                  >
                    Go to Reports Module
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingDetails;
