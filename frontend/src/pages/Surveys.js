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
import SurveyModal from '../components/modals/SurveyModal';

const Surveys = () => {
  const { user } = useAuth();
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showNewSurveyModal, setShowNewSurveyModal] = useState(false);

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
    },
    {
      id: 'SRV-006',
      property: 'Green Valley Residency',
      building: 'Block C',
      floor: 'Floor 2',
      assignedTo: 'Rahul Verma',
      status: 'draft',
      lastUpdated: '2024-01-10',
      progress: 0
    },
    {
      id: 'SRV-007',
      property: 'Sunrise IT Park',
      building: 'Tower B',
      floor: 'Floor 10',
      assignedTo: 'Lisa Thompson',
      status: 'in-progress',
      lastUpdated: '2024-01-09',
      progress: 55
    },
    {
      id: 'SRV-008',
      property: 'Metro Hospital Complex',
      building: 'Emergency Wing',
      floor: 'Ground Floor',
      assignedTo: 'David Kim',
      status: 'completed',
      lastUpdated: '2024-01-08',
      progress: 100
    },
    {
      id: 'SRV-009',
      property: 'City Mall Central',
      building: 'Retail Block 1',
      floor: 'Floor 1',
      assignedTo: 'Emily Rodriguez',
      status: 'review-pending',
      lastUpdated: '2024-01-07',
      progress: 90
    },
    {
      id: 'SRV-010',
      property: 'Lakeview Apartments',
      building: 'Tower D',
      floor: 'Floor 6',
      assignedTo: 'Michael Chen',
      status: 'in-progress',
      lastUpdated: '2024-01-06',
      progress: 35
    }
  ];

  useEffect(() => {
    loadSurveys();
  }, []);

  const loadSurveys = async () => {
    setLoading(true);
    setError(null);
    try {
      // Get token from localStorage
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.log('No token found, using mock data');
        setSurveys(mockSurveys);
        return;
      }

      // Make API call to get surveys
      const response = await fetch('http://localhost:5000/api/surveys', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          console.log('Unauthorized, using mock data');
          setSurveys(mockSurveys);
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('📊 API Response:', data);

      if (data.success && data.data) {
        // Transform API data to match frontend format
        const transformedSurveys = data.data.map(survey => ({
          id: `SRV-${survey.id}`,
          property: survey.property_name || 'Unknown Property',
          building: survey.building_name || 'Unknown Building',
          floor: 'Floor 1', // Default floor since space data not available
          assignedTo: survey.assigned_to_name || 'Unassigned',
          status: survey.status === 'Completed' ? 'completed' : 
                 survey.status === 'In Progress' ? 'in-progress' : 
                 survey.status === 'Pending' ? 'draft' : 'draft',
          lastUpdated: survey.created_at ? new Date(survey.created_at).toLocaleDateString() : 'Unknown',
          progress: survey.status === 'Completed' ? 100 : 
                   survey.status === 'In Progress' ? 65 : 
                   survey.status === 'Pending' ? 35 : 0,
          surveyType: survey.survey_type || 'Unknown',
          priority: survey.priority || 'Medium',
          dueDate: survey.due_date || 'Unknown'
        }));
        
        setSurveys(transformedSurveys);
        console.log(`✅ Loaded ${transformedSurveys.length} surveys from API`);
      } else {
        console.log('API returned no data, using mock data');
        setSurveys(mockSurveys);
      }
    } catch (err) {
      console.error('❌ Error loading surveys:', err);
      console.log('🔄 Falling back to mock data due to error');
      setSurveys(mockSurveys);
      // Don't set error state, just use mock data silently
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

  const handleDeleteSurvey = (surveyId) => {
    if (window.confirm('Are you sure you want to delete this survey?')) {
      setSurveys(prev => prev.filter(s => s.id !== surveyId));
    }
  };

  const handleViewSurvey = (survey) => {
    alert(`Viewing survey: ${survey.id}`);
  };

  const handleEditSurvey = (survey) => {
    alert(`Editing survey: ${survey.id}`);
    setShowNewSurveyModal(true); // reuse modal for edit UI
  };

  const handleAttachments = (survey) => {
    alert(`Opening attachments for: ${survey.id}`);
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
                          onClick={() => handleViewSurvey(survey)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150"
                          title="View Survey"
                        >
                          <Eye className="w-4 h-4" />
                        </motion.button>
                        
                        {/* Edit */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEditSurvey(survey)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150"
                          title="Edit Survey"
                        >
                          <Edit className="w-4 h-4" />
                        </motion.button>
                        
                        {/* Attachments */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleAttachments(survey)}
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

      {/* New Survey Modal - Use same modal as dashboard */}
      <SurveyModal
        isOpen={showNewSurveyModal}
        onClose={() => setShowNewSurveyModal(false)}
        onSuccess={(surveyData) => {
          console.log('Survey created:', surveyData);
          setShowNewSurveyModal(false);
          // Here you can refresh the surveys list
        }}
      />
    </div>
  );
};

export default Surveys;
