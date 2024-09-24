
const express = require('express');
const router = express.Router();
const featuredproductsController = require('../controllers/featuredproductsController');
const upload = require('../middleware/multerConfig');


router.get('/', featuredproductsController.getAllFeaturedProducts);

router.get('/:id', featuredproductsController.getFeaturedProductById);

router.post('/', upload.single('image'), featuredproductsController.createFeaturedProduct);


router.put('/:id', upload.single('image'), featuredproductsController.updateFeaturedProduct);


router.delete('/:id', featuredproductsController.deleteFeaturedProduct);

module.exports = router;
