import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usersAPI } from '../services/apiService';
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
  X,
  Copy,
  Key
} from 'lucide-react';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetail, setShowUserDetail] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('cards'); // cards or table
  const [showAddUser, setShowAddUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');

  // Load users from API
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await usersAPI.getAll();
      console.log('📡 API Response:', response);
      
      // ✅ HANDLE BOTH RESPONSE SHAPES
      const rawUsers = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];
      
      console.log('📊 Raw Users Data:', rawUsers);
      
      // ✅ NORMALIZE DATA
      const normalizedUsers = rawUsers.map(user => ({
        ...user,
        status: user.status?.toLowerCase(), // Active → active
        role: user.role?.replace('_', '-').toLowerCase() // survey_engineer → survey-engineer
      }));

      setUsers(normalizedUsers);
      console.log('✅ Normalized Users:', normalizedUsers.length, 'users loaded');
    } catch (error) {
      console.error('❌ Error loading users:', error);
      setError('Failed to load users');
      setUsers([]); // Ensure users is always an array even on error
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (userData) => {
    try {
      setLoading(true);
      const response = await usersAPI.create(userData);
      
      // Show success message with temporary password
      setNewUserPassword(response.data.temporaryPassword);
      setSuccess(`User created successfully! Temporary password: ${response.data.temporaryPassword}`);
      
      // Reload users list
      await loadUsers();
      
      // Close modal
      setShowAddUser(false);
      
      // Clear messages after 5 seconds
      setTimeout(() => {
        setSuccess('');
        setNewUserPassword('');
      }, 5000);
      
    } catch (error) {
      console.error('Error creating user:', error);
      setError(error.response?.data?.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

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

  // Filter users based on search and filters
  const filteredUsers = (Array.isArray(users) ? users : []).filter(user => {
    const matchesSearch = !searchTerm || (
      (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    // Debug each user
    if (user.email === 'amreenjahan720@gmail.com') {
      console.log('🔍 Amreen Jahan Filter Check:', {
        user: user,
        matchesSearch,
        matchesRole,
        matchesStatus,
        searchTerm,
        roleFilter,
        statusFilter
      });
    }
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Immediate debugging
  console.log('🎯 IMMEDIATE CHECK:', {
    usersLength: users.length,
    filteredUsersLength: filteredUsers.length,
    shouldShowUsers: filteredUsers.length > 0
  });

  // Debug logging
  console.log('🔍 Users Debug:', {
    totalUsers: Array.isArray(users) ? users.length : 0,
    filteredCount: Array.isArray(filteredUsers) ? filteredUsers.length : 0,
    searchTerm,
    roleFilter,
    statusFilter,
    loading,
    error,
    users: Array.isArray(users) ? users.slice(0, 3) : [], // Show first 3 users
    filteredUsers: Array.isArray(filteredUsers) ? filteredUsers.slice(0, 3) : [] // Show first 3 filtered users
  });

  // Show loading state
  if (loading) {
    console.log('🔄 Users are loading...');
  }

  // Show error state
  if (error) {
    console.log('❌ Error loading users:', error);
  }

  // Test function to manually trigger API call
  const testAPI = async () => {
    console.log('🧪 Testing API call...');
    try {
      const response = await usersAPI.getUsers();
      console.log('✅ API Response:', response);
      setUsers(response.data || []);
    } catch (error) {
      console.error('❌ API Error:', error);
      setError('API test failed');
    }
  };

  const openUserDetail = (user) => {
    console.log('🔍 Opening user details:', user.name, user.email);
    setSelectedUser(user);
    setShowUserDetail(true);
  };

  const closeUserDetail = () => {
    setShowUserDetail(false);
    setSelectedUser(null);
  };

  const deleteUser = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone.`)) {
      try {
        await usersAPI.deleteUser(userId);
        setUsers(prev => prev.filter(user => user.id !== userId));
        setShowUserDetail(false);
        setSelectedUser(null);
        console.log('✅ User deleted:', userName);
      } catch (error) {
        console.error('❌ Error deleting user:', error);
      }
    }
  };

  const toggleUserStatus = (userId) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'suspended' : 'active' }
        : user
    ));
  };

  const UserCard = ({ user }) => {
    // Safety check
    if (!user || typeof user !== 'object') {
      console.log('❌ UserCard: Invalid user data:', user);
      return null;
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }}
        className="bg-white rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-blue-200/50 p-6 hover:shadow-lg transition-all duration-300"
      >
        {/* Header with Avatar and Status */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{user.name || 'Unknown User'}</h3>
              <p className="text-sm text-gray-500">{user.email || 'No email'}</p>
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
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm font-semibold text-gray-900">{user.email || 'No email'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Joined</p>
              <p className="text-sm font-semibold text-gray-900">{user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}</p>
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
            <span>Last active: {user.lastActivity || 'Never'}</span>
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
              {user.status === 'Active' ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                openUserDetail(user);
              }}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Edit className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

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
                <div className="flex items-center gap-2">
                  <button
                    onClick={closeUserDetail}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  {(selectedUser.role === 'admin' || selectedUser.role === 'project-manager' || selectedUser.role === 'survey-engineer' || selectedUser.role === 'reviewer' || selectedUser.role === 'viewer') && (
                    <button
                      onClick={() => deleteUser(selectedUser.id, selectedUser.name)}
                      className="p-2 text-red-600 hover:text-red-800 transition-colors"
                      title="Delete User"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  {console.log('🔍 DELETE BUTTON DEBUG:', {
                    userRole: selectedUser.role,
                    roleCheck1: selectedUser.role === 'admin',
                    roleCheck2: selectedUser.role === 'project_manager',
                    roleCheck3: selectedUser.role === 'survey_engineer',
                    roleCheck4: selectedUser.role === 'reviewer',
                    roleCheck5: selectedUser.role === 'viewer',
                    shouldShow: selectedUser.role === 'admin' || selectedUser.role === 'project_manager' || selectedUser.role === 'survey_engineer' || selectedUser.role === 'reviewer' || selectedUser.role === 'viewer',
                    finalResult: selectedUser.role === 'admin' || selectedUser.role === 'project_manager' || selectedUser.role === 'survey_engineer' || selectedUser.role === 'reviewer' || selectedUser.role === 'viewer'
                  })}
                </div>
              </div>

              {/* Tabs - Conditional based on user role */}
              {selectedUser.role !== 'admin' && (
                <div className="border-b border-gray-200">
                  <div className="flex">
                    {['profile', 'settings', 'assignments', 'activity', 'permissions'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 px-6 py-4 text-sm font-medium text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300 transition-colors capitalize ${
                          activeTab === tab ? 'text-gray-900 border-gray-300' : ''
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Logout Button - Always visible */}
              <div className="p-6">
                <button
                  onClick={() => {
                    // Handle logout
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('userInfo');
                    window.location.href = '/login';
                  }}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <UserX className="w-4 h-4" />
                  Logout User
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-2xl">
                        {selectedUser.name ? selectedUser.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{selectedUser.name || 'Unknown User'}</h3>
                        <p className="text-gray-500">{selectedUser.email || 'No email'}</p>
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
                          {selectedUser.phone || 'Not provided'}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
                        <div className="flex items-center gap-2 text-gray-900">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {selectedUser.created_at ? new Date(selectedUser.created_at).toLocaleDateString() : 'Unknown'}
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
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">User Settings</h3>
                    <div className="space-y-4">
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Account Settings</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Email Notifications</span>
                            <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                              Enabled
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Two-Factor Authentication</span>
                            <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                              Disabled
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Profile Visibility</span>
                            <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                              Public
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">System Preferences</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Language</span>
                            <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                              <option>English</option>
                              <option>Spanish</option>
                              <option>French</option>
                            </select>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Time Zone</span>
                            <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                              <option>UTC</option>
                              <option>EST</option>
                              <option>PST</option>
                            </select>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Date Format</span>
                            <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                              <option>MM/DD/YYYY</option>
                              <option>DD/MM/YYYY</option>
                              <option>YYYY-MM-DD</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Security Settings</h4>
                        <div className="space-y-3">
                          <button className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 transition-colors">
                            Change Password
                          </button>
                          <button className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 transition-colors">
                            Login History
                          </button>
                          <button className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 transition-colors">
                            Active Sessions
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Assignments Tab */}
                {activeTab === 'assignments' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Assigned Properties</h3>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="text-center text-gray-500">
                        <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-600">No properties assigned yet</p>
                        <p className="text-sm text-gray-500 mt-2">Properties will be assigned by administrators</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Activity Tab */}
                {activeTab === 'activity' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="text-center text-gray-500">
                        <Activity className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-600">No recent activity</p>
                        <p className="text-sm text-gray-500 mt-2">User activity will appear here once they start using the system</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Permissions Tab */}
                {activeTab === 'permissions' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">User Permissions</h3>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">View Properties</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            selectedUser.role === 'admin' || selectedUser.role === 'project_manager' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-400'
                          }`}>
                            {selectedUser.role === 'admin' || selectedUser.role === 'project_manager' ? 'Allowed' : 'Not Allowed'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">Create Surveys</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            selectedUser.role === 'admin' || selectedUser.role === 'project_manager' || selectedUser.role === 'survey_engineer' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-400'
                          }`}>
                            {selectedUser.role === 'admin' || selectedUser.role === 'project_manager' || selectedUser.role === 'survey_engineer' ? 'Allowed' : 'Not Allowed'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">View Reports</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            selectedUser.role === 'admin' || selectedUser.role === 'project_manager' || selectedUser.role === 'reviewer' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-400'
                          }`}>
                            {selectedUser.role === 'admin' || selectedUser.role === 'project_manager' || selectedUser.role === 'reviewer' ? 'Allowed' : 'Not Allowed'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">Manage Users</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            selectedUser.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-400'
                          }`}>
                            {selectedUser.role === 'admin' ? 'Allowed' : 'Not Allowed'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add User Modal */}
      <AnimatePresence>
        {showAddUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowAddUser(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Add New User</h2>
                  <button
                    onClick={() => setShowAddUser(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <AddUserForm
                  onSubmit={handleAddUser}
                  onCancel={() => setShowAddUser(false)}
                  loading={loading}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Message */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span>{success}</span>
          </div>
          {newUserPassword && (
            <div className="mt-2 text-sm">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4" />
                <span>Temporary password: {newUserPassword}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(newUserPassword)}
                  className="ml-2 text-white hover:text-green-200"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Add User Form Component
const AddUserForm = ({ onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'survey_engineer',
    status: 'Active'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter email address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role *
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="admin">Admin</option>
            <option value="project_manager">Project Manager</option>
            <option value="survey_engineer">Survey Engineer</option>
            <option value="reviewer">Reviewer</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Key className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm text-blue-800 font-medium">System-Generated Password</p>
            <p className="text-sm text-blue-600 mt-1">
              A secure temporary password will be automatically generated and displayed after user creation.
              The user will be required to change their password on first login.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Creating...
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Create User
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default UsersManagement;
