const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');

// Define the routes
router
  .route('/')
  .get(getAllProducts)    // Fetch all products
  .post(createProduct);   // Create a new product

router
  .route('/:id')
  .get(getProductById)    // Fetch a product by ID
  .put(updateProduct)     // Update a product by ID
  .delete(deleteProduct); // Delete a product by ID

module.exports = router;
