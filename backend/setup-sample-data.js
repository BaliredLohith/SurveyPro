const db = require('./config/db');

// Sample data setup
const setupSampleData = () => {
  console.log('🚀 Setting up sample data for surveys...');
  
  // First, add sample properties
  const properties = [
    { name: 'Downtown Office Complex', address: '123 Main St, Downtown' },
    { name: 'Tech Park Building A', address: '456 Innovation Ave, Tech Park' },
    { name: 'Riverside Mall', address: '789 River Rd, Riverside' }
  ];
  
  let propertyIndex = 0;
  
  const addProperties = () => {
    if (propertyIndex >= properties.length) {
      console.log('✅ All properties added');
      addBuildings();
      return;
    }
    
    const property = properties[propertyIndex];
    const sql = 'INSERT INTO properties (name, address) VALUES (?, ?)';
    
    db.query(sql, [property.name, property.address], (err, result) => {
      if (err) {
        console.error(`❌ Error adding property ${property.name}:`, err);
      } else {
        console.log(`✅ Added property: ${property.name} (ID: ${result.insertId})`);
        property.id = result.insertId;
      }
      
      propertyIndex++;
      addProperties();
    });
  };
  
  // Add sample buildings
  const addBuildings = () => {
    const buildings = [
      { property_id: properties[0].id, name: 'Tower 1' },
      { property_id: properties[0].id, name: 'Tower 2' },
      { property_id: properties[1].id, name: 'Main Building' },
      { property_id: properties[2].id, name: 'East Wing' }
    ];
    
    let buildingIndex = 0;
    
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
        } else {
          console.log(`✅ Added building: ${building.name} (ID: ${result.insertId})`);
          building.id = result.insertId;
        }
        
        buildingIndex++;
        addBuilding();
      });
    };
    
    addBuilding();
  };
  
  // Add sample surveys
  const addSurveys = () => {
    const surveys = [
      {
        property_id: properties[0].id,
        building_id: 1, // Tower 1
        assigned_to: 20, // Survey Engineer ID
        survey_type: 'Network Feasibility',
        due_date: '2026-02-15',
        priority: 'High',
        status: 'In Progress'
      },
      {
        property_id: properties[0].id,
        building_id: 2, // Tower 2
        assigned_to: 20, // Survey Engineer ID
        survey_type: 'Fiber Check',
        due_date: '2026-02-18',
        priority: 'Medium',
        status: 'Pending'
      },
      {
        property_id: properties[1].id,
        building_id: 3, // Main Building
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
        console.log('🎉 All sample data setup complete!');
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
  addProperties();
};

// Setup the sample data
setupSampleData();
