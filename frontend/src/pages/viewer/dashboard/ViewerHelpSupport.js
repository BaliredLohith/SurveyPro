import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../../context/AuthContext';
import { 
  HelpCircle, 
  BookOpen, 
  MessageSquare, 
  Bug, 
  Mail, 
  Phone, 
  ExternalLink,
  Search,
  Eye,
  FileText,
  AlertCircle,
  CheckCircle,
  Video,
  Download,
  ChevronDown
} from 'lucide-react';

const ViewerHelpSupport = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('help');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqData = [
    {
      id: 1,
      question: 'How do I view survey reports?',
      answer: 'Navigate to your dashboard and click on any survey in the "Survey Reports" section to view detailed reports and data.',
      category: 'viewing'
    },
    {
      id: 2,
      question: 'Can I download survey reports?',
      answer: 'Yes, you can download survey reports in various formats (PDF, Excel, CSV) by clicking the download button on any report.',
      category: 'viewing'
    },
    {
      id: 3,
      question: 'How do I search for specific surveys?',
      answer: 'Use the search bar in your dashboard to filter surveys by name, property, or other criteria.',
      category: 'searching'
    },
    {
      id: 4,
      question: 'What information can I access as a viewer?',
      answer: 'As a viewer, you can access completed survey reports, property information, and statistics. You cannot edit or modify data.',
      category: 'permissions'
    },
    {
      id: 5,
      question: 'How do I track my viewing activity?',
      answer: 'Your activity log shows all reports you\'ve viewed, downloaded, or shared, with timestamps and search capabilities.',
      category: 'tracking'
    },
    {
      id: 6,
      question: 'Can I share reports with others?',
      answer: 'Yes, you can share survey reports with team members using the share feature available on each report.',
      category: 'sharing'
    }
  ];

  const tutorials = [
    {
      id: 1,
      title: 'Getting Started with Survey Viewing',
      description: 'Learn how to navigate and view survey reports',
      duration: '5 min',
      type: 'video',
      icon: Video
    },
    {
      id: 2,
      title: 'Understanding Survey Reports',
      description: 'Learn to interpret survey data and findings',
      duration: '7 min',
      type: 'video',
      icon: Video
    },
    {
      id: 3,
      title: 'Data Export Guide',
      description: 'How to export and download survey data',
      duration: '6 min',
      type: 'article',
      icon: FileText
    },
    {
      id: 4,
      title: 'Report Analysis Basics',
      description: 'Tips for analyzing survey results and insights',
      duration: '8 min',
      type: 'video',
      icon: Video
    }
  ];

  const filteredFaq = faqData.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContactSupport = (type) => {
    // Handle different contact methods
    console.log('Contact support via:', type);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Help & Support</h1>
            </div>
            <button
              onClick={() => window.history.back()}
              className="text-gray-600 hover:text-gray-900"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      <main className="h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="p-6">
          <div className="max-w-6xl mx-auto">
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  <button
                    onClick={() => setActiveTab('help')}
                    className={`py-4 px-6 border-b-2 font-medium text-sm ${
                      activeTab === 'help'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Help Center
                  </button>
                  <button
                    onClick={() => setActiveTab('tutorials')}
                    className={`py-4 px-6 border-b-2 font-medium text-sm ${
                      activeTab === 'tutorials'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Tutorials
                  </button>
                  <button
                    onClick={() => setActiveTab('contact')}
                    className={`py-4 px-6 border-b-2 font-medium text-sm ${
                      activeTab === 'contact'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Contact Support
                  </button>
                </nav>
              </div>
            </div>

            {/* Help Center Tab */}
            {activeTab === 'help' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Search */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search for help..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <Eye className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900">Survey Viewing</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Learn how to view and understand survey reports.
                    </p>
                    <button className="text-blue-600 text-sm font-medium hover:text-blue-800">
                      Learn More →
                    </button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                        <FileText className="w-5 h-5 text-green-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900">Data Export</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Download and export survey data in various formats.
                    </p>
                    <button className="text-blue-600 text-sm font-medium hover:text-blue-800">
                      Learn More →
                    </button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                        <CheckCircle className="w-5 h-5 text-purple-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900">Report Sharing</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Share reports with team members and stakeholders.
                    </p>
                    <button className="text-blue-600 text-sm font-medium hover:text-blue-800">
                      Learn More →
                    </button>
                  </motion.div>
                </div>

                {/* FAQ */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {filteredFaq.map((faq) => (
                      <div key={faq.id} className="border border-gray-200 rounded-lg">
                        <button
                          onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                          className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50"
                        >
                          <span className="font-medium text-gray-900">{faq.question}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-gray-500 transform transition-transform ${
                              expandedFaq === faq.id ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {expandedFaq === faq.id && (
                          <div className="px-4 py-3 border-t border-gray-200">
                            <p className="text-gray-600">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tutorials Tab */}
            {activeTab === 'tutorials' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Video Tutorials & Guides</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {tutorials.map((tutorial) => {
                      const Icon = tutorial.icon;
                      return (
                        <motion.div
                          key={tutorial.id}
                          whileHover={{ scale: 1.02 }}
                          className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Icon className="w-6 h-6 text-blue-600" />
                            </div>
                            <span className="text-sm text-gray-500">{tutorial.duration}</span>
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2">{tutorial.title}</h3>
                          <p className="text-sm text-gray-600 mb-4">{tutorial.description}</p>
                          <button className="flex items-center text-blue-600 text-sm font-medium hover:text-blue-800">
                            {tutorial.type === 'video' ? 'Watch Video' : 'Read Article'}
                            <ExternalLink className="w-4 h-4 ml-1" />
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Contact Support Tab */}
            {activeTab === 'contact' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Contact Options */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Contact Options</h2>
                    <div className="space-y-4">
                      <button
                        onClick={() => handleContactSupport('email')}
                        className="w-full flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
                      >
                        <Mail className="w-5 h-5 text-blue-600 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">Email Support</p>
                          <p className="text-sm text-gray-600">Get help via email</p>
                        </div>
                      </button>

                      <button
                        onClick={() => handleContactSupport('phone')}
                        className="w-full flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
                      >
                        <Phone className="w-5 h-5 text-green-600 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">Phone Support</p>
                          <p className="text-sm text-gray-600">Call us directly</p>
                        </div>
                      </button>

                      <button
                        onClick={() => handleContactSupport('chat')}
                        className="w-full flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
                      >
                        <MessageSquare className="w-5 h-5 text-purple-600 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">Live Chat</p>
                          <p className="text-sm text-gray-600">Chat with support team</p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Support Information */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Support Information</h2>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">Response Time</p>
                          <p className="text-sm text-gray-600">Within 24 hours</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">Available Hours</p>
                          <p className="text-sm text-gray-600">Mon-Fri, 9AM-6PM EST</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">Support Channels</p>
                          <p className="text-sm text-gray-600">Email, Phone, Chat</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Common Issues */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Common Issues</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-orange-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Report Access Issues</p>
                        <p className="text-sm text-gray-600">Troubleshoot report viewing problems</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-orange-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Download Problems</p>
                        <p className="text-sm text-gray-600">Fix report download issues</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-orange-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Search Issues</p>
                        <p className="text-sm text-gray-600">Help with finding specific reports</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-orange-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Account Access</p>
                        <p className="text-sm text-gray-600">Login and permission issues</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewerHelpSupport;
