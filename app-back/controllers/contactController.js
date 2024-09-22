const Contact = require('../models/Contact');

// Yeni əlaqə yaratmaq
exports.createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Yeni kontakt yaradırıq və saxlayırıq
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    // Uğurlu cavab
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Bütün kontaktları əldə etmək
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find(); // Bütün kontaktları bazadan çəkirik
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Kontaktı silmək
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id); // Kontaktı ID-ə görə silirik
    res.status(200).json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
