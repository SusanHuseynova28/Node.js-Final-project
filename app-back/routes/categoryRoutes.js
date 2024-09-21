const express = require('express');
const multer = require('multer');
const path = require('path');
const categoryController = require('../controllers/categoryController');

const router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage });


router.get('/', categoryController.getCategories);
router.post('/', upload.single('image'), categoryController.createCategory); 

module.exports = router;
