const { pool } = require('../src/config/database');

const addRealProperties = async () => {
  try {
    console.log('🏢 Adding real properties to database...');

    const properties = [
      {
        name: 'Tech Park Campus',
        address: '1234 Innovation Drive, Tech City, TC 12345'
      },
      {
        name: 'Downtown Office Complex',
        address: '567 Business Ave, Downtown, DC 67890'
      },
      {
        name: 'Residential Tower Heights',
        address: '890 Residential Blvd, Housing District, HD 11223'
      },
      {
        name: 'Industrial Park West',
        address: '345 Manufacturing Way, Industrial Zone, IZ 45678'
      },
      {
        name: 'Shopping Mall Plaza',
        address: '789 Commerce Street, Retail District, RD 90123'
      }
    ];

    for (const property of properties) {
      await pool.execute(`
        INSERT INTO properties (name, address) VALUES (?, ?)
      `, [property.name, property.address]);
    }

    console.log('✅ Real properties added successfully!');
    console.log('📊 Added 5 properties to the database');
    
  } catch (error) {
    console.error('❌ Error adding properties:', error.message);
  } finally {
    process.exit(0);
  }
};

addRealProperties();
