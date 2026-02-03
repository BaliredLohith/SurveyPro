import { useState, useEffect } from 'react';
import { DEMO_CONFIG, DEMO_SURVEY_TEMPLATE, DEMO_SURVEY_QUESTIONS } from '../utils/demoData';

export const useDemoMode = () => {
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [demoData, setDemoData] = useState(null);

  useEffect(() => {
    // Check if demo mode is enabled
    const enabled = DEMO_CONFIG.enabled || localStorage.getItem('demoMode') === 'true';
    setIsDemoMode(enabled);
    
    if (enabled) {
      loadDemoData();
    }
  }, []);

  const loadDemoData = () => {
    const demoSurveyTemplate = {
      ...DEMO_SURVEY_TEMPLATE,
      id: 'demo-template-1',
      questions: DEMO_SURVEY_QUESTIONS.map((q, index) => ({
        ...q,
        id: `demo-question-${index + 1}`,
      })),
    };

    const demoSurvey = {
      id: 'demo-survey-1',
      title: 'Demo Site Survey - Main Office',
      description: 'Comprehensive demo survey for testing purposes',
      status: 'IN_PROGRESS',
      propertyId: 'demo-property-1',
      propertyName: 'Demo Office Complex',
      createdAt: new Date().toISOString(),
      completionPercentage: 65,
      totalResponses: 10,
      answeredResponses: 6,
    };

    const demoDashboardStats = {
      totalOrganizations: 1,
      totalUsers: 5,
      totalProperties: 3,
      totalBuildings: 8,
      totalFloors: 24,
      totalSpaces: 156,
      totalArea: 45678.50,
      totalSurveys: 12,
      completedSurveys: 8,
      pendingReviewSurveys: 2,
      inProgressSurveys: 2,
      surveysByStatus: {
        DRAFT: 2,
        IN_PROGRESS: 2,
        COMPLETED: 3,
        REVIEW_PENDING: 2,
        APPROVED: 5,
        REJECTED: 0,
      },
    };

    setDemoData({
      surveyTemplate: demoSurveyTemplate,
      survey: demoSurvey,
      dashboardStats: demoDashboardStats,
      properties: [
        {
          id: 'demo-property-1',
          name: 'Demo Office Complex',
          address: '123 Main Street, Downtown, City, State 12345',
          totalBuildings: 3,
          totalFloors: 8,
          totalSpaces: 45,
        },
        {
          id: 'demo-property-2',
          name: 'Demo Branch Office',
          address: '456 Oak Avenue, Suburb, City, State 67890',
          totalBuildings: 2,
          totalFloors: 6,
          totalSpaces: 28,
        },
        {
          id: 'demo-property-3',
          name: 'Demo Warehouse',
          address: '789 Industrial Blvd, Industrial Park, City, State 11111',
          totalBuildings: 3,
          totalFloors: 10,
          totalSpaces: 83,
        },
      ],
    });
  };

  const enableDemoMode = () => {
    setIsDemoMode(true);
    localStorage.setItem('demoMode', 'true');
    loadDemoData();
  };

  const disableDemoMode = () => {
    setIsDemoMode(false);
    localStorage.removeItem('demoMode');
    setDemoData(null);
  };

  const resetDemoData = () => {
    if (isDemoMode) {
      loadDemoData();
      return true;
    }
    return false;
  };

  // Auto-fill demo credentials
  const getDemoCredentials = () => {
    return {
      email: 'admin@example.com',
      password: 'password123',
    };
  };

  // Get fallback data when API is slow
  const getFallbackData = (dataType) => {
    if (!isDemoMode || !demoData) return null;

    switch (dataType) {
      case 'dashboardStats':
        return demoData.dashboardStats;
      case 'surveyTemplate':
        return demoData.surveyTemplate;
      case 'survey':
        return demoData.survey;
      case 'properties':
        return demoData.properties;
      default:
        return null;
    }
  };

  return {
    isDemoMode,
    demoData,
    enableDemoMode,
    disableDemoMode,
    resetDemoData,
    getDemoCredentials,
    getFallbackData,
  };
};
