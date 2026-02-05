const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { createTables } = require('./config/database');

// Load environment variables
dotenv.config();

const app = express();

// Create database tables
createTables();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend running' });
});

// Root route
app.get('/', (req, res) => {
    res.send('API is running 🚀');
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/properties', require('./routes/properties'));
app.use('/api/buildings', require('./routes/buildings'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/users', require('./routes/users'));
app.use('/api/surveys', require('./routes/surveys'));
// app.use('/api/survey-data', require('./routes/surveyData')); // Commented out - file missing

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
