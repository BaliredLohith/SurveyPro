import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  Plus,
  Edit,
  Trash2,
  Eye,
  Settings,
  UserCheck,
  UserX,
  Mail,
  Phone,
  MapPin,
  FileText,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Clock,
  Shield,
  User,
  Building2,
  Calendar,
  Activity,
  Lock,
  Unlock,
  ChevronDown,
  X
} from 'lucide-react';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetail, setShowUserDetail] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [propertyFilter, setPropertyFilter] = useState('all');
  const [viewMode, setViewMode] = useState('cards'); // cards or table
  const [showAddUser, setShowAddUser] = useState(false);

  // Mock data for demonstration
  const mockUsers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@ispcompany.com',
      role: 'admin',
      status: 'active',
      avatar: 'SJ',
      phone: '+1 (555) 123-4567',
      assignedProperties: 6,
      assignedBuildings: 24,
      activeSurveys: 3,
      completedSurveys: 45,
      lastActivity: '2024-01-20',
      joinDate: '2023-06-15',
      permissions: {
        read: true,
        write: true,
        approve: true,
        manageUsers: true,
        assignSurveys: true
      }
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@ispcompany.com',
      role: 'project-manager',
      status: 'active',
      avatar: 'MC',
      phone: '+1 (555) 234-5678',
      assignedProperties: 3,
      assignedBuildings: 12,
      activeSurveys: 8,
      completedSurveys: 28,
      lastActivity: '2024-01-19',
      joinDate: '2023-08-20',
      permissions: {
        read: true,
        write: true,
        approve: true,
        manageUsers: false,
        assignSurveys: true
      }
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@ispcompany.com',
      role: 'survey-engineer',
      status: 'active',
      avatar: 'ER',
      phone: '+1 (555) 345-6789',
      assignedProperties: 2,
      assignedBuildings: 8,
      activeSurveys: 5,
      completedSurveys: 32,
      lastActivity: '2024-01-18',
      joinDate: '2023-09-10',
      permissions: {
        read: true,
        write: true,
        approve: false,
        manageUsers: false,
        assignSurveys: false
      }
    },
    {
      id: 4,
      name: 'David Kim',
      email: 'david.kim@ispcompany.com',
      role: 'reviewer',
      status: 'active',
      avatar: 'DK',
      phone: '+1 (555) 456-7890',
      assignedProperties: 4,
      assignedBuildings: 16,
      activeSurveys: 2,
      completedSurveys: 0,
      lastActivity: '2024-01-17',
      joinDate: '2023-10-05',
      permissions: {
        read: true,
        write: false,
        approve: true,
        manageUsers: false,
        assignSurveys: false
      }
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      email: 'lisa.thompson@clientcompany.com',
      role: 'viewer',
      status: 'active',
      avatar: 'LT',
      phone: '+1 (555) 567-8901',
      assignedProperties: 1,
      assignedBuildings: 4,
      activeSurveys: 0,
      completedSurveys: 0,
      lastActivity: '2024-01-16',
      joinDate: '2023-11-12',
      permissions: {
        read: true,
        write: false,
        approve: false,
        manageUsers: false,
        assignSurveys: false
      }
    },
    {
      id: 6,
      name: 'James Wilson',
      email: 'james.wilson@ispcompany.com',
      role: 'survey-engineer',
      status: 'suspended',
      avatar: 'JW',
      phone: '+1 (555) 678-9012',
      assignedProperties: 0,
      assignedBuildings: 0,
      activeSurveys: 0,
      completedSurveys: 18,
      lastActivity: '2024-01-10',
      joinDate: '2023-07-22',
      permissions: {
        read: true,
        write: true,
        approve: false,
        manageUsers: false,
        assignSurveys: false
      }
    }
  ];

  const mockProperties = [
    'Tech Park Campus',
    'Downtown Office Complex',
    'Industrial Zone A',
    'Medical Center',
    'University District',
    'Residential Community'
  ];

  useEffect(() => {
    setUsers(mockUsers);
  }, []);

  const getRoleBadge = (role) => {
    const roleConfig = {
      'admin': {
        label: 'Admin',
        color: 'bg-purple-100 text-purple-800 border-purple-200',
        icon: Shield
      },
      'project-manager': {
        label: 'Project Manager',
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: Users
      },
      'survey-engineer': {
        label: 'Survey Engineer',
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: UserCheck
      },
      'reviewer': {
        label: 'Reviewer',
        color: 'bg-orange-100 text-orange-800 border-orange-200',
        icon: Eye
      },
      'viewer': {
        label: 'Viewer',
        color: 'bg-gray-100 text-gray-800 border-gray-200',
        icon: User
      }
    };

    const config = roleConfig[role] || roleConfig['viewer'];
    const Icon = config.icon;

    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${config.color} text-sm font-medium`}>
        <Icon className="w-3.5 h-3.5" />
        {config.label}
      </div>
    );
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'active': {
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: CheckCircle,
        label: 'Active'
      },
      'suspended': {
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: UserX,
        label: 'Suspended'
      },
      'inactive': {
        color: 'bg-gray-100 text-gray-800 border-gray-200',
        icon: Clock,
        label: 'Inactive'
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

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const openUserDetail = (user) => {
    setSelectedUser(user);
    setShowUserDetail(true);
  };

  const closeUserDetail = () => {
    setShowUserDetail(false);
    setSelectedUser(null);
  };

  const toggleUserStatus = (userId) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'suspended' : 'active' }
        : user
    ));
  };

  const UserCard = ({ user }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }}
      className="bg-white rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-blue-200/50 p-6 cursor-pointer hover:shadow-lg transition-all duration-300"
      onClick={() => openUserDetail(user)}
    >
      {/* Header with Avatar and Status */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
            {user.avatar}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        {getStatusBadge(user.status)}
      </div>

      {/* Role Badge */}
      <div className="mb-4">
        {getRoleBadge(user.role)}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Properties</p>
            <p className="text-sm font-semibold text-gray-900">{user.assignedProperties}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Buildings</p>
            <p className="text-sm font-semibold text-gray-900">{user.assignedBuildings}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Active Surveys</p>
            <p className="text-sm font-semibold text-gray-900">{user.activeSurveys}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Completed</p>
            <p className="text-sm font-semibold text-gray-900">{user.completedSurveys}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          <span>Last active: {user.lastActivity}</span>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              toggleUserStatus(user.id);
            }}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {user.status === 'active' ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              // Edit user
            }}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Edit className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  const UserTableRow = ({ user }) => (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
      onClick={() => openUserDetail(user)}
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {user.avatar}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        {getRoleBadge(user.role)}
      </td>
      <td className="px-6 py-4">
        {getStatusBadge(user.status)}
      </td>
      <td className="px-6 py-4 text-sm text-gray-900">{user.assignedProperties}</td>
      <td className="px-6 py-4 text-sm text-gray-900">{user.assignedBuildings}</td>
      <td className="px-6 py-4 text-sm text-gray-900">{user.activeSurveys}</td>
      <td className="px-6 py-4 text-sm text-gray-900">{user.completedSurveys}</td>
      <td className="px-6 py-4 text-sm text-gray-500">{user.lastActivity}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              toggleUserStatus(user.id);
            }}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {user.status === 'active' ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              // Edit user
            }}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Edit className="w-4 h-4" />
          </motion.button>
        </div>
      </td>
    </motion.tr>
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 lg:px-10 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Left side - Title and description */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
              <p className="text-gray-500 mt-1">Manage roles, assignments, and access control</p>
            </div>
            
            {/* Right side - Actions */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, email, role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
              
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="project-manager">Project Manager</option>
                <option value="survey-engineer">Survey Engineer</option>
                <option value="reviewer">Reviewer</option>
                <option value="viewer">Viewer</option>
              </select>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="inactive">Inactive</option>
              </select>
              
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'cards' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  Cards
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'table' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  Table
                </button>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddUser(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add User
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Users Display */}
      <div className="px-6 lg:px-10 py-8">
        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-blue-200/50 overflow-hidden hover:shadow-lg transition-all duration-300">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Properties
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Buildings
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Active Surveys
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completed
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Activity
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <UserTableRow key={user.id} user={user} />
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSearchTerm('');
                setRoleFilter('all');
                setStatusFilter('all');
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Clear Filters
            </motion.button>
          </div>
        )}
      </div>

      {/* User Detail Side Drawer */}
      <AnimatePresence>
        {showUserDetail && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={closeUserDetail}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">User Details</h2>
                <button
                  onClick={closeUserDetail}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200">
                <div className="flex">
                  {['profile', 'assignments', 'activity', 'permissions'].map((tab) => (
                    <button
                      key={tab}
                      className="flex-1 px-6 py-4 text-sm font-medium text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300 transition-colors capitalize"
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {/* Profile Tab */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-2xl">
                      {selectedUser.avatar}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{selectedUser.name}</h3>
                      <p className="text-gray-500">{selectedUser.email}</p>
                      <div className="flex items-center gap-3 mt-2">
                        {getRoleBadge(selectedUser.role)}
                        {getStatusBadge(selectedUser.status)}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <div className="flex items-center gap-2 text-gray-900">
                        <Phone className="w-4 h-4 text-gray-400" />
                        {selectedUser.phone}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
                      <div className="flex items-center gap-2 text-gray-900">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {selectedUser.joinDate}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleUserStatus(selectedUser.id)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          selectedUser.status === 'active'
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {selectedUser.status === 'active' ? 'Suspend User' : 'Activate User'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UsersManagement;
