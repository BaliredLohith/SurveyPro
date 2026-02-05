const { pool } = require('./src/config/database');

async function insertDummyProperties() {
  try {
    console.log('🏢 Inserting dummy properties into database...');
    
    const dummyProperties = [
      {
        name: 'Tech Park Campus',
        address: '1234 Innovation Drive, Tech City, TC 12345',
        type: 'commercial',
        city: 'HITEC City',
        state: 'Hyderabad',
        owner: 'Tech Park Pvt Ltd'
      },
      {
        name: 'Downtown Office Complex',
        address: '567 Business Ave, Downtown, DC 67890',
        type: 'commercial',
        city: 'Downtown',
        state: 'DC',
        owner: 'Business Complex Inc'
      },
      {
        name: 'Residential Tower Heights',
        address: '890 Residential Blvd, Housing District, HD 11223',
        type: 'residential',
        city: 'Housing District',
        state: 'HD',
        owner: 'Residential Towers LLC'
      },
      {
        name: 'Industrial Manufacturing Hub',
        address: '345 Factory Road, Industrial Zone, IZ 44556',
        type: 'industrial',
        city: 'Industrial Zone',
        state: 'IZ',
        owner: 'Manufacturing Hub Corp'
      },
      {
        name: 'University Medical Center',
        address: '789 Campus Drive, University Town, UT 33445',
        type: 'commercial',
        city: 'University Town',
        state: 'UT',
        owner: 'University Medical Center'
      },
      {
        name: 'Shopping Mall Plaza',
        address: '101 Shopping Way, Retail Center, RC 55667',
        type: 'commercial',
        city: 'Retail Center',
        state: 'RC',
        owner: 'Mall Management Inc'
      }
    ];

    // Clear existing properties
    await pool.execute('DELETE FROM properties');
    console.log('🏢 Cleared existing properties');

    // Insert dummy properties
    for (const property of dummyProperties) {
      const [result] = await pool.execute(`
        INSERT INTO properties (name, address, type, city, state, owner, created_at)
        VALUES (?, ?, ?, ?, ?, ?, NOW())
      `, [property.name, property.address, property.type, property.city, property.state, property.owner]);
      
      console.log(`🏢 Inserted property: ${property.name} (ID: ${result.insertId})`);
    }

    console.log('🏢 Dummy properties inserted successfully!');
    
    // Verify insertion
    const [properties] = await pool.execute('SELECT * FROM properties ORDER BY created_at DESC');
    console.log(`🏢 Total properties in database: ${properties.length}`);
    console.table(properties);
    
  } catch (error) {
    console.error('🏢 Error inserting dummy properties:', error);
  } finally {
    process.exit();
  }
}

insertDummyProperties();
