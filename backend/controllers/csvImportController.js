const multer = require('multer');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');
const db = require('../config/db');

// Configure multer for CSV uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads/csv');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.csv');
    }
});

const fileFilter = (req, file, cb) => {
    // Accept CSV files only
    if (!file.originalname.match(/\.csv$/)) {
        return cb(new Error('Only CSV files are allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: fileFilter
});

// Import spaces from CSV
const importSpaces = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No CSV file uploaded' });
        }

        const { floor_id } = req.body;
        
        if (!floor_id) {
            return res.status(400).json({ message: 'Floor ID is required' });
        }

        const results = [];
        const errors = [];
        let processedCount = 0;
        let successCount = 0;

        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('data', (data) => {
                processedCount++;
                
                // Validate required fields
                if (!data.name || data.name.trim() === '') {
                    errors.push(`Row ${processedCount}: Name is required`);
                    return;
                }

                // Insert space into database
                const query = 'INSERT INTO spaces (floor_id, name, type, area) VALUES (?, ?, ?, ?)';
                const values = [
                    floor_id,
                    data.name.trim(),
                    data.type ? data.type.trim() : null,
                    data.area ? parseFloat(data.area) : null
                ];

                db.query(query, values, (err, result) => {
                    if (err) {
                        errors.push(`Row ${processedCount}: Database error - ${err.message}`);
                    } else {
                        successCount++;
                        results.push({
                            id: result.insertId,
                            name: data.name.trim(),
                            type: data.type ? data.type.trim() : null,
                            area: data.area ? parseFloat(data.area) : null
                        });
                    }
                });
            })
            .on('end', () => {
                // Clean up uploaded file
                fs.unlinkSync(req.file.path);

                setTimeout(() => {
                    res.status(200).json({
                        message: 'CSV import completed',
                        summary: {
                            totalRows: processedCount,
                            successCount: successCount,
                            errorCount: errors.length
                        },
                        importedSpaces: results,
                        errors: errors
                    });
                }, 1000); // Wait for database operations to complete
            })
            .on('error', (error) => {
                // Clean up uploaded file
                if (fs.existsSync(req.file.path)) {
                    fs.unlinkSync(req.file.path);
                }
                res.status(500).json({ message: 'Error processing CSV file', error: error.message });
            });

    } catch (error) {
        // Clean up uploaded file
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ message: 'Error importing CSV', error: error.message });
    }
};

// Get CSV import template
const getTemplate = (req, res) => {
    const template = [
        {
            name: 'Conference Room A',
            type: 'Conference Room',
            area: '25.5'
        },
        {
            name: 'Office 101',
            type: 'Office',
            area: '15.2'
        },
        {
            name: 'Storage Room',
            type: 'Storage',
            area: '8.0'
        }
    ];

    res.json({
        message: 'CSV template for spaces import',
        columns: {
            name: 'Required - Space name',
            type: 'Optional - Space type (e.g., Office, Conference Room, Storage)',
            area: 'Optional - Area in square meters'
        },
        example: template
    });
};

module.exports = {
    upload,
    importSpaces,
    getTemplate
};
