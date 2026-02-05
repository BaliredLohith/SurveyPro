import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { 
  FileText, 
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  MapPin,
  Camera,
  Wifi,
  Thermometer,
  Zap,
  Save,
  Send,
  Plus,
  X
} from 'lucide-react';

const BuildingSurvey = () => {
  const { id } = useParams();
  const [building, setBuilding] = useState(null);
  const [surveyData, setSurveyData] = useState({
    buildingId: id,
    surveyType: 'routine',
    surveyDate: new Date().toISOString().split('T')[0],
    surveyTime: new Date().toTimeString().split(' ')[0].substring(0, 5),
    surveyor: '',
    weatherConditions: 'clear',
    temperature: '',
    humidity: '',
    networkStatus: '',
    powerStatus: '',
    equipmentStatus: '',
    safetyChecks: {
      emergencyExits: false,
      fireExtinguishers: false,
      smokeDetectors: false,
      emergencyLighting: false,
      firstAidKit: false,
      safetySignage: false
    },
    networkInfrastructure: {
      wifi: false,
      ethernet: false,
      fiberOptic: false
    },
    powerSystems: {
      mainPower: false,
      backupPower: false,
      upsSystems: false
    },
    environmental: {
      temperatureControl: false,
      humidityControl: false,
      ventilation: false
    },
    equipmentChecks: {
      networkConnectivity: false,
      powerSupply: false,
      coolingSystems: false,
      serverRooms: false,
      cabling: false,
      backupSystems: false
    },
    notes: '',
    recommendations: '',
    priorityIssues: []
  });

  // Mock survey data
  const mockSurveys = [
    {
      id: 1,
      buildingId: id,
      buildingName: 'Main Tower A',
      surveyType: 'Initial Assessment',
      surveyor: 'John Smith',
      surveyDate: '2026-01-20',
      status: 'completed',
      score: 85,
      issues: 2,
      duration: '2 hours 30 mins'
    },
    {
      id: 2,
      buildingId: id,
      buildingName: 'Main Tower A',
      surveyType: 'Network Readiness',
      surveyor: 'Sarah Johnson',
      surveyDate: '2026-01-15',
      status: 'completed',
      score: 92,
      issues: 1,
      duration: '1 hour 45 mins'
    },
    {
      id: 3,
      buildingId: id,
      buildingName: 'Main Tower A',
      surveyType: 'Power Systems',
      surveyor: 'Mike Davis',
      surveyDate: '2026-01-10',
      status: 'completed',
      score: 78,
      issues: 3,
      duration: '3 hours 15 mins'
    },
    {
      id: 4,
      buildingId: id,
      buildingName: 'Main Tower A',
      surveyType: 'Environmental Safety',
      surveyor: 'Emily Wilson',
      surveyDate: '2026-01-05',
      status: 'completed',
      score: 88,
      issues: 1,
      duration: '2 hours'
    },
    {
      id: 5,
      buildingId: id,
      buildingName: 'Main Tower A',
      surveyType: 'Equipment Check',
      surveyor: 'Robert Brown',
      surveyDate: '2025-12-28',
      status: 'completed',
      score: 95,
      issues: 0,
      duration: '1 hour 30 mins'
    },
    {
      id: 6,
      buildingId: id,
      buildingName: 'Main Tower A',
      surveyType: 'Fire Safety',
      surveyor: 'David Lee',
      surveyDate: '2025-12-20',
      status: 'completed',
      score: 90,
      issues: 1,
      duration: '2 hours'
    },
    {
      id: 7,
      buildingId: id,
      buildingName: 'Main Tower A',
      surveyType: 'Structural Assessment',
      surveyor: 'Lisa Chen',
      surveyDate: '2025-12-15',
      status: 'completed',
      score: 82,
      issues: 2,
      duration: '4 hours'
    },
    {
      id: 8,
      buildingId: id,
      buildingName: 'Main Tower A',
      surveyType: 'HVAC Systems',
      surveyor: 'Tom Wilson',
      surveyDate: '2025-12-10',
      status: 'completed',
      score: 87,
      issues: 1,
      duration: '2 hours 30 mins'
    },
    {
      id: 9,
      buildingId: id,
      buildingName: 'Main Tower A',
      surveyType: 'Security Systems',
      surveyor: 'James Miller',
      surveyDate: '2025-12-05',
      status: 'completed',
      score: 93,
      issues: 0,
      duration: '1 hour 45 mins'
    },
    {
      id: 10,
      buildingId: id,
      buildingName: 'Main Tower A',
      surveyType: 'Emergency Assessment',
      surveyor: 'Maria Garcia',
      surveyDate: '2025-11-28',
      status: 'completed',
      score: 89,
      issues: 1,
      duration: '3 hours'
    }
  ];
  const mockBuilding = {
    id: id,
    name: 'Main Tower A',
    address: 'Tech Park Campus - Tower A',
    type: 'Office',
    floors: 12,
    lastSurvey: '2026-01-20',
    property: 'Tech Park Campus'
  };

  useEffect(() => {
    setBuilding(mockBuilding);
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setSurveyData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setSurveyData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleAddIssue = () => {
    setSurveyData(prev => ({
      ...prev,
      priorityIssues: [...prev.priorityIssues, { id: Date.now(), description: '', severity: 'medium' }]
    }));
  };

  const handleRemoveIssue = (issueId) => {
    setSurveyData(prev => ({
      ...prev,
      priorityIssues: prev.priorityIssues.filter(issue => issue.id !== issueId)
    }));
  };

  const handleIssueChange = (issueId, field, value) => {
    setSurveyData(prev => ({
      ...prev,
      priorityIssues: prev.priorityIssues.map(issue =>
        issue.id === issueId ? { ...issue, [field]: value } : issue
      )
    }));
  };

  const handleSave = () => {
    console.log('🏢 Saving survey data:', surveyData);
    alert('Survey saved successfully!');
  };

  const handleSubmit = () => {
    console.log('🏢 Submitting survey:', surveyData);
    alert('Survey submitted successfully!');
  };

  if (!building) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading building information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 lg:px-10 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/buildings"
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Building Survey</h1>
                <p className="text-gray-500 mt-1">{building.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Draft
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit Survey
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Survey Form - Full Screen */}
      <div className="px-6 lg:px-10 py-8">
        <div className="w-full space-y-8">
          
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Survey Type</label>
                <select
                  name="surveyType"
                  value={surveyData.surveyType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="routine">Routine Inspection</option>
                  <option value="emergency">Emergency Assessment</option>
                  <option value="compliance">Compliance Check</option>
                  <option value="maintenance">Maintenance Review</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Surveyor Name</label>
                <input
                  type="text"
                  name="surveyor"
                  value={surveyData.surveyor}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter surveyor name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Survey Date</label>
                <input
                  type="date"
                  name="surveyDate"
                  value={surveyData.surveyDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Survey Time</label>
                <input
                  type="time"
                  name="surveyTime"
                  value={surveyData.surveyTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Environmental Conditions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-orange-600" />
              Environmental Conditions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weather</label>
                <select
                  name="weatherConditions"
                  value={surveyData.weatherConditions}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="clear">Clear</option>
                  <option value="cloudy">Cloudy</option>
                  <option value="rainy">Rainy</option>
                  <option value="stormy">Stormy</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Temperature (°C)</label>
                <input
                  type="number"
                  name="temperature"
                  value={surveyData.temperature}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="22"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Humidity (%)</label>
                <input
                  type="number"
                  name="humidity"
                  value={surveyData.humidity}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="45"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Network Status</label>
                <select
                  name="networkStatus"
                  value={surveyData.networkStatus}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select status</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Safety Checks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Safety Checks
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(surveyData.safetyChecks).map(([key, value]) => (
                <label key={key} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    name={`safetyChecks.${key}`}
                    checked={value}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </span>
                </label>
              ))}
            </div>
          </motion.div>

          {/* Network Infrastructure */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Wifi className="w-5 h-5 text-purple-600" />
              Network Infrastructure
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(surveyData.networkInfrastructure).map(([key, value]) => (
                <label key={key} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    name={`networkInfrastructure.${key}`}
                    checked={value}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </span>
                </label>
              ))}
            </div>
          </motion.div>

          {/* Power Systems */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-600" />
              Power Systems
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(surveyData.powerSystems).map(([key, value]) => (
                <label key={key} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    name={`powerSystems.${key}`}
                    checked={value}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </span>
                </label>
              ))}
            </div>
          </motion.div>

          {/* Environmental */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-green-600" />
              Environmental
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(surveyData.environmental).map(([key, value]) => (
                <label key={key} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    name={`environmental.${key}`}
                    checked={value}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </span>
                </label>
              ))}
            </div>
          </motion.div>

          {/* Equipment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Camera className="w-5 h-5 text-blue-600" />
              Equipment
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(surveyData.equipmentChecks).map(([key, value]) => (
                <label key={key} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    name={`equipmentChecks.${key}`}
                    checked={value}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </span>
                </label>
              ))}
            </div>
          </motion.div>

          {/* Priority Issues */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Priority Issues
              </h2>
              <button
                onClick={handleAddIssue}
                className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-1 text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Issue
              </button>
            </div>
            
            <div className="space-y-3">
              {surveyData.priorityIssues.map((issue) => (
                <div key={issue.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                  <input
                    type="text"
                    value={issue.description}
                    onChange={(e) => handleIssueChange(issue.id, 'description', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe the issue..."
                  />
                  <select
                    value={issue.severity}
                    onChange={(e) => handleIssueChange(issue.id, 'severity', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                  <button
                    onClick={() => handleRemoveIssue(issue.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              
              {surveyData.priorityIssues.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <AlertTriangle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No priority issues identified</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Notes and Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Notes & Recommendations</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Survey Notes</label>
                <textarea
                  name="notes"
                  value={surveyData.notes}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter detailed survey notes..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recommendations</label>
                <textarea
                  name="recommendations"
                  value={surveyData.recommendations}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter recommendations for improvement..."
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BuildingSurvey;
