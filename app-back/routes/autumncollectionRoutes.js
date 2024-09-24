const express = require('express');
const router = express.Router();
const autumnCollectionController = require('../controllers/autumncollectionController');
const upload = require('../middleware/multerConfig'); 


router.get('/', autumnCollectionController.getAllCollections);


router.get('/:id', autumnCollectionController.getCollectionById);


router.post('/', upload.single('image'), autumnCollectionController.createCollection);


router.put('/:id', upload.single('image'), autumnCollectionController.updateCollection);


router.delete('/:id', autumnCollectionController.deleteCollection);

module.exports = router;
