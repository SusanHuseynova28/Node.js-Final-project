const multer = require('multer');
const path = require('path');

// Şəkillərin saxlanacağı qovluq və fayl adı təyin edilməsi
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Faylların saxlanacağı qovluq
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Fayl adı unikal olacaq
    }
});

// Fayl növlərinin filtr edilməsi (yalnız şəkillərə icazə verilməsi)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Only images are allowed!'));
    }
};

// 2 MB maksimum fayl ölçüsü təyin edilməsi
const upload = multer({
    storage: storage,
    limits: { fileSize: 2000000 }, // 2MB limit
    fileFilter: fileFilter
});

module.exports = upload;
