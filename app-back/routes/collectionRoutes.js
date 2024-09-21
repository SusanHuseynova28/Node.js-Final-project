const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectioncards'); // Ensure this path is correct

// Get all collections
router.get('/', collectionController.getAllCollections);

// Get a collection by ID
router.get('/:id', collectionController.getCollectionById);

// Create a new collection
router.post('/', collectionController.createCollection);

// Update a collection
router.put('/:id', collectionController.updateCollection);

// Delete a collection
router.delete('/:id', collectionController.deleteCollection);

module.exports = router;
