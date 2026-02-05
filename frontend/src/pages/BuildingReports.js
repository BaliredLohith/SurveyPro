import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { 
  BarChart3,
  ArrowLeft,
  Download,
  FileText,
  Calendar,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  Search,
  Eye,
  Share,
  Printer,
  Mail,
  Building,
  User,
  MapPin
} from 'lucide-react';

const BuildingReports = () => {
  const { id } = useParams();
  const [building, setBuilding] = useState(null);
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState('30days');
  const [selectedReportType, setSelectedReportType] = useState('dashboard');

  // Mock building data
  const mockBuilding = {
    id: id,
    name: 'Main Tower A',
    address: 'Tech Park Campus - Tower A',
    type: 'Office',
    floors: 12,
    lastSurvey: '2026-01-20',
    property: 'Tech Park Campus'
  };

  // Mock data for ISP deployment reports
  const mockPropertyReports = [
    {
      id: 'PROP-001',
      propertyName: 'Tech Park Campus',
      propertyType: 'Tech Park',
      location: 'Bangalore, Karnataka',
      totalBuildings: 5,
      readinessScore: 85,
      networkFeasibility: 'Fiber + Wireless Backup',
      powerInfrastructure: 'UPS + Generator Available',
      cableRouting: 'Underground Feasible',
      majorIssues: '2 minor duct blocks',
      finalRecommendation: 'Deploy',
      lastUpdated: '2026-01-20',
      engineerName: 'John Smith'
    },
    {
      id: 'PROP-002',
      propertyName: 'Medical Center Plaza',
      propertyType: 'Hospital',
      location: 'Mumbai, Maharashtra',
      totalBuildings: 3,
      readinessScore: 92,
      networkFeasibility: 'Fiber Ready',
      powerInfrastructure: 'Full Backup Systems',
      cableRouting: 'Underground Available',
      majorIssues: 'None',
      finalRecommendation: 'Deploy',
      lastUpdated: '2026-01-18',
      engineerName: 'Sarah Johnson'
    },
    {
      id: 'PROP-003',
      propertyName: 'Shopping Mall North',
      propertyType: 'Retail Mall',
      location: 'Delhi, NCR',
      totalBuildings: 4,
      readinessScore: 45,
      networkFeasibility: 'Wireless Only',
      powerInfrastructure: 'Limited Backup',
      cableRouting: 'Overhead Required',
      majorIssues: 'Permission delays, interference',
      finalRecommendation: 'Fix Issues First',
      lastUpdated: '2026-01-15',
      engineerName: 'Mike Wilson'
    },
    {
      id: 'PROP-004',
      propertyName: 'Residential Complex South',
      propertyType: 'Apartment',
      location: 'Pune, Maharashtra',
      totalBuildings: 8,
      readinessScore: 78,
      networkFeasibility: 'Fiber Feasible',
      powerInfrastructure: 'Partial Backup',
      cableRouting: 'Mixed Underground/Overhead',
      majorIssues: '1 blocked duct',
      finalRecommendation: 'Deploy',
      lastUpdated: '2026-01-12',
      engineerName: 'Emily Davis'
    },
    {
      id: 'PROP-005',
      propertyName: 'Industrial Zone East',
      propertyType: 'Factory',
      location: 'Chennai, Tamil Nadu',
      totalBuildings: 6,
      readinessScore: 35,
      networkFeasibility: 'Wireless Only',
      powerInfrastructure: 'No Backup',
      cableRouting: 'Overhead Only',
      majorIssues: 'Heavy interference, no permissions',
      finalRecommendation: 'Not Feasible',
      lastUpdated: '2026-01-10',
      engineerName: 'Alex Chen'
    },
    {
      id: 'PROP-006',
      propertyName: 'University Campus',
      propertyType: 'Educational',
      location: 'Hyderabad, Telangana',
      totalBuildings: 12,
      readinessScore: 88,
      networkFeasibility: 'Fiber + Wireless Backup',
      powerInfrastructure: 'Full Backup Systems',
      cableRouting: 'Underground Available',
      majorIssues: 'Minor permission delays',
      finalRecommendation: 'Deploy',
      lastUpdated: '2026-01-08',
      engineerName: 'Lisa Thompson'
    },
    {
      id: 'PROP-007',
      propertyName: 'Business District Central',
      propertyType: 'Office Complex',
      location: 'Kolkata, West Bengal',
      totalBuildings: 7,
      readinessScore: 72,
      networkFeasibility: 'Fiber Feasible',
      powerInfrastructure: 'UPS Available',
      cableRouting: 'Underground Feasible',
      majorIssues: '3 duct blocks',
      finalRecommendation: 'Fix Issues First',
      lastUpdated: '2026-01-06',
      engineerName: 'David Kim'
    },
    {
      id: 'PROP-008',
      propertyName: 'Logistics Park West',
      propertyType: 'Warehouse',
      location: 'Ahmedabad, Gujarat',
      totalBuildings: 9,
      readinessScore: 58,
      networkFeasibility: 'Wireless Recommended',
      powerInfrastructure: 'Limited Backup',
      cableRouting: 'Overhead Required',
      majorIssues: 'Distance constraints, interference',
      finalRecommendation: 'Fix Issues First',
      lastUpdated: '2026-01-04',
      engineerName: 'Emily Rodriguez'
    },
    {
      id: 'PROP-009',
      propertyName: 'IT Corridor North',
      propertyType: 'Tech Hub',
      location: 'Gurgaon, Haryana',
      totalBuildings: 15,
      readinessScore: 95,
      networkFeasibility: 'Fiber Ready',
      powerInfrastructure: 'Full Redundancy',
      cableRouting: 'Underground Available',
      majorIssues: 'None',
      finalRecommendation: 'Deploy',
      lastUpdated: '2026-01-02',
      engineerName: 'Rahul Verma'
    },
    {
      id: 'PROP-010',
      propertyName: 'Airport Complex',
      propertyType: 'Transport Hub',
      location: 'Bengaluru, Karnataka',
      totalBuildings: 4,
      readinessScore: 28,
      networkFeasibility: 'Not Feasible',
      powerInfrastructure: 'Special Systems Only',
      cableRouting: 'Restricted Areas',
      majorIssues: 'Security restrictions, interference',
      finalRecommendation: 'Not Feasible',
      lastUpdated: '2025-12-30',
      engineerName: 'Michael Chen'
    }
  ];

  const mockBuildingReports = [
    {
      id: 'BUILD-001',
      buildingName: 'Innovation Tower A',
      buildingId: 'B-001',
      floors: 12,
      surveyType: 'Feasibility',
      signalStrength: '-45 dBm',
      fiberDistanceRequired: '250m',
      equipmentPlacement: 'Floor 8 Server Room',
      obstacles: '2 concrete walls, 1 metal door',
      ductAvailability: 'Yes',
      safetyIssues: 'Grounding required',
      feasibilityVerdict: 'Fiber Feasible',
      lastUpdated: '2026-01-20',
      engineerName: 'Emily Davis'
    },
    {
      id: 'BUILD-002',
      buildingName: 'Emergency Wing',
      buildingId: 'B-002',
      floors: 3,
      surveyType: 'Maintenance',
      signalStrength: '-52 dBm',
      fiberDistanceRequired: '120m',
      equipmentPlacement: 'Ground Floor IT Room',
      obstacles: 'Fire wall, medical equipment',
      ductAvailability: 'Limited',
      safetyIssues: 'Fire compliance OK',
      feasibilityVerdict: 'Wireless Recommended',
      lastUpdated: '2026-01-18',
      engineerName: 'Alex Chen'
    },
    {
      id: 'BUILD-003',
      buildingName: 'Corporate Tower B',
      buildingId: 'B-003',
      floors: 18,
      surveyType: 'Feasibility',
      signalStrength: '-38 dBm',
      fiberDistanceRequired: '380m',
      equipmentPlacement: 'Floor 15 Network Hub',
      obstacles: 'Elevator shaft, 3 fire walls',
      ductAvailability: 'Yes',
      safetyIssues: 'None',
      feasibilityVerdict: 'Fiber Feasible',
      lastUpdated: '2026-01-16',
      engineerName: 'Sarah Johnson'
    },
    {
      id: 'BUILD-004',
      buildingName: 'Shopping Mall Block C',
      buildingId: 'B-004',
      floors: 5,
      surveyType: 'Maintenance',
      signalStrength: '-58 dBm',
      fiberDistanceRequired: '180m',
      equipmentPlacement: 'Retail Management Office',
      obstacles: 'Metal security gates, thick walls',
      ductAvailability: 'No',
      safetyIssues: 'Cable routing issues',
      feasibilityVerdict: 'Wireless Recommended',
      lastUpdated: '2026-01-14',
      engineerName: 'Mike Wilson'
    },
    {
      id: 'BUILD-005',
      buildingName: 'Residential Tower D',
      buildingId: 'B-005',
      floors: 24,
      surveyType: 'Feasibility',
      signalStrength: '-42 dBm',
      fiberDistanceRequired: '450m',
      equipmentPlacement: 'Basement Utility Room',
      obstacles: 'Multiple concrete floors',
      ductAvailability: 'Yes',
      safetyIssues: 'Water pipe proximity',
      feasibilityVerdict: 'Fiber Feasible',
      lastUpdated: '2026-01-12',
      engineerName: 'Lisa Thompson'
    },
    {
      id: 'BUILD-006',
      buildingName: 'Hospital Main Block',
      buildingId: 'B-006',
      floors: 8,
      surveyType: 'Maintenance',
      signalStrength: '-48 dBm',
      fiberDistanceRequired: '200m',
      equipmentPlacement: 'Medical Records Room',
      obstacles: 'Lead shielding, medical equipment',
      ductAvailability: 'Limited',
      safetyIssues: 'EMI concerns',
      feasibilityVerdict: 'Wireless Recommended',
      lastUpdated: '2026-01-10',
      engineerName: 'David Kim'
    },
    {
      id: 'BUILD-007',
      buildingName: 'Tech Hub Building E',
      buildingId: 'B-007',
      floors: 6,
      surveyType: 'Feasibility',
      signalStrength: '-35 dBm',
      fiberDistanceRequired: '150m',
      equipmentPlacement: 'Data Center Floor 2',
      obstacles: 'Server racks, cable trays',
      ductAvailability: 'Yes',
      safetyIssues: 'None',
      feasibilityVerdict: 'Fiber Feasible',
      lastUpdated: '2026-01-08',
      engineerName: 'Emily Rodriguez'
    },
    {
      id: 'BUILD-008',
      buildingName: 'Warehouse Complex F',
      buildingId: 'B-008',
      floors: 2,
      surveyType: 'Maintenance',
      signalStrength: '-62 dBm',
      fiberDistanceRequired: '300m',
      equipmentPlacement: 'Office Section',
      obstacles: 'Metal structures, high ceilings',
      ductAvailability: 'No',
      safetyIssues: 'Signal interference',
      feasibilityVerdict: 'Wireless Only',
      lastUpdated: '2026-01-06',
      engineerName: 'Rahul Verma'
    },
    {
      id: 'BUILD-009',
      buildingName: 'Educational Block G',
      buildingId: 'B-009',
      floors: 4,
      surveyType: 'Feasibility',
      signalStrength: '-44 dBm',
      fiberDistanceRequired: '220m',
      equipmentPlacement: 'Library Server Room',
      obstacles: 'Book stacks, concrete walls',
      ductAvailability: 'Yes',
      safetyIssues: 'None',
      feasibilityVerdict: 'Fiber Feasible',
      lastUpdated: '2026-01-04',
      engineerName: 'Michael Chen'
    },
    {
      id: 'BUILD-010',
      buildingName: 'Airport Terminal H',
      buildingId: 'B-010',
      floors: 3,
      surveyType: 'Maintenance',
      signalStrength: '-55 dBm',
      fiberDistanceRequired: '400m',
      equipmentPlacement: 'Operations Center',
      obstacles: 'Security zones, metal detectors',
      ductAvailability: 'Restricted',
      safetyIssues: 'Security compliance required',
      feasibilityVerdict: 'Not Feasible',
      lastUpdated: '2026-01-02',
      engineerName: 'John Smith'
    }
  ];

  const mockEngineerReports = [
    {
      id: 'ENG-001',
      engineerName: 'Emily Rodriguez',
      totalSurveysDone: 24,
      completionRate: 95,
      avgQualityScore: 88,
      reworkCount: 2,
      responseTime: '2.5 hours',
      issueDetectionRate: 85,
      rating: 'Excellent',
      lastUpdated: '2026-01-20'
    },
    {
      id: 'ENG-002',
      engineerName: 'Rahul Verma',
      totalSurveysDone: 18,
      completionRate: 83,
      avgQualityScore: 76,
      reworkCount: 5,
      responseTime: '4.2 hours',
      issueDetectionRate: 72,
      rating: 'Good',
      lastUpdated: '2026-01-19'
    },
    {
      id: 'ENG-003',
      engineerName: 'Lisa Thompson',
      totalSurveysDone: 31,
      completionRate: 91,
      avgQualityScore: 92,
      reworkCount: 1,
      responseTime: '1.8 hours',
      issueDetectionRate: 94,
      rating: 'Outstanding',
      lastUpdated: '2026-01-18'
    },
    {
      id: 'ENG-004',
      engineerName: 'David Kim',
      totalSurveysDone: 27,
      completionRate: 88,
      avgQualityScore: 85,
      reworkCount: 3,
      responseTime: '2.1 hours',
      issueDetectionRate: 89,
      rating: 'Excellent',
      lastUpdated: '2026-01-17'
    },
    {
      id: 'ENG-005',
      engineerName: 'Sarah Johnson',
      totalSurveysDone: 22,
      completionRate: 79,
      avgQualityScore: 81,
      reworkCount: 4,
      responseTime: '3.5 hours',
      issueDetectionRate: 78,
      rating: 'Good',
      lastUpdated: '2026-01-16'
    },
    {
      id: 'ENG-006',
      engineerName: 'Michael Chen',
      totalSurveysDone: 35,
      completionRate: 96,
      avgQualityScore: 90,
      reworkCount: 2,
      responseTime: '1.5 hours',
      issueDetectionRate: 91,
      rating: 'Outstanding',
      lastUpdated: '2026-01-15'
    },
    {
      id: 'ENG-007',
      engineerName: 'Alex Chen',
      totalSurveysDone: 19,
      completionRate: 85,
      avgQualityScore: 79,
      reworkCount: 6,
      responseTime: '3.8 hours',
      issueDetectionRate: 75,
      rating: 'Good',
      lastUpdated: '2026-01-14'
    },
    {
      id: 'ENG-008',
      engineerName: 'John Smith',
      totalSurveysDone: 29,
      completionRate: 92,
      avgQualityScore: 87,
      reworkCount: 2,
      responseTime: '2.2 hours',
      issueDetectionRate: 86,
      rating: 'Excellent',
      lastUpdated: '2026-01-13'
    },
    {
      id: 'ENG-009',
      engineerName: 'Mike Wilson',
      totalSurveysDone: 16,
      completionRate: 74,
      avgQualityScore: 73,
      reworkCount: 7,
      responseTime: '4.5 hours',
      issueDetectionRate: 68,
      rating: 'Needs Improvement',
      lastUpdated: '2026-01-12'
    },
    {
      id: 'ENG-010',
      engineerName: 'Emily Davis',
      totalSurveysDone: 33,
      completionRate: 94,
      avgQualityScore: 91,
      reworkCount: 1,
      responseTime: '1.7 hours',
      issueDetectionRate: 93,
      rating: 'Outstanding',
      lastUpdated: '2026-01-11'
    }
  ];

  const mockReports = [
    {
      id: 1,
      title: 'Inspection Report',
      type: 'inspection',
      date: '2026-01-20',
      status: 'completed',
      priority: 'normal',
      surveyor: 'John Smith',
      summary: 'All systems operational. Minor issues identified in floor 8 network connectivity.',
      score: 92,
      issues: 3,
      recommendations: 5,
      fileUrl: '/reports/inspection_2026-01-20.pdf',
      size: '2.4 MB'
    },
    {
      id: 2,
      title: 'Network Performance Analysis',
      type: 'technical',
      date: '2026-01-15',
      status: 'completed',
      priority: 'high',
      surveyor: 'Sarah Johnson',
      summary: 'Network performance analysis shows 95% uptime with peak load handling improvements needed.',
      score: 88,
      issues: 7,
      recommendations: 12,
      fileUrl: '/reports/network_2026-01-15.pdf',
      size: '4.1 MB'
    },
    {
      id: 3,
      title: 'Safety Compliance Audit',
      type: 'compliance',
      date: '2026-01-10',
      status: 'completed',
      priority: 'critical',
      surveyor: 'Mike Davis',
      summary: 'Safety audit completed. Emergency systems require immediate attention on floors 3 and 7.',
      score: 78,
      issues: 12,
      recommendations: 8,
      fileUrl: '/reports/safety_2026-01-10.pdf',
      size: '3.7 MB'
    },
    {
      id: 4,
      title: 'Maintenance Review',
      type: 'maintenance',
      date: '2026-01-05',
      status: 'completed',
      priority: 'normal',
      surveyor: 'Emily Chen',
      summary: 'Quarterly maintenance review shows HVAC systems performing optimally.',
      score: 95,
      issues: 2,
      recommendations: 3,
      fileUrl: '/reports/maintenance_2026-01-05.pdf',
      size: '1.8 MB'
    },
    {
      id: 5,
      title: 'Energy Efficiency Report',
      type: 'environmental',
      date: '2025-12-28',
      status: 'completed',
      priority: 'low',
      surveyor: 'Robert Wilson',
      summary: 'Energy consumption analysis shows 8% improvement from previous quarter.',
      score: 90,
      issues: 1,
      recommendations: 4,
      fileUrl: '/reports/energy_2025-12-28.pdf',
      size: '2.9 MB'
    },
    {
      id: 6,
      title: 'Fire Safety Inspection',
      type: 'safety',
      date: '2025-12-20',
      status: 'completed',
      priority: 'high',
      surveyor: 'Lisa Anderson',
      summary: 'Fire safety systems operational. Minor upgrades recommended for older equipment.',
      score: 85,
      issues: 5,
      recommendations: 7,
      fileUrl: '/reports/fire_2025-12-20.pdf',
      size: '3.2 MB'
    }
  ];

  // Dashboard metrics
  const dashboardMetrics = {
    totalSurveysCompleted: 73,
    avgReadinessScore: 74,
    buildingsWithIssues: 12,
    deploymentReadyPercentage: 68
  };

  useEffect(() => {
    setBuilding(mockBuilding);
    // Set reports based on selected type
    if (selectedReportType === 'property') {
      setReports(mockPropertyReports);
    } else if (selectedReportType === 'building') {
      setReports(mockBuildingReports);
    } else if (selectedReportType === 'engineer') {
      setReports(mockEngineerReports);
    } else {
      setReports(mockReports);
    }
  }, [selectedReportType]);

  const filteredReports = reports.filter(report => {
    const searchFields = [];
    
    // Add search fields based on report type
    if (selectedReportType === 'property') {
      searchFields.push(
        report.propertyName || '',
        report.propertyType || '',
        report.location || '',
        report.networkFeasibility || '',
        report.finalRecommendation || ''
      );
    } else if (selectedReportType === 'building') {
      searchFields.push(
        report.buildingName || '',
        report.buildingId || '',
        report.surveyType || '',
        report.signalStrength || '',
        report.feasibilityVerdict || ''
      );
    } else if (selectedReportType === 'engineer') {
      searchFields.push(
        report.engineerName || '',
        report.rating || '',
        report.lastUpdated || ''
      );
    } else {
      // Default/legacy reports
      searchFields.push(
        report.title || '',
        report.summary || '',
        report.type || ''
      );
    }
    
    const matchesSearch = searchFields.some(field => 
      field && field.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const matchesFilter = filterType === 'all' || report.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-blue-600 bg-blue-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'normal': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'inspection': return <CheckCircle className="w-4 h-4" />;
      case 'technical': return <BarChart3 className="w-4 h-4" />;
      case 'compliance': return <FileText className="w-4 h-4" />;
      case 'maintenance': return <Building className="w-4 h-4" />;
      case 'safety': return <AlertTriangle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const handleDownload = (report) => {
    const reportName = selectedReportType === 'property' ? `${report.propertyName} Report` :
                      selectedReportType === 'building' ? `${report.buildingName} Report` :
                      selectedReportType === 'engineer' ? `${report.engineerName} Report` :
                      report.title;
    console.log('🏢 Downloading report:', reportName);
    alert(`Downloading ${reportName}`);
  };

  const handleShare = (report) => {
    const reportName = selectedReportType === 'property' ? `${report.propertyName} Report` :
                      selectedReportType === 'building' ? `${report.buildingName} Report` :
                      selectedReportType === 'engineer' ? `${report.engineerName} Report` :
                      report.title;
    console.log('🏢 Sharing report:', reportName);
    alert(`Sharing ${reportName}`);
  };

  const handlePrint = (report) => {
    const reportName = selectedReportType === 'property' ? `${report.propertyName} Report` :
                      selectedReportType === 'building' ? `${report.buildingName} Report` :
                      selectedReportType === 'engineer' ? `${report.engineerName} Report` :
                      report.title;
    console.log('🏢 Printing report:', reportName);
    alert(`Printing ${reportName}`);
  };

  const handleEmail = (report) => {
    const reportName = selectedReportType === 'property' ? `${report.propertyName} Report` :
                      selectedReportType === 'building' ? `${report.buildingName} Report` :
                      selectedReportType === 'engineer' ? `${report.engineerName} Report` :
                      report.title;
    console.log('🏢 Emailing report:', reportName);
    alert(`Emailing ${reportName}`);
  };

  // Helper functions for color coding
  const getReadinessColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getRecommendationColor = (recommendation) => {
    switch (recommendation) {
      case 'Deploy': return 'text-green-800 bg-green-100 border-green-200';
      case 'Fix Issues First': return 'text-yellow-800 bg-yellow-100 border-yellow-200';
      case 'Not Feasible': return 'text-red-800 bg-red-100 border-red-200';
      case 'Fiber Feasible': return 'text-green-800 bg-green-100 border-green-200';
      case 'Wireless Recommended': return 'text-blue-800 bg-blue-100 border-blue-200';
      case 'Wireless Only': return 'text-orange-800 bg-orange-100 border-orange-200';
      default: return 'text-gray-800 bg-gray-100 border-gray-200';
    }
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
                <h1 className="text-2xl font-bold text-gray-900">Building Reports</h1>
                <p className="text-gray-500 mt-1">{building.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Report Type Selection */}
      <div className="px-6 lg:px-10 pb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Report Type</h2>
            <div className="text-sm text-gray-500">
              {reports.length} reports found
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedReportType('dashboard')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedReportType === 'dashboard' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Dashboard Metrics
              </div>
            </button>
            <button
              onClick={() => setSelectedReportType('property')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedReportType === 'property' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4" />
                Property Readiness
              </div>
            </button>
            <button
              onClick={() => setSelectedReportType('building')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedReportType === 'building' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Building Surveys
              </div>
            </button>
            <button
              onClick={() => setSelectedReportType('engineer')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedReportType === 'engineer' 
                  ? 'bg-orange-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Engineer Performance
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="px-6 lg:px-10 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="inspection">Inspection</option>
                  <option value="technical">Technical</option>
                  <option value="compliance">Compliance</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="safety">Safety</option>
                </select>
              </div>
              
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="1year">Last Year</option>
                <option value="all">All Time</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Metrics - Only show when dashboard is selected */}
      {selectedReportType === 'dashboard' && (
        <div className="px-6 lg:px-10 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{dashboardMetrics.totalSurveysCompleted}</div>
              <div className="text-sm text-gray-500 mt-1">Total Surveys Completed</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{dashboardMetrics.avgReadinessScore}%</div>
              <div className="text-sm text-gray-500 mt-1">Average Readiness Score</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-red-50 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <TrendingDown className="w-4 h-4 text-red-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{dashboardMetrics.buildingsWithIssues}</div>
              <div className="text-sm text-gray-500 mt-1">Buildings with Issues</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Building className="w-5 h-5 text-purple-600" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{dashboardMetrics.deploymentReadyPercentage}%</div>
              <div className="text-sm text-gray-500 mt-1">Deployment Ready</div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Reports List */}
      <div className="px-6 lg:px-10 pb-8">
        <div className="grid grid-cols-1 gap-6">
          {filteredReports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        {selectedReportType === 'property' && <Building className="w-4 h-4 text-blue-600" />}
                        {selectedReportType === 'building' && <FileText className="w-4 h-4 text-purple-600" />}
                        {selectedReportType === 'engineer' && <User className="w-4 h-4 text-orange-600" />}
                        {!selectedReportType && getTypeIcon(report.type)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {selectedReportType === 'property' && `${report.propertyName} - Readiness Report`}
                          {selectedReportType === 'building' && `${report.buildingName} - Survey Report`}
                          {selectedReportType === 'engineer' && `${report.engineerName} - Performance Report`}
                          {!selectedReportType && report.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {selectedReportType === 'property' && `${report.propertyType} • ${report.location} • ${report.lastUpdated}`}
                          {selectedReportType === 'building' && `${report.floors} Floors • ${report.surveyType} • ${report.lastUpdated}`}
                          {selectedReportType === 'engineer' && `Performance Report • ${report.lastUpdated}`}
                          {!selectedReportType && `${report.date} • by ${report.surveyor}`}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{report.summary || report.propertyName || report.buildingName || report.engineerName}</p>
                    
                    <div className="flex items-center gap-6 text-sm">
                      {/* Property Reports Metrics */}
                      {selectedReportType === 'property' && (
                        <>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Readiness Score:</span>
                            <span className={`px-2 py-1 rounded-full font-medium ${getReadinessColor(report.readinessScore)}`}>
                              {report.readinessScore}%
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Buildings:</span>
                            <span className="font-medium text-blue-600">{report.totalBuildings}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Network:</span>
                            <span className="font-medium text-green-600">{report.networkFeasibility}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Recommendation:</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRecommendationColor(report.finalRecommendation)}`}>
                              {report.finalRecommendation}
                            </span>
                          </div>
                        </>
                      )}
                      
                      {/* Building Reports Metrics */}
                      {selectedReportType === 'building' && (
                        <>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Signal:</span>
                            <span className="font-medium text-green-600">{report.signalStrength}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Fiber Distance:</span>
                            <span className="font-medium text-blue-600">{report.fiberDistanceRequired}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Ducts:</span>
                            <span className="font-medium text-yellow-600">{report.ductAvailability}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Verdict:</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRecommendationColor(report.feasibilityVerdict)}`}>
                              {report.feasibilityVerdict}
                            </span>
                          </div>
                        </>
                      )}
                      
                      {/* Engineer Reports Metrics */}
                      {selectedReportType === 'engineer' && (
                        <>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Surveys Done:</span>
                            <span className="font-medium text-blue-600">{report.totalSurveysDone}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Completion Rate:</span>
                            <span className="font-medium text-green-600">{report.completionRate}%</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Quality Score:</span>
                            <span className="font-medium text-purple-600">{report.avgQualityScore}%</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Rating:</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                              report.rating === 'Outstanding' ? 'bg-purple-50 text-purple-800 border-purple-200' :
                              report.rating === 'Excellent' ? 'bg-green-50 text-green-800 border-green-200' :
                              report.rating === 'Good' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                              report.rating === 'Needs Improvement' ? 'bg-red-50 text-red-800 border-red-200' :
                              'bg-gray-50 text-gray-800 border-gray-200'
                            }`}>
                              {report.rating}
                            </span>
                          </div>
                        </>
                      )}
                      
                      {/* Default Reports Metrics (for backward compatibility) */}
                      {!selectedReportType || selectedReportType === 'dashboard' && report.score && (
                        <>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Score:</span>
                            <span className={`px-2 py-1 rounded-full font-medium ${getScoreColor(report.score)}`}>
                              {report.score}%
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Issues:</span>
                            <span className="font-medium text-red-600">{report.issues}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Recommendations:</span>
                            <span className="font-medium text-blue-600">{report.recommendations}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    {selectedReportType === 'property' && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRecommendationColor(report.finalRecommendation)}`}>
                        {report.finalRecommendation}
                      </span>
                    )}
                    {selectedReportType === 'building' && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRecommendationColor(report.feasibilityVerdict)}`}>
                        {report.feasibilityVerdict}
                      </span>
                    )}
                    {selectedReportType === 'engineer' && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                        report.rating === 'Outstanding' ? 'bg-purple-50 text-purple-800 border-purple-200' :
                        report.rating === 'Excellent' ? 'bg-green-50 text-green-800 border-green-200' :
                        report.rating === 'Good' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                        report.rating === 'Needs Improvement' ? 'bg-red-50 text-red-800 border-red-200' :
                        'bg-gray-50 text-gray-800 border-gray-200'
                      }`}>
                        {report.rating}
                      </span>
                    )}
                    {!selectedReportType && report.priority && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(report.priority)}`}>
                        {report.priority}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    {selectedReportType === 'property' && (
                      <>
                        <span className="px-2 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
                          Ready for Review
                        </span>
                        <span className="text-sm text-gray-500">
                          Property Report
                        </span>
                      </>
                    )}
                    {selectedReportType === 'building' && (
                      <>
                        <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                          Technical Assessment
                        </span>
                        <span className="text-sm text-gray-500">
                          Building Report
                        </span>
                      </>
                    )}
                    {selectedReportType === 'engineer' && (
                      <>
                        <span className="px-2 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-medium">
                          Performance Review
                        </span>
                        <span className="text-sm text-gray-500">
                          Engineer Report
                        </span>
                      </>
                    )}
                    {!selectedReportType && (
                      <>
                        <span className="px-2 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
                          {report.status}
                        </span>
                        <span className="text-sm text-gray-500">
                          {report.type}
                        </span>
                      </>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDownload(report)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleShare(report)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Share"
                    >
                      <Share className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handlePrint(report)}
                      className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      title="Print"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEmail(report)}
                      className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                      title="Email"
                    >
                      <Mail className="w-4 h-4" />
                    </button>
                    <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1 text-sm">
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {filteredReports.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuildingReports;
