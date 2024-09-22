// featuredproductsRoutes.js
const express = require('express');
const router = express.Router();
const featuredproductsController = require('../controllers/featuredproductsController');
const upload = require('../middleware/multerConfig');

// Get all featured products
router.get('/', featuredproductsController.getAllFeaturedProducts);

// Get a featured product by ID
router.get('/:id', featuredproductsController.getFeaturedProductById);

// Create a new featured product (with image upload)
router.post('/', upload.single('image'), featuredproductsController.createFeaturedProduct);

// Update a featured product
router.put('/:id', upload.single('image'), featuredproductsController.updateFeaturedProduct);

// Delete a featured product
router.delete('/:id', featuredproductsController.deleteFeaturedProduct);

module.exports = router;
