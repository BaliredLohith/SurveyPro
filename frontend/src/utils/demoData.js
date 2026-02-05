// Demo data utilities for testing and development

export const DEMO_PROPERTY = {
  name: 'Demo Office Complex',
  address: '123 Main Street, Downtown, City, State 12345',
  organizationId: 1, // This would be dynamic based on user
};

export const DEMO_BUILDING = {
  name: 'Main Office Building',
  propertyId: null, // Will be set dynamically
};

export const DEMO_FLOOR = {
  name: 'Ground Floor',
  floorNumber: 1,
  buildingId: null, // Will be set dynamically
};

export const DEMO_SPACES = [
  {
    name: 'Conference Room A',
    type: 'CONFERENCE_ROOM',
    area: 250.50,
    status: 'ACTIVE',
    xCoord: 100.5,
    yCoord: 200.3,
  },
  {
    name: 'Office 101',
    type: 'OFFICE',
    area: 150.75,
    status: 'ACTIVE',
    xCoord: 50.0,
    yCoord: 100.0,
  },
  {
    name: 'Lobby Area',
    type: 'LOBBY',
    area: 400.00,
    status: 'ACTIVE',
    xCoord: 0.0,
    yCoord: 0.0,
  },
  {
    name: 'Server Room',
    type: 'SERVER_ROOM',
    area: 75.25,
    status: 'ACTIVE',
    xCoord: 300.0,
    yCoord: 150.0,
  },
];

export const DEMO_SURVEY_TEMPLATE = {
  title: 'Standard Site Survey Template',
  description: 'Comprehensive site survey checklist for office spaces',
  organizationId: 1, // This would be dynamic based on user
};

export const DEMO_SURVEY_QUESTIONS = [
  {
    questionText: 'Is the electrical infrastructure adequate?',
    type: 'BOOLEAN',
    orderIndex: 1,
    isRequired: true,
  },
  {
    questionText: 'Rate the internet connectivity quality',
    type: 'MULTIPLE_CHOICE',
    orderIndex: 2,
    isRequired: true,
    options: '["Excellent", "Good", "Fair", "Poor"]',
  },
  {
    questionText: 'What is the current network speed?',
    type: 'NUMBER',
    orderIndex: 3,
    isRequired: false,
  },
  {
    questionText: 'Upload network configuration files',
    type: 'FILE',
    orderIndex: 4,
    isRequired: false,
  },
];

export const DEMO_SURVEY = {
  title: 'Demo Site Survey - Main Office',
  description: 'Comprehensive site survey for the main office building',
  propertyId: null, // Will be set dynamically
};

// CSV demo data
export const DEMO_CSV_CONTENT = `Name,Type,Area,Status,XCoord,YCoord
Conference Room A,CONFERENCE_ROOM,250.50,ACTIVE,100.5,200.3
Office 101,OFFICE,150.75,ACTIVE,50.0,100.0
Lobby Area,LOBBY,400.00,ACTIVE,0.0,0.0
Server Room,SERVER_ROOM,75.25,ACTIVE,300.0,150.0
Office 102,OFFICE,125.50,ACTIVE,75.0,125.0
Break Room,PANTRY,80.00,ACTIVE,200.0,50.0`;

// Helper functions to create demo data
export const createDemoProperty = (organizationId) => ({
  ...DEMO_PROPERTY,
  organizationId,
});

export const createDemoBuilding = (propertyId) => ({
  ...DEMO_BUILDING,
  propertyId,
});

export const createDemoFloor = (buildingId) => ({
  ...DEMO_FLOOR,
  buildingId,
});

export const createDemoSpaces = (floorId) => 
  DEMO_SPACES.map(space => ({
    ...space,
    floorId,
  }));

export const createDemoSurveyTemplate = (organizationId) => ({
  ...DEMO_SURVEY_TEMPLATE,
  organizationId,
});

export const createDemoSurveyQuestions = (templateId) =>
  DEMO_SURVEY_QUESTIONS.map((question, index) => ({
    ...question,
    templateId,
    orderIndex: index + 1,
  }));

export const createDemoSurvey = (propertyId) => ({
  ...DEMO_SURVEY,
  propertyId,
});

// Quick create functions for development
export const quickCreateDemoData = async (hierarchyService, surveyService, user) => {
  try {
    const organizationId = user?.organizationId || 1;
    
    // Create property
    const property = await hierarchyService.createProperty(createDemoProperty(organizationId));
    console.log('Created demo property:', property);
    
    // Create building
    const building = await hierarchyService.createBuilding(createDemoBuilding(property.id));
    console.log('Created demo building:', building);
    
    // Create floor
    const floor = await hierarchyService.createFloor(createDemoFloor(building.id));
    console.log('Created demo floor:', floor);
    
    // Create spaces
    const spaces = await Promise.all(
      createDemoSpaces(floor.id).map(space => 
        hierarchyService.createSpace(space)
      )
    );
    console.log('Created demo spaces:', spaces);
    
    // Create survey template
    const template = await surveyService.createChecklistTemplate(createDemoSurveyTemplate(organizationId));
    console.log('Created demo template:', template);
    
    // Create questions
    const questions = await Promise.all(
      createDemoSurveyQuestions(template.id).map(question =>
        surveyService.addQuestion(question)
      )
    );
    console.log('Created demo questions:', questions);
    
    // Create survey
    const survey = await surveyService.createSurvey(createDemoSurvey(property.id));
    console.log('Created demo survey:', survey);
    
    return {
      property,
      building,
      floor,
      spaces,
      template,
      questions,
      survey,
    };
  } catch (error) {
    console.error('Failed to create demo data:', error);
    throw error;
  }
};

// Download demo CSV
export const downloadDemoCSV = () => {
  const blob = new Blob([DEMO_CSV_CONTENT], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'demo_spaces.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

// Check if we're in development mode
export const isDevelopmentMode = () => {
  return process.env.NODE_ENV === 'development' || process.env.REACT_APP_DEMO_MODE === 'true';
};

// Demo mode configuration
export const DEMO_CONFIG = {
  enabled: false, // Disabled by default
  autoFillLogin: false,
  showDemoButtons: false,
  quickCreateData: true,
};
