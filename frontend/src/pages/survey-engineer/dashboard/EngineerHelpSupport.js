import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HelpCircle, 
  BookOpen, 
  MessageSquare, 
  Bug, 
  Mail, 
  Phone, 
  ExternalLink,
  ChevronDown,
  ChevronRight,
  FileText,
  Video,
  Download
} from 'lucide-react';

const EngineerHelpSupport = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [bugReport, setBugReport] = useState({
    type: '',
    description: '',
    email: ''
  });

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleBugReport = (e) => {
    e.preventDefault();
    console.log('Bug report submitted:', bugReport);
    // Reset form
    setBugReport({ type: '', description: '', email: '' });
  };

  const faqs = [
    {
      question: 'How do I start a new survey?',
      answer: 'Navigate to your dashboard, find the survey you want to start, and click the "Start" button. The survey will move to "In Progress" status.'
    },
    {
      question: 'Can I work offline?',
      answer: 'Yes! Enable Offline Mode in Settings to work in areas with poor network connectivity. Your data will sync when you\'re back online.'
    },
    {
      question: 'How do I submit survey data?',
      answer: 'Complete all required fields in the survey form, then click "Submit". The system will automatically save and mark the survey as completed.'
    },
    {
      question: 'What if I forget my password?',
      answer: 'Click "Forgot Password" on the login screen. You\'ll receive an email with instructions to reset your password.'
    },
    {
      question: 'How do I change my profile information?',
      answer: 'Go to Profile from the dropdown menu, click "Edit Profile", make your changes, and save.'
    }
  ];

  const userGuides = [
    {
      title: 'Getting Started Guide',
      description: 'Complete walkthrough for new engineers',
      icon: <BookOpen className="w-5 h-5" />,
      type: 'guide'
    },
    {
      title: 'Survey Field Guide',
      description: 'Best practices for field surveys',
      icon: <FileText className="w-5 h-5" />,
      type: 'guide'
    },
    {
      title: 'Video Tutorials',
      description: 'Step-by-step video demonstrations',
      icon: <Video className="w-5 h-5" />,
      type: 'video'
    },
    {
      title: 'Download Manuals',
      description: 'PDF manuals and reference documents',
      icon: <Download className="w-5 h-5" />,
      type: 'download'
    }
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                <HelpCircle className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Help & Support</h1>
            </div>
            <div className="text-sm text-gray-500">
              Get assistance and resources
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="h-full overflow-y-auto pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">User Guide</h3>
                  <p className="text-sm text-gray-500">Complete documentation</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-xl">
                  <MessageSquare className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Live Chat</h3>
                  <p className="text-sm text-gray-500">Chat with support</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 p-3 rounded-xl">
                  <Phone className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Call Support</h3>
                  <p className="text-sm text-gray-500">1800-ISP-HELP</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Frequently Asked Questions</h3>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleSection(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    <ChevronDown 
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        expandedSection === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {expandedSection === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="px-6 py-4 border-t border-gray-200"
                    >
                      <p className="text-gray-600">{faq.answer}</p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* User Guides */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">User Guides & Resources</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userGuides.map((guide, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="bg-blue-100 p-2 rounded-lg">
                    {guide.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{guide.title}</h4>
                    <p className="text-sm text-gray-500">{guide.description}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bug Report */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <Bug className="w-5 h-5 text-red-600" />
              <span>Report a Bug</span>
            </h3>
            
            <form onSubmit={handleBugReport} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bug Type
                </label>
                <select
                  value={bugReport.type}
                  onChange={(e) => setBugReport(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select bug type</option>
                  <option value="ui">UI Issue</option>
                  <option value="functionality">Functionality Problem</option>
                  <option value="performance">Performance Issue</option>
                  <option value="crash">App Crash</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={bugReport.description}
                  onChange={(e) => setBugReport(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Please describe the issue in detail..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email (optional)
                </label>
                <input
                  type="email"
                  value={bugReport.email}
                  onChange={(e) => setBugReport(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <Bug className="w-4 h-4" />
                <span>Submit Bug Report</span>
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mt-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Contact Admin</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Email Support</p>
                  <p className="text-sm text-gray-500">admin@surveypro.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-xl">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Phone Support</p>
                  <p className="text-sm text-gray-500">1800-ISP-HELP</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EngineerHelpSupport;
