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
  GraduationCap
} from 'lucide-react';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

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
    // Use mock data for now
    setProperties(mockProperties);
  }, []);

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
              className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Property
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Content - Property Cards Grid */}
      <div className="px-6 lg:px-10 py-8">
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
                    className="flex-1 text-center px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    View Details
                  </Link>
                  
                  <Link
                    to={`/properties/${property.id}#buildings`}
                    className="flex-1 text-center px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    Manage Buildings
                  </Link>
                  
                  <Link
                    to={`/properties/${property.id}#reports`}
                    className="flex-1 text-center px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center gap-1"
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
              className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add First Property
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;
