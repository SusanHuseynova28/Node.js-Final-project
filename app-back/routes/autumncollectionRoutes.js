const express = require('express');
const router = express.Router();
const autumnCollectionController = require('../controllers/autumncollectionController');
const upload = require('../middleware/multerConfig'); // Multer config-i import edin

// Bütün autumn kolleksiyalarını gətir
router.get('/', autumnCollectionController.getAllCollections);

// ID ilə bir autumn kolleksiyasını gətir
router.get('/:id', autumnCollectionController.getCollectionById);

// Yeni autumn kolleksiyası yarat (şəkil yükləmə ilə)
router.post('/', upload.single('image'), autumnCollectionController.createCollection);

// Autumn kolleksiyasını yenilə
router.put('/:id', upload.single('image'), autumnCollectionController.updateCollection);

// Autumn kolleksiyasını sil
router.delete('/:id', autumnCollectionController.deleteCollection);

module.exports = router;
