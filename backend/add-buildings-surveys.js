const db = require('./config/db');

// Add buildings and surveys for Survey Engineer
const addBuildingsAndSurveys = () => {
  console.log('🚀 Adding buildings and surveys...');
  
  // First add buildings
  const buildings = [
    { property_id: 4, name: 'Main Tower' },
    { property_id: 4, name: 'East Wing' },
    { property_id: 5, name: 'Central Building' },
    { property_id: 6, name: 'Tower A' }
  ];
  
  let buildingIndex = 0;
  const buildingIds = [];
  
  const addBuilding = () => {
    if (buildingIndex >= buildings.length) {
      console.log('✅ All buildings added');
      addSurveys();
      return;
    }
    
    const building = buildings[buildingIndex];
    const sql = 'INSERT INTO buildings (property_id, name) VALUES (?, ?)';
    
    db.query(sql, [building.property_id, building.name], (err, result) => {
      if (err) {
        console.error(`❌ Error adding building ${building.name}:`, err);
        buildingIndex++;
        addBuilding();
      } else {
        console.log(`✅ Added building: ${building.name} (ID: ${result.insertId})`);
        buildingIds.push(result.insertId);
        buildingIndex++;
        addBuilding();
      }
    });
  };
  
  // Then add surveys
  const addSurveys = () => {
    const surveys = [
      {
        property_id: 4,
        building_id: buildingIds[0], // Main Tower
        assigned_to: 20, // Survey Engineer ID
        survey_type: 'Network Feasibility',
        due_date: '2026-02-15',
        priority: 'High',
        status: 'In Progress'
      },
      {
        property_id: 4,
        building_id: buildingIds[1], // East Wing
        assigned_to: 20, // Survey Engineer ID
        survey_type: 'Fiber Check',
        due_date: '2026-02-18',
        priority: 'Medium',
        status: 'Pending'
      },
      {
        property_id: 5,
        building_id: buildingIds[2], // Central Building
        assigned_to: 20, // Survey Engineer ID
        survey_type: 'Site Survey',
        due_date: '2026-02-20',
        priority: 'Low',
        status: 'Pending'
      }
    ];
    
    let surveyIndex = 0;
    
    const addSurvey = () => {
      if (surveyIndex >= surveys.length) {
        console.log('🎉 All buildings and surveys added successfully!');
        console.log('📊 Survey Engineer now has surveys assigned');
        console.log('📊 You can now test the Survey Engineer dashboard');
        db.end(); // Close connection
        return;
      }
      
      const survey = surveys[surveyIndex];
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
        
        surveyIndex++;
        addSurvey();
      });
    };
    
    addSurvey();
  };
  
  // Start the process
  addBuilding();
};

// Add buildings and surveys
addBuildingsAndSurveys();
