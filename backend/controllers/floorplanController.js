const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads/floorplans');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf|dwg)$/)) {
        return cb(new Error('Only image files and PDFs are allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: fileFilter
});

// Upload floor plan
const uploadFloorPlan = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const { floor_id, title } = req.body;
        
        if (!floor_id) {
            return res.status(400).json({ message: 'Floor ID is required' });
        }

        const fileInfo = {
            filename: req.file.filename,
            originalname: req.file.originalname,
            size: req.file.size,
            mimetype: req.file.mimetype,
            path: req.file.path,
            floor_id: floor_id,
            title: title || req.file.originalname,
            upload_date: new Date()
        };

        res.status(201).json({
            message: 'Floor plan uploaded successfully',
            floorplan: fileInfo
        });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading file', error: error.message });
    }
};

// Get all floor plans
const getAllFloorPlans = (req, res) => {
    try {
        const uploadPath = path.join(__dirname, '../uploads/floorplans');
        
        if (!fs.existsSync(uploadPath)) {
            return res.json([]);
        }

        const files = fs.readdirSync(uploadPath).map(filename => {
            const filePath = path.join(uploadPath, filename);
            const stats = fs.statSync(filePath);
            
            return {
                filename: filename,
                originalname: filename,
                size: stats.size,
                created: stats.birthtime,
                modified: stats.mtime,
                url: `/uploads/floorplans/${filename}`
            };
        });

        res.json(files);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving floor plans', error: error.message });
    }
};

// Delete floor plan
const deleteFloorPlan = (req, res) => {
    try {
        const { filename } = req.params;
        const filePath = path.join(__dirname, '../uploads/floorplans', filename);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: 'Floor plan not found' });
        }

        fs.unlinkSync(filePath);
        res.json({ message: 'Floor plan deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting floor plan', error: error.message });
    }
};

module.exports = {
    upload,
    uploadFloorPlan,
    getAllFloorPlans,
    deleteFloorPlan
};
