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
  X
} from 'lucide-react';
import { propertiesAPI } from '../services/apiService';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listError, setListError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock data for demonstration
  const mockProperties = [
    {
      id: 1,
      name: 'Tech Park Campus',
      type: 'campus',
      buildings: 12,
      floors: 48,
      spaces: 286,
      surveys: 156,
      address: '1234 Innovation Drive, Tech City, TC 12345'
    },
    {
      id: 2,
      name: 'Downtown Office Complex',
      type: 'commercial',
      buildings: 3,
      floors: 24,
      spaces: 142,
      surveys: 89,
      address: '567 Business Ave, Downtown, DC 67890'
    },
    {
      id: 3,
      name: 'Residential Tower Heights',
      type: 'residential',
      buildings: 4,
      floors: 32,
      spaces: 198,
      surveys: 67,
      address: '890 Residential Blvd, Housing District, HD 11223'
    },
    {
      id: 4,
      name: 'Industrial Manufacturing Hub',
      type: 'industrial',
      buildings: 8,
      floors: 16,
      spaces: 94,
      surveys: 45,
      address: '345 Factory Road, Industrial Zone, IZ 44556'
    },
    {
      id: 5,
      name: 'University Medical Center',
      type: 'campus',
      buildings: 15,
      floors: 36,
      spaces: 312,
      surveys: 201,
      address: '789 Campus Drive, University Town, UT 33445'
    },
    {
      id: 6,
      name: 'Shopping Mall Plaza',
      type: 'commercial',
      buildings: 2,
      floors: 8,
      spaces: 76,
      surveys: 34,
      address: '101 Shopping Way, Retail Center, RC 55667'
    }
  ];

  useEffect(() => {
    // Just use dummy data directly
    console.log('🏢 Using dummy data directly');
    setProperties(mockProperties);
    setLoading(false);
  }, []);

  const loadProperties = async () => {
    setLoading(true);
    setListError('');
    try {
      const response = await propertiesAPI.getAll();
      console.log('🏢 Properties API Response:', response);
      
      // Handle admin response structure: {success: true, data: {properties: []}}
      let properties = [];
      if (response.success && response.data && response.data.properties) {
        properties = response.data.properties;
        console.log('🏢 Extracted properties from admin response:', properties);
      } else if (Array.isArray(response.data)) {
        properties = response.data;
        console.log('🏢 Using direct array response:', properties);
      } else if (Array.isArray(response)) {
        properties = response;
        console.log('🏢 Using direct response as array:', properties);
      }
      
      console.log('🏢 Final properties to set:', properties);
      setProperties(properties);
    } catch (err) {
      console.error('🏢 Error loading properties:', err);
      console.log('🏢 Using dummy data as fallback');
      setListError('Using demo data - API unavailable');
      setProperties(mockProperties); // Use dummy data as fallback
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setShowAddModal(true);
    setSubmitError(''); // Clear submit error when opening modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const propertyData = {
      name: formData.get('name'),
      address: formData.get('address'),
      type: formData.get('property_type')
    };

    console.log('🏢 Submitting property:', propertyData);
    setSubmitError('');

    try {
      const response = await propertiesAPI.create(propertyData);
      console.log('🏢 Property creation response:', response);
      
      // Handle direct property response (not nested in data object)
      const newProperty = response.data || response;
      
      // Add new property to the beginning of the list
      setProperties(prev => [newProperty, ...prev]);
      
      // Clear form and close modal
      e.target.reset();
      setShowAddModal(false);
      setSubmitError('');
    } catch (err) {
      console.error('🏢 Error creating property:', err);
      setSubmitError('Error creating property');
    }
  };

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

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 lg:px-10 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Left side - Title and description */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Properties & Sites</h1>
              <p className="text-gray-500 mt-1">Manage campuses, complexes, and survey locations</p>
            </div>
            
            {/* Right side - Add Property Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openAddModal}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Property
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Content - Property Cards Grid */}
      <div className="px-6 lg:px-10 py-8">
        {/* Error Display */}
        {listError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {listError}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border-2 border-blue-200 hover:border-blue-400 hover:shadow-blue-200/50 overflow-hidden hover:shadow-lg transition-all duration-200"
            >
              {/* Top Section - Property Name and Type */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{property.name}</h3>
                  {getPropertyTypeBadge(property.type)}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.address}
                </div>
              </div>

              {/* Middle Stats Row */}
              <div className="p-6 border-b border-gray-100">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
                      <Building2 className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Buildings</p>
                      <p className="text-sm font-semibold text-gray-900">{property.buildings}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
                      <Building className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Floors</p>
                      <p className="text-sm font-semibold text-gray-900">{property.floors}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
                      <MapPin className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Spaces</p>
                      <p className="text-sm font-semibold text-gray-900">{property.spaces}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
                      <FileText className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Surveys</p>
                      <p className="text-sm font-semibold text-gray-900">{property.surveys}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Section - Action Buttons */}
              <div className="p-6 bg-gray-50">
                <div className="flex items-center gap-3">
                  <Link
                    to={`/properties/${property.id}`}
                    className="flex-1 text-center px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg text-sm font-medium"
                  >
                    View Details
                  </Link>
                  
                  <Link
                    to={`/properties/${property.id}#buildings`}
                    className="flex-1 text-center px-3 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg text-sm font-medium"
                  >
                    Manage Buildings
                  </Link>
                  
                  <Link
                    to="/surveys"
                    className="flex-1 text-center px-3 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-200 shadow-md hover:shadow-lg text-sm font-medium flex items-center justify-center gap-1"
                  >
                    <FileText className="w-4 h-4" />
                    Surveys
                  </Link>
                  
                  <Link
                    to="/reports"
                    className="flex-1 text-center px-3 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg text-sm font-medium flex items-center justify-center gap-1"
                  >
                    <BarChart3 className="w-4 h-4" />
                    Reports
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {properties.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-500 mb-6">Get started by adding your first property</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add First Property
            </motion.button>
          </div>
        )}
      </div>

      {/* Add Property Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Add New Property</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                  {submitError}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter property name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  name="address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter address"
                  rows={3}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                <select
                  name="property_type"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select property type</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="campus">Campus</option>
                </select>
              </div>
              
              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300 rounded-lg hover:from-gray-200 hover:to-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Create Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Properties;
