const express = require('express');
const { createContact, getAllContacts, deleteContact } = require('../controllers/contactController');
const router = express.Router();

// Yeni kontakt yaratmaq
router.post('/', createContact);

// Bütün kontaktları əldə etmək
router.get('/', getAllContacts);

// Kontaktı silmək
router.delete('/:id', deleteContact);

module.exports = router;
