import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../../context/AuthContext';
import { 
  Bell, 
  Moon, 
  Sun, 
  Ruler, 
  MapPin as GPS, 
  Save, 
  Wifi, 
  WifiOff,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

const EngineerSettings = () => {
  const [settings, setSettings] = useState({
    // Notifications
    emailAlerts: true,
    dueDateReminders: true,
    overdueWarnings: true,
    
    // Appearance
    darkMode: false,
    
    // Field Settings
    measurementUnit: 'meters',
    gpsAutoDetect: true,
    autoSaveSurveyData: true,
    
    // Connectivity
    offlineMode: false
  });

  const [saving, setSaving] = useState(false);

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSelect = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Settings saved:', settings);
      setSaving(false);
    }, 1000);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Settings</h1>
            </div>
            <div className="text-sm text-gray-500">
              Engineer Preferences
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="h-full overflow-y-auto pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Notifications Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <Bell className="w-5 h-5 text-blue-600" />
              <span>Notifications</span>
            </h3>
            
            <div className="space-y-4">
              {/* Email Alerts */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Email Alerts</h4>
                  <p className="text-sm text-gray-500">Receive email notifications for new survey assignments</p>
                </div>
                <button
                  onClick={() => handleToggle('emailAlerts')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.emailAlerts ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.emailAlerts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Due Date Reminders */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Due Date Reminders</h4>
                  <p className="text-sm text-gray-500">Get notified before survey due dates</p>
                </div>
                <button
                  onClick={() => handleToggle('dueDateReminders')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.dueDateReminders ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.dueDateReminders ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Overdue Warnings */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Overdue Warnings</h4>
                  <p className="text-sm text-gray-500">Alert when surveys are overdue</p>
                </div>
                <button
                  onClick={() => handleToggle('overdueWarnings')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.overdueWarnings ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.overdueWarnings ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Appearance Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <Moon className="w-5 h-5 text-blue-600" />
              <span>Appearance</span>
            </h3>
            
            <div className="space-y-4">
              {/* Dark Mode */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Dark Mode</h4>
                  <p className="text-sm text-gray-500">Toggle dark/light theme</p>
                </div>
                <button
                  onClick={() => handleToggle('darkMode')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.darkMode ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Field Settings Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <Ruler className="w-5 h-5 text-blue-600" />
              <span>Field Settings</span>
            </h3>
            
            <div className="space-y-4">
              {/* Measurement Unit */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Default Measurement Unit</h4>
                  <p className="text-sm text-gray-500">Choose between meters and feet</p>
                </div>
                <select
                  value={settings.measurementUnit}
                  onChange={(e) => handleSelect('measurementUnit', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="meters">Meters</option>
                  <option value="feet">Feet</option>
                </select>
              </div>

              {/* GPS Auto-Detect */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">GPS Auto-Detect</h4>
                  <p className="text-sm text-gray-500">Automatically detect location during surveys</p>
                </div>
                <button
                  onClick={() => handleToggle('gpsAutoDetect')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.gpsAutoDetect ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.gpsAutoDetect ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Auto-Save Survey Data */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Auto-Save Survey Data</h4>
                  <p className="text-sm text-gray-500">Automatically save survey progress</p>
                </div>
                <button
                  onClick={() => handleToggle('autoSaveSurveyData')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.autoSaveSurveyData ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.autoSaveSurveyData ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Connectivity Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <Wifi className="w-5 h-5 text-blue-600" />
              <span>Connectivity Mode</span>
            </h3>
            
            <div className="space-y-4">
              {/* Offline Mode */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Offline Mode</h4>
                  <p className="text-sm text-gray-500">Work offline in poor network areas</p>
                </div>
                <button
                  onClick={() => handleToggle('offlineMode')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.offlineMode ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.offlineMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-end"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Settings'}</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EngineerSettings;
