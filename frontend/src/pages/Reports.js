import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  FileText, 
  Download, 
  Share2,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Building2,
  Zap,
  Wifi,
  Thermometer,
  Activity,
  Calendar,
  Filter,
  Search,
  Plus,
  Eye,
  FileDown,
  Mail,
  ChevronRight,
  Target,
  Shield,
  AlertCircle,
  PieChart,
  LineChart,
  X
} from 'lucide-react';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [showReportDetail, setShowReportDetail] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [reportTypeFilter, setReportTypeFilter] = useState('all');
  const [dateRange, setDateRange] = useState('30days');
  const [animatedNumbers, setAnimatedNumbers] = useState({
    totalSurveys: 0,
    avgReadiness: 0,
    buildingsWithIssues: 0,
    deploymentReady: 0
  });

  // Mock data for demonstration
  const mockKPIs = {
    totalSurveys: 127,
    avgReadiness: 78,
    buildingsWithIssues: 12,
    deploymentReady: 85
  };

  const mockReports = [
    {
      id: 1,
      type: 'property-readiness',
      title: 'Tech Park Campus - Readiness Report',
      propertyName: 'Tech Park Campus',
      date: '2024-01-20',
      status: 'ready',
      readinessScore: 92,
      totalBuildings: 6,
      readyBuildings: 5,
      issueBuildings: 1,
      summary: 'Overall property readiness is excellent with 92% completion. Only Data Center D requires attention due to power infrastructure issues.',
      recommendations: 'Ready for deployment with minor infrastructure upgrades to Data Center D.',
      charts: {
        readiness: 92,
        buildings: { ready: 5, issues: 1 },
        surveys: { completed: 23, pending: 3 }
      }
    },
    {
      id: 2,
      type: 'building-survey',
      title: 'Innovation Tower A - Survey Report',
      propertyName: 'Tech Park Campus',
      buildingName: 'Innovation Tower A',
      date: '2024-01-19',
      status: 'ready',
      readinessScore: 88,
      floorsSurveyed: 8,
      totalFloors: 12,
      powerPointsCoverage: 75,
      environmentalChecks: 85,
      issues: ['Minor signal blockage on floor 10', '2 power points need recalibration'],
      summary: 'Building shows strong readiness with 88% completion. Network coverage is excellent, power infrastructure needs minor adjustments.',
      recommendations: 'Proceed with deployment. Schedule power point recalibration within 2 weeks.',
      charts: {
        floorProgress: 67,
        powerCoverage: 75,
        environmentalScore: 85
      }
    },
    {
      id: 3,
      type: 'engineer-performance',
      title: 'Emily Rodriguez - Performance Report',
      propertyName: 'All Properties',
      engineerName: 'Emily Rodriguez',
      date: '2024-01-18',
      status: 'excellent',
      surveysCompleted: 32,
      avgCompletionTime: 4.2,
      qualityScore: 94,
      summary: 'Emily demonstrates exceptional performance with high survey completion rate and excellent quality scores.',
      recommendations: 'Consider for team lead position. Maintain current performance standards.',
      charts: {
        surveysTrend: [28, 30, 32, 29, 31, 32],
        qualityScore: 94,
        completionTime: 4.2
      }
    },
    {
      id: 4,
      type: 'property-readiness',
      title: 'Downtown Office Complex - Readiness Report',
      propertyName: 'Downtown Office Complex',
      date: '2024-01-17',
      status: 'attention',
      readinessScore: 65,
      totalBuildings: 2,
      readyBuildings: 1,
      issueBuildings: 1,
      summary: 'Property shows moderate readiness at 65%. Medical Wing F requires comprehensive survey completion.',
      recommendations: 'Focus on completing Medical Wing F surveys. Reassess readiness in 2 weeks.',
      charts: {
        readiness: 65,
        buildings: { ready: 1, issues: 1 },
        surveys: { completed: 14, pending: 8 }
      }
    },
    {
      id: 5,
      type: 'building-survey',
      title: 'Data Center D - Critical Issues Report',
      propertyName: 'Tech Park Campus',
      buildingName: 'Data Center D',
      date: '2024-01-16',
      status: 'blocked',
      readinessScore: 45,
      floorsSurveyed: 4,
      totalFloors: 4,
      powerPointsCoverage: 78,
      environmentalChecks: 30,
      issues: ['Critical power stability issues', 'Environmental safety concerns', 'Equipment availability problems'],
      summary: 'Data Center D has critical infrastructure issues blocking deployment. Power stability and environmental safety require immediate attention.',
      recommendations: 'BLOCKED for deployment. Address power infrastructure and environmental safety before proceeding.',
      charts: {
        floorProgress: 100,
        powerCoverage: 78,
        environmentalScore: 30
      }
    }
  ];

  useEffect(() => {
    // Set final values immediately to prevent blinking
    setAnimatedNumbers({
      totalSurveys: mockKPIs.totalSurveys,
      avgReadiness: mockKPIs.avgReadiness,
      buildingsWithIssues: mockKPIs.buildingsWithIssues,
      deploymentReady: mockKPIs.deploymentReady
    });
  }, []);

  const getReportTypeBadge = (type) => {
    const typeConfig = {
      'property-readiness': {
        label: 'Property Readiness',
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: Building2
      },
      'building-survey': {
        label: 'Building Survey',
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: Shield
      },
      'engineer-performance': {
        label: 'Engineer Performance',
        color: 'bg-purple-100 text-purple-800 border-purple-200',
        icon: Users
      }
    };

    const config = typeConfig[type] || typeConfig['property-readiness'];
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
      'ready': {
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: CheckCircle,
        label: 'Ready'
      },
      'attention': {
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: AlertTriangle,
        label: 'Needs Attention'
      },
      'blocked': {
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: AlertCircle,
        label: 'Blocked'
      },
      'excellent': {
        color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        icon: Target,
        label: 'Excellent'
      }
    };

    const config = statusConfig[status] || statusConfig['ready'];
    const Icon = config.icon;

    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${config.color} text-sm font-medium`}>
        <Icon className="w-3.5 h-3.5" />
        {config.label}
      </div>
    );
  };

  const getReadinessColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getReadinessLabel = (score) => {
    if (score >= 80) return 'High';
    if (score >= 60) return 'Medium';
    return 'Low';
  };

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.propertyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = reportTypeFilter === 'all' || report.type === reportTypeFilter;
    return matchesSearch && matchesType;
  });

  const openReportDetail = (report) => {
    setSelectedReport(report);
    setShowReportDetail(true);
  };

  const closeReportDetail = () => {
    setShowReportDetail(false);
    setSelectedReport(null);
  };

  const exportReport = (format) => {
    alert(`Exporting report as ${format.toUpperCase()}`);
  };

  const shareReport = () => {
    alert('Share report functionality (demo mode)');
  };

  const KPICard = ({ title, value, icon: Icon, color, trend }) => (
    <motion.div
      initial={{ opacity: 0.8, y: 10 }} // Start closer to final position
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }} // Even faster transition
      whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }}
      className="bg-white rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-blue-200/50 p-6 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="font-medium">12%</span>
          </div>
        )}
      </div>
      <div className="mb-2">
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
      <p className="text-sm text-gray-500">{title}</p>
    </motion.div>
  );

  const ReportCard = ({ report }) => (
    <motion.div
      initial={{ opacity: 0.8, y: 10 }} // Start closer to final position
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }} // Even faster transition
      whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }}
      className="bg-white rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-blue-200/50 p-6 cursor-pointer hover:shadow-lg transition-all duration-300"
      onClick={() => openReportDetail(report)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h3>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {report.date}
            </span>
            <span className="flex items-center gap-1">
              <Building2 className="w-4 h-4" />
              {report.propertyName}
            </span>
          </div>
        </div>
        {getStatusBadge(report.status)}
      </div>

      {/* Report Type */}
      <div className="mb-4">
        {getReportTypeBadge(report.type)}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {report.readinessScore && (
          <div>
            <p className="text-xs text-gray-500 mb-1">Readiness Score</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    report.readinessScore >= 80 ? 'bg-green-500' :
                    report.readinessScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${report.readinessScore}%` }}
                />
              </div>
              <span className={`text-sm font-bold ${getReadinessColor(report.readinessScore).split(' ')[0]}`}>
                {report.readinessScore}%
              </span>
            </div>
          </div>
        )}
        
        {report.totalBuildings && (
          <div>
            <p className="text-xs text-gray-500 mb-1">Buildings</p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-green-600">{report.readyBuildings}</span>
              <span className="text-xs text-gray-400">/</span>
              <span className="text-sm font-semibold text-red-600">{report.issueBuildings}</span>
            </div>
          </div>
        )}

        {report.surveysCompleted && (
          <div>
            <p className="text-xs text-gray-500 mb-1">Surveys</p>
            <p className="text-sm font-semibold text-gray-900">{report.surveysCompleted}</p>
          </div>
        )}

        {report.qualityScore && (
          <div>
            <p className="text-xs text-gray-500 mb-1">Quality Score</p>
            <p className="text-sm font-semibold text-gray-900">{report.qualityScore}%</p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 line-clamp-2">{report.summary}</p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              exportReport('pdf');
            }}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FileDown className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              shareReport();
            }}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </motion.button>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium"
        >
          <Eye className="w-4 h-4" />
          View Details
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 lg:px-10 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Left side - Title and description */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
              <p className="text-gray-500 mt-1">Decision-ready insights for ISP deployment planning</p>
            </div>
            
            {/* Right side - Actions */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
              
              <select
                value={reportTypeFilter}
                onChange={(e) => setReportTypeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Reports</option>
                <option value="property-readiness">Property Readiness</option>
                <option value="building-survey">Building Survey</option>
                <option value="engineer-performance">Engineer Performance</option>
              </select>
              
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="1year">Last Year</option>
              </select>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Generate Report
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="px-6 lg:px-10 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Total Surveys Completed"
            value={animatedNumbers.totalSurveys}
            icon={FileText}
            color="bg-blue-500"
            trend="up"
          />
          <KPICard
            title="Average Readiness Score"
            value={`${animatedNumbers.avgReadiness}%`}
            icon={Target}
            color="bg-green-500"
            trend="up"
          />
          <KPICard
            title="Buildings with Issues"
            value={animatedNumbers.buildingsWithIssues}
            icon={AlertTriangle}
            color="bg-red-500"
            trend="down"
          />
          <KPICard
            title="Deployment Ready"
            value={`${animatedNumbers.deploymentReady}%`}
            icon={CheckCircle}
            color="bg-emerald-500"
            trend="up"
          />
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>

        {/* Empty State */}
        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSearchTerm('');
                setReportTypeFilter('all');
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Clear Filters
            </motion.button>
          </div>
        )}
      </div>

      {/* Report Detail Modal */}
      <AnimatePresence>
        {showReportDetail && selectedReport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={closeReportDetail}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="absolute inset-4 bg-white rounded-xl shadow-2xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-blue-200/50 overflow-hidden hover:shadow-lg transition-all duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-white border-b border-gray-200 px-8 py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedReport.title}</h2>
                    <div className="flex items-center gap-4 mt-2">
                      {getReportTypeBadge(selectedReport.type)}
                      {getStatusBadge(selectedReport.status)}
                      <span className="text-sm text-gray-500">{selectedReport.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => exportReport('pdf')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                    >
                      <FileDown className="w-4 h-4" />
                      Export PDF
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => exportReport('csv')}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center gap-2"
                    >
                      <FileDown className="w-4 h-4" />
                      Export CSV
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={shareReport}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      Share
                    </motion.button>
                    <button
                      onClick={closeReportDetail}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-8 py-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                {/* Summary Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                        Executive Summary
                      </h3>
                      <div className="bg-gray-50 rounded-lg p-6">
                        <p className="text-gray-700 leading-relaxed">{selectedReport.summary}</p>
                      </div>
                    </div>

                    {/* Visual Charts Section */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        Performance Metrics
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {selectedReport.charts.readiness && (
                          <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h4 className="text-sm font-medium text-gray-900 mb-4">Readiness Score</h4>
                            <div className="relative">
                              <div className="w-32 h-32 mx-auto">
                                <svg className="transform -rotate-90 w-32 h-32">
                                  <circle
                                    cx="64"
                                    cy="64"
                                    r="56"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    fill="none"
                                    className="text-gray-200"
                                  />
                                  <circle
                                    cx="64"
                                    cy="64"
                                    r="56"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    fill="none"
                                    strokeDasharray={`${2 * Math.PI * 56}`}
                                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - selectedReport.charts.readiness / 100)}`}
                                    className={`${
                                      selectedReport.charts.readiness >= 80 ? 'text-green-500' :
                                      selectedReport.charts.readiness >= 60 ? 'text-yellow-500' : 'text-red-500'
                                    }`}
                                  />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className={`text-2xl font-bold ${
                                    selectedReport.charts.readiness >= 80 ? 'text-green-600' :
                                    selectedReport.charts.readiness >= 60 ? 'text-yellow-600' : 'text-red-600'
                                  }`}>
                                    {selectedReport.charts.readiness}%
                                  </span>
                                </div>
                              </div>
                              <p className="text-center text-sm text-gray-500 mt-2">
                                {getReadinessLabel(selectedReport.charts.readiness)} Readiness
                              </p>
                            </div>
                          </div>
                        )}

                        {selectedReport.charts.buildings && (
                          <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h4 className="text-sm font-medium text-gray-900 mb-4">Building Status</h4>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Ready</span>
                                <span className="text-sm font-semibold text-green-600">
                                  {selectedReport.charts.buildings.ready}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Issues</span>
                                <span className="text-sm font-semibold text-red-600">
                                  {selectedReport.charts.buildings.issues}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="h-2 rounded-full bg-green-500"
                                  style={{ 
                                    width: `${(selectedReport.charts.buildings.ready / (selectedReport.charts.buildings.ready + selectedReport.charts.buildings.issues)) * 100}%` 
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedReport.charts.surveys && (
                          <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h4 className="text-sm font-medium text-gray-900 mb-4">Survey Progress</h4>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Completed</span>
                                <span className="text-sm font-semibold text-blue-600">
                                  {selectedReport.charts.surveys.completed}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Pending</span>
                                <span className="text-sm font-semibold text-yellow-600">
                                  {selectedReport.charts.surveys.pending}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="h-2 rounded-full bg-blue-500"
                                  style={{ 
                                    width: `${(selectedReport.charts.surveys.completed / (selectedReport.charts.surveys.completed + selectedReport.charts.surveys.pending)) * 100}%` 
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Issues Section */}
                    {selectedReport.issues && selectedReport.issues.length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5" />
                          Identified Issues
                        </h3>
                        <div className="space-y-3">
                          {selectedReport.issues.map((issue, index) => (
                            <div key={index} className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4">
                              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                              <p className="text-red-800">{issue}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recommendations Section */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Recommendations
                      </h3>
                      <div className={`rounded-lg p-6 ${
                        selectedReport.status === 'ready' ? 'bg-green-50 border border-green-200' :
                        selectedReport.status === 'attention' ? 'bg-yellow-50 border border-yellow-200' :
                        'bg-red-50 border border-red-200'
                      }`}>
                        <div className="flex items-start gap-3">
                          {selectedReport.status === 'ready' ? (
                            <CheckCircle className="w-6 h-6 text-green-600 mt-0.5" />
                          ) : selectedReport.status === 'attention' ? (
                            <AlertTriangle className="w-6 h-6 text-yellow-600 mt-0.5" />
                          ) : (
                            <AlertCircle className="w-6 h-6 text-red-600 mt-0.5" />
                          )}
                          <div>
                            <p className={`font-medium mb-2 ${
                              selectedReport.status === 'ready' ? 'text-green-800' :
                              selectedReport.status === 'attention' ? 'text-yellow-800' : 'text-red-800'
                            }`}>
                              {selectedReport.status === 'ready' ? 'Ready for deployment' :
                               selectedReport.status === 'attention' ? 'Requires attention' : 'Blocked for deployment'}
                            </p>
                            <p className={`leading-relaxed ${
                              selectedReport.status === 'ready' ? 'text-green-700' :
                              selectedReport.status === 'attention' ? 'text-yellow-700' : 'text-red-700'
                            }`}>
                              {selectedReport.recommendations}
                            </p>
                          </div>
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

export default Reports;
