import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Paperclip, 
  Trash2,
  ChevronDown,
  X,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { surveyService } from '../services/surveyService';
import { hierarchyService } from '../services/hierarchyService';

const Surveys = () => {
  const { user } = useAuth();
  const [surveys, setSurveys] = useState([]);
  const [properties, setProperties] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [floors, setFloors] = useState([]);
  const [engineers, setEngineers] = useState([]);
  const [checklistTemplates, setChecklistTemplates] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showNewSurveyModal, setShowNewSurveyModal] = useState(false);
  
  // New survey form state
  const [newSurvey, setNewSurvey] = useState({
    propertyId: '',
    buildingId: '',
    floorId: '',
    surveyType: '',
    assignedEngineerId: '',
    checklistTemplateId: ''
  });

  // Mock data for demonstration
  const mockSurveys = [
    {
      id: 'SRV-001',
      property: 'Downtown Office Complex',
      building: 'Tower A',
      floor: 'Floor 12',
      assignedTo: 'John Smith',
      status: 'completed',
      lastUpdated: '2024-01-15',
      progress: 100
    },
    {
      id: 'SRV-002',
      property: 'Industrial Park West',
      building: 'Warehouse 3',
      floor: 'Ground Floor',
      assignedTo: 'Sarah Johnson',
      status: 'in-progress',
      lastUpdated: '2024-01-14',
      progress: 65
    },
    {
      id: 'SRV-003',
      property: 'Medical Center Plaza',
      building: 'Main Hospital',
      floor: 'Floor 5',
      assignedTo: 'Mike Wilson',
      status: 'draft',
      lastUpdated: '2024-01-13',
      progress: 0
    },
    {
      id: 'SRV-004',
      property: 'Shopping Mall North',
      building: 'Retail Building 2',
      floor: 'Floor 3',
      assignedTo: 'Emily Davis',
      status: 'review-pending',
      lastUpdated: '2024-01-12',
      progress: 95
    },
    {
      id: 'SRV-005',
      property: 'Tech Campus Hub',
      building: 'Innovation Center',
      floor: 'Floor 8',
      assignedTo: 'Alex Chen',
      status: 'in-progress',
      lastUpdated: '2024-01-11',
      progress: 40
    }
  ];

  useEffect(() => {
    // Use mock data for now
    setSurveys(mockSurveys);
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      // Load properties, engineers, etc.
      const organizationId = user?.organizationId;
      
      // Mock data for demonstration
      setProperties([
        { id: 1, name: 'Downtown Office Complex' },
        { id: 2, name: 'Industrial Park West' },
        { id: 3, name: 'Medical Center Plaza' }
      ]);
      
      setEngineers([
        { id: 1, name: 'John Smith' },
        { id: 2, name: 'Sarah Johnson' },
        { id: 3, name: 'Mike Wilson' },
        { id: 4, name: 'Emily Davis' },
        { id: 5, name: 'Alex Chen' }
      ]);
      
      setChecklistTemplates([
        { id: 1, name: 'Standard Site Survey' },
        { id: 2, name: 'Network Installation Survey' },
        { id: 3, name: 'Maintenance Survey' }
      ]);
    } catch (err) {
      setError('Failed to load initial data');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'completed': {
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: CheckCircle,
        label: 'Completed'
      },
      'in-progress': {
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: Clock,
        label: 'In Progress'
      },
      'draft': {
        color: 'bg-gray-100 text-gray-800 border-gray-200',
        icon: FileText,
        label: 'Draft'
      },
      'review-pending': {
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: AlertCircle,
        label: 'Review Pending'
      }
    };

    const config = statusConfig[status] || statusConfig['draft'];
    const Icon = config.icon;

    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${config.color} text-sm font-medium`}>
        <Icon className="w-3.5 h-3.5" />
        {config.label}
      </div>
    );
  };

  const filteredSurveys = surveys.filter(survey => {
    const matchesSearch = survey.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         survey.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         survey.building.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         survey.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || survey.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleCreateSurvey = () => {
    // Handle survey creation
    console.log('Creating survey:', newSurvey);
    setShowNewSurveyModal(false);
    setNewSurvey({
      propertyId: '',
      buildingId: '',
      floorId: '',
      surveyType: '',
      assignedEngineerId: '',
      checklistTemplateId: ''
    });
  };

  const handleDeleteSurvey = (surveyId) => {
    if (window.confirm('Are you sure you want to delete this survey?')) {
      setSurveys(prev => prev.filter(s => s.id !== surveyId));
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 lg:px-10 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Left side - Title and description */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Survey Management</h1>
              <p className="text-gray-500 mt-1">Track, assign and manage site surveys</p>
            </div>
            
            {/* Right side - Controls */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search surveys..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
              
              {/* Filter dropdown */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="draft">Draft</option>
                  <option value="review-pending">Review Pending</option>
                </select>
                <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
              
              {/* New Survey Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowNewSurveyModal(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Survey
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Survey Table */}
      <div className="px-6 lg:px-10 py-8">
        <div className="bg-white rounded-xl shadow-sm border-2 border-blue-200 hover:border-blue-400 hover:shadow-blue-200/50 overflow-hidden hover:shadow-lg transition-all duration-200">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Survey ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Building
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Floor
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSurveys.map((survey, index) => (
                  <motion.tr
                    key={survey.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{survey.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{survey.property}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{survey.building}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{survey.floor}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{survey.assignedTo}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(survey.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{survey.lastUpdated}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* View Survey */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150"
                          title="View Survey"
                        >
                          <Eye className="w-4 h-4" />
                        </motion.button>
                        
                        {/* Edit */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150"
                          title="Edit Survey"
                        >
                          <Edit className="w-4 h-4" />
                        </motion.button>
                        
                        {/* Attachments */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150"
                          title="Attachments"
                        >
                          <Paperclip className="w-4 h-4" />
                        </motion.button>
                        
                        {/* Delete */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteSurvey(survey.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
                          title="Delete Survey"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Empty state */}
          {filteredSurveys.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No surveys found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your filters or search terms' 
                  : 'Create your first survey to get started'}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowNewSurveyModal(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow-md inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create First Survey
              </motion.button>
            </div>
          )}
        </div>
      </div>

      {/* New Survey Modal */}
      <AnimatePresence>
        {showNewSurveyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowNewSurveyModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Create New Survey</h2>
                <button
                  onClick={() => setShowNewSurveyModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Modal Body */}
              <div className="p-6 space-y-4">
                {/* Property */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property</label>
                  <select
                    value={newSurvey.propertyId}
                    onChange={(e) => setNewSurvey(prev => ({ ...prev, propertyId: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Property</option>
                    {properties.map(property => (
                      <option key={property.id} value={property.id}>{property.name}</option>
                    ))}
                  </select>
                </div>
                
                {/* Building */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Building</label>
                  <select
                    value={newSurvey.buildingId}
                    onChange={(e) => setNewSurvey(prev => ({ ...prev, buildingId: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Building</option>
                    <option value="1">Tower A</option>
                    <option value="2">Warehouse 3</option>
                    <option value="3">Main Hospital</option>
                  </select>
                </div>
                
                {/* Floor */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Floor</label>
                  <select
                    value={newSurvey.floorId}
                    onChange={(e) => setNewSurvey(prev => ({ ...prev, floorId: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Floor</option>
                    <option value="1">Floor 12</option>
                    <option value="2">Ground Floor</option>
                    <option value="3">Floor 5</option>
                  </select>
                </div>
                
                {/* Survey Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Survey Type</label>
                  <select
                    value={newSurvey.surveyType}
                    onChange={(e) => setNewSurvey(prev => ({ ...prev, surveyType: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Survey Type</option>
                    <option value="site-survey">Site Survey</option>
                    <option value="network-survey">Network Survey</option>
                    <option value="maintenance-survey">Maintenance Survey</option>
                  </select>
                </div>
                
                {/* Assigned Engineer */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assigned Engineer</label>
                  <select
                    value={newSurvey.assignedEngineerId}
                    onChange={(e) => setNewSurvey(prev => ({ ...prev, assignedEngineerId: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Engineer</option>
                    {engineers.map(engineer => (
                      <option key={engineer.id} value={engineer.id}>{engineer.name}</option>
                    ))}
                  </select>
                </div>
                
                {/* Checklist Template */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Checklist Template</label>
                  <select
                    value={newSurvey.checklistTemplateId}
                    onChange={(e) => setNewSurvey(prev => ({ ...prev, checklistTemplateId: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Template</option>
                    {checklistTemplates.map(template => (
                      <option key={template.id} value={template.id}>{template.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowNewSurveyModal(false)}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCreateSurvey}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Create Survey
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Surveys;
