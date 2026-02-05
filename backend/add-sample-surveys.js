const db = require('./config/db');

// Sample surveys to add for demonstration
const sampleSurveys = [
  {
    property_id: 1,
    building_id: 1,
    assigned_to: 20, // Survey Engineer ID
    survey_type: 'Network Feasibility',
    due_date: '2026-02-15',
    priority: 'High',
    status: 'In Progress'
  },
  {
    property_id: 1,
    building_id: 2,
    assigned_to: 20, // Survey Engineer ID
    survey_type: 'Fiber Check',
    due_date: '2026-02-18',
    priority: 'Medium',
    status: 'Pending'
  },
  {
    property_id: 2,
    building_id: 3,
    assigned_to: 20, // Survey Engineer ID
    survey_type: 'Site Survey',
    due_date: '2026-02-20',
    priority: 'Low',
    status: 'Pending'
  }
];

// Function to add sample surveys
const addSampleSurveys = () => {
  console.log('🚀 Adding sample surveys for Survey Engineer...');
  
  sampleSurveys.forEach((survey, index) => {
    const sql = `
      INSERT INTO surveys (property_id, building_id, assigned_to, survey_type, due_date, priority, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    db.query(sql, [
      survey.property_id,
      survey.building_id,
      survey.assigned_to,
      survey.survey_type,
      survey.due_date,
      survey.priority,
      survey.status
    ], (err, result) => {
      if (err) {
        console.error(`❌ Error adding survey ${survey.survey_type}:`, err);
      } else {
        console.log(`✅ Added survey: ${survey.survey_type} (ID: ${result.insertId})`);
      }
      
      // Check if this is the last survey
      if (index === sampleSurveys.length - 1) {
        console.log('🎉 All sample surveys added successfully!');
        console.log('📊 Survey Engineer now has surveys assigned');
        console.log('📊 You can now test the Survey Engineer dashboard');
        db.end(); // Close connection
      }
    });
  });
};

// Add the surveys
addSampleSurveys();
