import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  FileText, 
  BarChart3,
  Plus,
  Home,
  Building,
  Factory,
  GraduationCap,
  X,
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
  Filter,
  Zap,
  Layers
} from 'lucide-react';
import { buildingsAPI, propertiesAPI } from '../services/apiService';

const Buildings = () => {
  const [buildings, setBuildings] = useState([]);
  const [properties, setProperties] = useState([]);
  const [selectedBuildings, setSelectedBuildings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    property_id: '',
    name: '',
    type: 'Office',
    floors: 1,
    status: 'active'
  });

  // Dummy data for buildings
  const mockBuildings = [
    {
      id: 1,
      property_id: 1,
      name: 'Main Tower A',
      type: 'Office',
      floors: 12,
      status: 'active',
      address: 'Tech Park Campus - Tower A',
      created_at: '2026-01-15T10:00:00Z',
      last_survey: '2026-01-20T14:30:00Z',
      surveys_count: 8,
      floors_count: 12,
      spaces_count: 48,
      lastSurveyDate: '2026-01-20',
      nextSurveyDue: '2026-02-20',
      health: {
        networkReadiness: 92,
        powerStatus: 95,
        powerStability: 'Excellent',
        temperature: 21,
        humidity: 45,
        environmentalSafety: 'Normal',
        equipmentAvailability: 88,
        surveyCoverage: 85,
        lastUpdated: '2026-01-20T14:30:00Z'
      }
    },
    {
      id: 2,
      property_id: 1,
      name: 'Research Block B',
      type: 'Research',
      floors: 8,
      status: 'survey-pending',
      address: 'Tech Park Campus - Block B',
      created_at: '2026-01-15T10:00:00Z',
      last_survey: '2026-01-18T09:15:00Z',
      surveys_count: 6,
      floors_count: 8,
      spaces_count: 32,
      lastSurveyDate: '2026-01-18',
      nextSurveyDue: '2026-02-18',
      health: {
        networkReadiness: 88,
        powerStatus: 92,
        powerStability: 'Good',
        temperature: 22,
        humidity: 42,
        environmentalSafety: 'Normal',
        equipmentAvailability: 85,
        surveyCoverage: 78,
        lastUpdated: '2026-01-18T09:15:00Z'
      }
    },
    {
      id: 3,
      property_id: 2,
      name: 'Corporate Plaza',
      type: 'Office',
      floors: 15,
      status: 'under-installation',
      address: 'Downtown Office Complex - Plaza',
      created_at: '2026-01-10T09:00:00Z',
      last_survey: '2026-01-22T16:45:00Z',
      surveys_count: 12,
      floors_count: 15,
      spaces_count: 60,
      lastSurveyDate: '2026-01-22',
      nextSurveyDue: '2026-02-22',
      health: {
        networkReadiness: 75,
        powerStatus: 80,
        powerStability: 'Fair',
        temperature: 24,
        humidity: 48,
        environmentalSafety: 'Warning',
        equipmentAvailability: 70,
        surveyCoverage: 65,
        lastUpdated: '2026-01-22T16:45:00Z'
      }
    },
    {
      id: 4,
      property_id: 3,
      name: 'Residential Tower 1',
      type: 'Residential',
      floors: 20,
      status: 'issues-found',
      address: 'Residential Tower Heights - Tower 1',
      created_at: '2026-01-05T08:00:00Z',
      last_survey: '2026-01-25T11:20:00Z',
      surveys_count: 15,
      floors_count: 20,
      spaces_count: 80,
      lastSurveyDate: '2026-01-25',
      nextSurveyDue: '2026-02-25',
      health: {
        networkReadiness: 65,
        powerStatus: 70,
        powerStability: 'Poor',
        temperature: 26,
        humidity: 55,
        environmentalSafety: 'Warning',
        equipmentAvailability: 60,
        surveyCoverage: 55,
        lastUpdated: '2026-01-25T11:20:00Z'
      }
    },
    {
      id: 5,
      property_id: 4,
      name: 'Manufacturing Unit A',
      type: 'Industrial',
      floors: 3,
      status: 'active',
      address: 'Industrial Manufacturing Hub - Unit A',
      created_at: '2026-01-08T07:30:00Z',
      last_survey: '2026-01-19T13:10:00Z',
      surveys_count: 10,
      floors_count: 3,
      spaces_count: 12,
      lastSurveyDate: '2026-01-19',
      nextSurveyDue: '2026-02-19',
      health: {
        networkReadiness: 85,
        powerStatus: 88,
        powerStability: 'Good',
        temperature: 23,
        humidity: 50,
        environmentalSafety: 'Normal',
        equipmentAvailability: 82,
        surveyCoverage: 75,
        lastUpdated: '2026-01-19T13:10:00Z'
      }
    },
    {
      id: 6,
      property_id: 5,
      name: 'Medical Wing',
      type: 'Medical',
      floors: 6,
      status: 'survey-pending',
      address: 'University Medical Center - Medical Wing',
      created_at: '2026-01-12T11:00:00Z',
      last_survey: '2026-01-21T15:30:00Z',
      surveys_count: 9,
      floors_count: 6,
      spaces_count: 24,
      lastSurveyDate: '2026-01-21',
      nextSurveyDue: '2026-02-21',
      health: {
        networkReadiness: 96,
        powerStatus: 99,
        powerStability: 'Excellent',
        temperature: 20,
        humidity: 40,
        environmentalSafety: 'Normal',
        equipmentAvailability: 95,
        surveyCoverage: 92,
        lastUpdated: '2026-01-21T15:30:00Z'
      }
    },
    {
      id: 7,
      property_id: 2,
      name: 'Parking Garage B',
      type: 'Parking',
      floors: 2,
      status: 'Survey Pending',
      address: 'Downtown Office Complex - Garage B',
      created_at: '2026-01-25T10:00:00Z',
      last_survey: '2026-01-20T14:30:00Z',
      surveys_count: 0,
      floors_count: 2,
      spaces_count: 8,
      lastSurveyDate: '2026-01-20',
      nextSurveyDue: '2026-02-20',
      health: {
        networkReadiness: 75,
        powerStatus: 85,
        powerStability: 'Fair',
        temperature: 20,
        humidity: 50,
        environmentalSafety: 'Normal',
        equipmentAvailability: 70,
        surveyCoverage: 60,
        lastUpdated: '2026-01-20T14:30:00Z'
      }
    },
    {
      id: 8,
      property_id: 3,
      name: 'Service Tower',
      type: 'Mixed Use',
      floors: 8,
      status: 'Under Installation',
      address: 'Residential Tower Heights - Service Tower',
      created_at: '2026-01-28T15:00:00Z',
      last_survey: '2026-01-20T14:30:00Z',
      surveys_count: 0,
      floors_count: 8,
      spaces_count: 32,
      lastSurveyDate: '2026-01-20',
      nextSurveyDue: '2026-02-20',
      health: {
        networkReadiness: 60,
        powerStatus: 70,
        powerStability: 'Fair',
        temperature: 24,
        humidity: 55,
        environmentalSafety: 'Warning',
        equipmentAvailability: 65,
        surveyCoverage: 40,
        lastUpdated: '2026-01-20T14:30:00Z'
      }
    },
    {
      id: 9,
      property_id: 4,
      name: 'Storage Facility',
      type: 'Storage',
      floors: 1,
      status: 'Issues Found',
      address: 'Industrial Manufacturing Hub - Storage',
      created_at: '2026-01-30T12:00:00Z',
      last_survey: '2026-01-20T14:30:00Z',
      surveys_count: 0,
      floors_count: 1,
      spaces_count: 4,
      lastSurveyDate: '2026-01-20',
      nextSurveyDue: '2026-02-20',
      health: {
        networkReadiness: 45,
        powerStatus: 55,
        powerStability: 'Poor',
        temperature: 28,
        humidity: 65,
        environmentalSafety: 'Warning',
        equipmentAvailability: 50,
        surveyCoverage: 30,
        lastUpdated: '2026-01-20T14:30:00Z'
      }
    },
    {
      id: 10,
      property_id: 1,
      name: 'Data Center Alpha',
      type: 'Data Center',
      floors: 4,
      status: 'active',
      address: 'Tech Park Campus - Data Center Alpha',
      created_at: '2026-02-01T09:00:00Z',
      last_survey: '2026-02-03T10:15:00Z',
      surveys_count: 4,
      floors_count: 4,
      spaces_count: 16,
      lastSurveyDate: '2026-02-03',
      nextSurveyDue: '2026-03-03',
      health: {
        networkReadiness: 98,
        powerStatus: 99,
        powerStability: 'Excellent',
        temperature: 18,
        humidity: 35,
        environmentalSafety: 'Normal',
        equipmentAvailability: 96,
        surveyCoverage: 88,
        lastUpdated: '2026-02-03T10:15:00Z'
      }
    },
    {
      id: 11,
      property_id: 2,
      name: 'Executive Tower',
      type: 'Office',
      floors: 18,
      status: 'survey-pending',
      address: 'Downtown Office Complex - Executive Tower',
      created_at: '2026-02-02T11:30:00Z',
      last_survey: '2026-01-28T14:20:00Z',
      surveys_count: 7,
      floors_count: 18,
      spaces_count: 72,
      lastSurveyDate: '2026-01-28',
      nextSurveyDue: '2026-02-28',
      health: {
        networkReadiness: 82,
        powerStatus: 85,
        powerStability: 'Good',
        temperature: 22,
        humidity: 46,
        environmentalSafety: 'Normal',
        equipmentAvailability: 78,
        surveyCoverage: 70,
        lastUpdated: '2026-01-28T14:20:00Z'
      }
    },
    {
      id: 12,
      property_id: 3,
      name: 'Residential Tower 2',
      type: 'Residential',
      floors: 16,
      status: 'under-installation',
      address: 'Residential Tower Heights - Tower 2',
      created_at: '2026-02-03T13:45:00Z',
      last_survey: '2026-01-30T16:10:00Z',
      surveys_count: 2,
      floors_count: 16,
      spaces_count: 64,
      lastSurveyDate: '2026-01-30',
      nextSurveyDue: '2026-02-28',
      health: {
        networkReadiness: 68,
        powerStatus: 72,
        powerStability: 'Fair',
        temperature: 25,
        humidity: 52,
        environmentalSafety: 'Warning',
        equipmentAvailability: 65,
        surveyCoverage: 45,
        lastUpdated: '2026-01-30T16:10:00Z'
      }
    },
    {
      id: 13,
      property_id: 4,
      name: 'Manufacturing Unit B',
      type: 'Industrial',
      floors: 2,
      status: 'issues-found',
      address: 'Industrial Manufacturing Hub - Unit B',
      created_at: '2026-02-04T08:20:00Z',
      last_survey: '2026-01-25T11:30:00Z',
      surveys_count: 1,
      floors_count: 2,
      spaces_count: 8,
      lastSurveyDate: '2026-01-25',
      nextSurveyDue: '2026-02-25',
      health: {
        networkReadiness: 52,
        powerStatus: 58,
        powerStability: 'Poor',
        temperature: 27,
        humidity: 60,
        environmentalSafety: 'Warning',
        equipmentAvailability: 55,
        surveyCoverage: 35,
        lastUpdated: '2026-01-25T11:30:00Z'
      }
    },
    {
      id: 14,
      property_id: 5,
      name: 'Emergency Center',
      type: 'Medical',
      floors: 3,
      status: 'active',
      address: 'University Medical Center - Emergency Center',
      created_at: '2026-02-05T10:00:00Z',
      last_survey: '2026-02-04T15:45:00Z',
      surveys_count: 5,
      floors_count: 3,
      spaces_count: 12,
      lastSurveyDate: '2026-02-04',
      nextSurveyDue: '2026-03-04',
      health: {
        networkReadiness: 94,
        powerStatus: 97,
        powerStability: 'Excellent',
        temperature: 19,
        humidity: 38,
        environmentalSafety: 'Normal',
        equipmentAvailability: 92,
        surveyCoverage: 85,
        lastUpdated: '2026-02-04T15:45:00Z'
      }
    }
  ];

  // Dummy data for properties (matching Properties page)
  const mockProperties = [
    { id: 1, name: 'Tech Park Campus', type: 'commercial' },
    { id: 2, name: 'Downtown Office Complex', type: 'commercial' },
    { id: 3, name: 'Residential Tower Heights', type: 'residential' },
    { id: 4, name: 'Industrial Manufacturing Hub', type: 'industrial' },
    { id: 5, name: 'University Medical Center', type: 'commercial' },
    { id: 6, name: 'Shopping Mall Plaza', type: 'commercial' }
  ];

  // Load dummy data directly
  useEffect(() => {
    console.log('🏢 Using dummy data for buildings and properties');
    setBuildings(mockBuildings);
    setProperties(mockProperties);
    setLoading(false);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Create new building object
      const newBuilding = {
        id: Date.now(), // Use timestamp as temporary ID
        property_id: parseInt(formData.property_id),
        name: formData.name,
        type: formData.type,
        floors: parseInt(formData.floors),
        status: formData.status,
        address: `Address for ${formData.name}`,
        created_at: new Date().toISOString(),
        last_survey: null,
        surveys_count: 0,
        floors_count: parseInt(formData.floors),
        spaces_count: parseInt(formData.floors) * 4, // Estimate 4 spaces per floor
        lastSurveyDate: new Date().toISOString().split('T')[0],
        nextSurveyDue: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        health: {
          networkReadiness: 85,
          powerStatus: 90,
          powerStability: 'Good',
          temperature: 22,
          humidity: 45,
          environmentalSafety: 'Normal',
          equipmentAvailability: 80,
          surveyCoverage: 70,
          lastUpdated: new Date().toISOString()
        }
      };

      console.log('🏢 Creating building:', newBuilding);
      
      // Add new building to the beginning of the list
      setBuildings(prev => [newBuilding, ...prev]);
      
      // Close modal and reset form
      setShowAddModal(false);
      setFormData({
        property_id: '',
        name: '',
        type: 'Office',
        floors: 1,
        status: 'active'
      });
      
      console.log('🏢 Building created successfully!');
    } catch (err) {
      console.error('🏢 Error creating building:', err);
      setError('Error creating building');
    } finally {
      setLoading(false);
    }
  };

  const getBuildingTypeBadge = (type) => {
    const typeConfig = {
      'office': {
        label: 'Office',
        color: 'bg-blue-100 text-blue-800 border-blue-200'
      },
      'research': {
        label: 'Research',
        color: 'bg-purple-100 text-purple-800 border-purple-200'
      },
      'residential': {
        label: 'Residential Block',
        color: 'bg-green-100 text-green-800 border-green-200'
      },
      'industrial': {
        label: 'Industrial Unit',
        color: 'bg-orange-100 text-orange-800 border-orange-200'
      },
      'medical': {
        label: 'Medical Wing',
        color: 'bg-red-100 text-red-800 border-red-200'
      },
      'parking': {
        label: 'Parking',
        color: 'bg-gray-100 text-gray-800 border-gray-200'
      },
      'mixed use': {
        label: 'Mixed Use',
        color: 'bg-indigo-100 text-indigo-800 border-indigo-200'
      },
      'storage': {
        label: 'Storage',
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200'
      },
      'educational': {
        label: 'Educational',
        color: 'bg-blue-100 text-blue-800 border-blue-200'
      },
      'data center': {
        label: 'Data Center',
        color: 'bg-cyan-100 text-cyan-800 border-cyan-200'
      },
      'hospital': {
        label: 'Hospital Wing',
        color: 'bg-red-100 text-red-800 border-red-200'
      },
      'academic': {
        label: 'Academic Block',
        color: 'bg-purple-100 text-purple-800 border-purple-200'
      }
    };

    const config = typeConfig[type.toLowerCase()] || typeConfig['office'];

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

    const config = statusConfig[status?.toLowerCase()] || statusConfig['active'];
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
                         building.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || building.status.toLowerCase() === statusFilter.toLowerCase();
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
                onClick={() => setShowAddModal(true)}
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
                  to={`/properties/${building.property_id}/buildings/${building.id}`}
                  className="text-center px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg text-sm font-medium flex items-center justify-center gap-1"
                >
                  <Layers className="w-4 h-4" />
                  View Floors
                </Link>
                <Link
                  to={`/buildings/${building.id}/survey`}
                  className="text-center px-3 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg text-sm font-medium flex items-center justify-center gap-1"
                >
                  <FileText className="w-4 h-4" />
                  Start Survey
                </Link>
                <Link
                  to={`/buildings/${building.id}/health`}
                  className="text-center px-3 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg text-sm font-medium flex items-center justify-center gap-1"
                >
                  <Activity className="w-4 h-4" />
                  View Health
                </Link>
                <Link
                  to={`/buildings/${building.id}/reports`}
                  className="text-center px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg text-sm font-medium flex items-center justify-center gap-1"
                >
                  <BarChart3 className="w-4 h-4" />
                  Reports
                </Link>
              </div>

              {/* Footer Info */}
              <div className="text-xs text-gray-500 border-t border-gray-100 pt-3">
                <div className="text-center">
                  <span>Floors: {building.floors_count} | Spaces: {building.spaces_count}</span>
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

      {/* Add Building Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Add New Building</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                  {error}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property</label>
                <select
                  name="property_id"
                  value={formData.property_id}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Property</option>
                  {properties.map(property => (
                    <option key={property.id} value={property.id}>
                      {property.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Building Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter building name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Building Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Office">Office</option>
                  <option value="Research">Research</option>
                  <option value="Residential">Residential</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Medical">Medical</option>
                  <option value="Educational">Educational</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Floors</label>
                <input
                  type="number"
                  name="floors"
                  value={formData.floors}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="active">Active</option>
                  <option value="survey-pending">Survey Pending</option>
                  <option value="under-installation">Under Installation</option>
                  <option value="issues-found">Issues Found</option>
                </select>
              </div>
              
              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create Building'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Buildings;
