import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { 
  Activity,
  ArrowLeft,
  Wifi,
  Thermometer,
  Zap,
  Server,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Clock,
  RefreshCw,
  Settings,
  Download,
  Calendar,
  User,
  MapPin,
  Building,
  Monitor,
  HardDrive,
  Cpu,
  Battery,
  Shield,
  Radio,
  Gauge
} from 'lucide-react';

const BuildingHealth = () => {
  const { id } = useParams();
  const [building, setBuilding] = useState(null);
  const [healthData, setHealthData] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState('overview');
  const [timeRange, setTimeRange] = useState('24h');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock building data
  const mockBuilding = {
    id: id,
    name: 'Main Tower A',
    address: 'Tech Park Campus - Tower A',
    type: 'Office',
    floors: 12,
    property: 'Tech Park Campus'
  };

  // Mock health data
  const mockHealthData = {
    overview: {
      overallScore: 92,
      status: 'healthy',
      lastUpdated: '2026-02-05T14:30:00Z',
      criticalAlerts: 0,
      warnings: 2,
      info: 5
    },
    network: {
      connectivity: 95,
      bandwidth: 88,
      latency: 12,
      uptime: 99.8,
      devices: 156,
      activeConnections: 142,
      dataTransfer: 2.4,
      signalStrength: 85,
      status: 'operational'
    },
    power: {
      availability: 98,
      quality: 96,
      consumption: 85,
      backupStatus: 'ready',
      loadBalance: 92,
      voltageStability: 94,
      frequencyStability: 98,
      powerFactor: 0.95,
      status: 'stable'
    },
    environmental: {
      temperature: 22,
      humidity: 45,
      airQuality: 88,
      co2Level: 420,
      ventilation: 92,
      lighting: 85,
      noiseLevel: 45,
      pressure: 1013,
      status: 'optimal'
    },
    infrastructure: {
      servers: 92,
      storage: 78,
      cooling: 88,
      security: 95,
      fireSuppression: 100,
      elevators: 85,
      hvac: 90,
      plumbing: 88,
      status: 'functional'
    },
    historical: {
      network: [
        { time: '00:00', connectivity: 94, bandwidth: 85 },
        { time: '04:00', connectivity: 96, bandwidth: 88 },
        { time: '08:00', connectivity: 92, bandwidth: 82 },
        { time: '12:00', connectivity: 88, bandwidth: 78 },
        { time: '16:00', connectivity: 90, bandwidth: 80 },
        { time: '20:00', connectivity: 95, bandwidth: 88 },
        { time: '23:59', connectivity: 95, bandwidth: 88 }
      ],
      power: [
        { time: '00:00', availability: 98, consumption: 65 },
        { time: '04:00', availability: 99, consumption: 45 },
        { time: '08:00', availability: 97, consumption: 82 },
        { time: '12:00', availability: 98, consumption: 88 },
        { time: '16:00', availability: 97, consumption: 85 },
        { time: '20:00', availability: 98, consumption: 75 },
        { time: '23:59', availability: 98, consumption: 85 }
      ],
      environmental: [
        { time: '00:00', temperature: 20, humidity: 48 },
        { time: '04:00', temperature: 19, humidity: 52 },
        { time: '08:00', temperature: 21, humidity: 46 },
        { time: '12:00', temperature: 23, humidity: 42 },
        { time: '16:00', temperature: 24, humidity: 40 },
        { time: '20:00', temperature: 22, humidity: 44 },
        { time: '23:59', temperature: 22, humidity: 45 }
      ]
    }
  };

  useEffect(() => {
    setBuilding(mockBuilding);
    setHealthData(mockHealthData);
  }, [id]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setHealthData(mockHealthData);
    setIsRefreshing(false);
  };

  const getStatusColor = (value, thresholds = { good: 80, warning: 60 }) => {
    if (value >= thresholds.good) return 'text-green-600 bg-green-50';
    if (value >= thresholds.warning) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getStatusIcon = (value, thresholds = { good: 80, warning: 60 }) => {
    if (value >= thresholds.good) return <CheckCircle className="w-4 h-4 text-green-600" />;
    if (value >= thresholds.warning) return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
    return <AlertTriangle className="w-4 h-4 text-red-600" />;
  };

  const getMetricIcon = (metric) => {
    switch (metric) {
      case 'network': return <Wifi className="w-5 h-5" />;
      case 'power': return <Zap className="w-5 h-5" />;
      case 'environmental': return <Thermometer className="w-5 h-5" />;
      case 'infrastructure': return <Server className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  if (!building || !healthData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading health data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
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
                <h1 className="text-2xl font-bold text-gray-900">Building Health Monitor</h1>
                <p className="text-gray-500 mt-1">{building.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1h">Last Hour</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="px-6 lg:px-10 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-50 rounded-lg">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                healthData?.overview?.status === 'healthy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {healthData?.overview?.status || 'Unknown'}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{healthData?.overview?.overallScore || 0}%</h3>
            <p className="text-sm text-gray-500">Overall Health Score</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-red-50 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-xs text-gray-500">Critical</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{healthData?.overview?.criticalAlerts || 0}</h3>
            <p className="text-sm text-gray-500">Critical Alerts</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-yellow-50 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-xs text-gray-500">Warnings</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{healthData?.overview?.warnings || 0}</h3>
            <p className="text-sm text-gray-500">Active Warnings</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs text-gray-500">Last Update</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {healthData?.overview?.lastUpdated ? new Date(healthData.overview.lastUpdated).toLocaleTimeString() : 'N/A'}
            </h3>
            <p className="text-sm text-gray-500">
              {healthData?.overview?.lastUpdated ? new Date(healthData.overview.lastUpdated).toLocaleDateString() : 'N/A'}
            </p>
          </motion.div>
        </div>

        {/* Metric Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['overview', 'network', 'power', 'environmental', 'infrastructure'].map((metric) => (
                <button
                  key={metric}
                  onClick={() => setSelectedMetric(metric)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    selectedMetric === metric
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {getMetricIcon(metric)}
                    {metric}
                  </div>
                </button>
              ))}
            </nav>
          </div>

          {/* Metric Content */}
          <div className="p-6">
            {selectedMetric === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
                  {Object.entries({
                    'Network Connectivity': healthData?.network?.connectivity || 0,
                    'Power Availability': healthData?.power?.availability || 0,
                    'Environmental Control': healthData?.environmental?.temperature || 0,
                    'Infrastructure Health': healthData?.infrastructure?.servers || 0
                  }).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">{key}</span>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(value)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(value)}`}>
                          {value}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm font-medium text-yellow-800">Warning</span>
                      </div>
                      <p className="text-sm text-yellow-700">High bandwidth usage on floor 8</p>
                      <p className="text-xs text-yellow-600 mt-1">2 hours ago</p>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">Info</span>
                      </div>
                      <p className="text-sm text-blue-700">Scheduled maintenance completed</p>
                      <p className="text-xs text-blue-600 mt-1">4 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedMetric === 'network' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Wifi className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Connectivity</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-900">{healthData.network.connectivity}%</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Gauge className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Bandwidth</span>
                    </div>
                    <p className="text-2xl font-bold text-green-900">{healthData.network.bandwidth}%</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Radio className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-medium text-purple-800">Latency</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-900">{healthData.network.latency}ms</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Network Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Uptime</span>
                        <span className="text-sm font-medium">{healthData.network.uptime}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Active Devices</span>
                        <span className="text-sm font-medium">{healthData.network.activeConnections}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Signal Strength</span>
                        <span className="text-sm font-medium">{healthData.network.signalStrength}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Data Transfer</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Current Transfer</span>
                        <span className="text-sm font-medium">{healthData.network.dataTransfer} GB/s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Devices</span>
                        <span className="text-sm font-medium">{healthData.network.devices}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedMetric === 'power' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-5 h-5 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-800">Availability</span>
                    </div>
                    <p className="text-2xl font-bold text-yellow-900">{healthData.power.availability}%</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Battery className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Quality</span>
                    </div>
                    <p className="text-2xl font-bold text-green-900">{healthData.power.quality}%</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Gauge className="w-5 h-5 text-orange-600" />
                      <span className="text-sm font-medium text-orange-800">Consumption</span>
                    </div>
                    <p className="text-2xl font-bold text-orange-900">{healthData.power.consumption}%</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Power Quality</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Voltage Stability</span>
                        <span className="text-sm font-medium">{healthData.power.voltageStability}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Frequency Stability</span>
                        <span className="text-sm font-medium">{healthData.power.frequencyStability}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Power Factor</span>
                        <span className="text-sm font-medium">{healthData.power.powerFactor}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Backup Systems</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Backup Status</span>
                        <span className="text-sm font-medium text-green-600">{healthData.power.backupStatus}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Load Balance</span>
                        <span className="text-sm font-medium">{healthData.power.loadBalance}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedMetric === 'environmental' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Thermometer className="w-5 h-5 text-orange-600" />
                      <span className="text-sm font-medium text-orange-800">Temperature</span>
                    </div>
                    <p className="text-2xl font-bold text-orange-900">{healthData.environmental.temperature}°C</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Monitor className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Humidity</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-900">{healthData.environmental.humidity}%</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Air Quality</span>
                    </div>
                    <p className="text-2xl font-bold text-green-900">{healthData.environmental.airQuality}%</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Environmental Metrics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">CO2 Level</span>
                        <span className="text-sm font-medium">{healthData.environmental.co2Level} ppm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Ventilation</span>
                        <span className="text-sm font-medium">{healthData.environmental.ventilation}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Lighting</span>
                        <span className="text-sm font-medium">{healthData.environmental.lighting}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Comfort Levels</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Noise Level</span>
                        <span className="text-sm font-medium">{healthData.environmental.noiseLevel} dB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Pressure</span>
                        <span className="text-sm font-medium">{healthData.environmental.pressure} hPa</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedMetric === 'infrastructure' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Server className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Servers</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-900">{healthData.infrastructure.servers}%</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <HardDrive className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-medium text-purple-800">Storage</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-900">{healthData.infrastructure.storage}%</p>
                  </div>
                  <div className="p-4 bg-cyan-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Cpu className="w-5 h-5 text-cyan-600" />
                      <span className="text-sm font-medium text-cyan-800">Cooling</span>
                    </div>
                    <p className="text-2xl font-bold text-cyan-900">{healthData.infrastructure.cooling}%</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Building Systems</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Security Systems</span>
                        <span className="text-sm font-medium">{healthData.infrastructure.security}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Fire Suppression</span>
                        <span className="text-sm font-medium">{healthData.infrastructure.fireSuppression}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Elevators</span>
                        <span className="text-sm font-medium">{healthData.infrastructure.elevators}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Utilities</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">HVAC Systems</span>
                        <span className="text-sm font-medium">{healthData.infrastructure.hvac}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Plumbing</span>
                        <span className="text-sm font-medium">{healthData.infrastructure.plumbing}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingHealth;
