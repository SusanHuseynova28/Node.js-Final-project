const express = require('express');
const multer = require('multer');
const path = require('path');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Store images in the 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Ensure unique file names
    }
});

const upload = multer({ storage: storage });

// Routes for fetching and creating categories
router.get('/', categoryController.getCategories);
router.post('/', upload.single('image'), categoryController.createCategory); // Handle image upload

module.exports = router;
